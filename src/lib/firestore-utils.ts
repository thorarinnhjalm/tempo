import { db } from './firebase';
import { doc, getDoc, setDoc, collection, runTransaction, serverTimestamp } from 'firebase/firestore';
import { User as AuthUser } from 'firebase/auth';

/**
 * Ensures a user document exists in the 'users' collection.
 * If not, creates one with default data.
 */
export async function createUserProfile(authUser: AuthUser) {
    const userRef = doc(db, 'users', authUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            email: authUser.email,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
            createdAt: serverTimestamp(),
            familyId: null // Explicitly null to indicate no family
        });
    }
}

/**
 * Checks if the current user belongs to a family.
 * Returns the familyId or null.
 */
export async function checkUserFamily(userId: string): Promise<string | null> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data().familyId || null;
    }
    return null;
}

/**
 * Creates a new Family, assigns the creator as 'parent' (Owner),
 * and updates the user's profile with the new familyId.
 * Uses a transaction to ensure atomicity.
 */
export async function createFamily(familyName: string, user: AuthUser) {
    try {
        await runTransaction(db, async (transaction) => {
            // 1. Create Family Document Reference
            const familyRef = doc(collection(db, 'families'));

            // 2. Create Member Document Reference (for the creator)
            const memberRef = doc(collection(db, 'members'));

            // 3. User Document Reference
            const userRef = doc(db, 'users', user.uid);

            // 4. WRITE: Create Family
            transaction.set(familyRef, {
                name: familyName,
                createdAt: serverTimestamp(),
                ownerId: user.uid,
                settings: {
                    themeColor: 'indigo',
                    allowVoiceInput: true
                }
            });

            // 5. WRITE: Create Member (The Owner/Parent)
            transaction.set(memberRef, {
                familyId: familyRef.id,
                userId: user.uid,
                name: user.displayName || 'Parent',
                role: 'parent',
                avatarUrl: '👑', // Default avatar for creator
                color: '#8B5CF6', // Default purple
                xp: 0,
                badges: []
            });

            // 6. WRITE: Update User Profile with Family ID
            transaction.update(userRef, {
                familyId: familyRef.id
            });
        });

        console.log("Family created successfully!");
        return true;
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw e;
    }
}
