import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Member, Memory } from '../types/firestore';

export function useFamilyMembers(familyId: string | null) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!familyId) {
            setMembers([]);
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'members'), where('familyId', '==', familyId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const memberList: Member[] = [];
            snapshot.forEach((doc) => {
                memberList.push({ id: doc.id, ...doc.data() } as Member);
            });
            setMembers(memberList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [familyId]);

    return { members, loading };
}

export function useMemories(familyId: string | null) {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!familyId) {
            setMemories([]);
            setLoading(false);
            return;
        }

        // Note: Composite index required for 'familyId' + 'createdAt' desc
        // If index is missing, Firestore will log a link to create it.
        const q = query(
            collection(db, 'memories'),
            where('familyId', '==', familyId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const memoryList: Memory[] = [];
            snapshot.forEach((doc) => {
                memoryList.push({ id: doc.id, ...doc.data() } as Memory);
            });
            setMemories(memoryList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [familyId]);

    return { memories, loading };
}
