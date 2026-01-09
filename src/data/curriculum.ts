
import { Quest } from '../types/firestore';

export type MonthTheme = {
    id: number;
    title: string;
    color: string;
    icon: string;
};

export const MONTH_THEMES: Record<number, MonthTheme> = {
    1: { id: 1, title: 'Þekkjum okkur sjálf', color: 'indigo', icon: '✨' },
    2: { id: 2, title: 'Skjárinn og samskiptin', color: 'blue', icon: '📲' },
    3: { id: 3, title: 'Sköpun og frásagnir', color: 'pink', icon: '🎨' },
    4: { id: 4, title: 'Heilsuvenjur og orka', color: 'green', icon: '🥦' },
    5: { id: 5, title: 'Peningar og val', color: 'emerald', icon: '💰' },
    6: { id: 6, title: 'Samvinna og endurgjöf', color: 'orange', icon: '🗣' },
    7: { id: 7, title: 'Skemmtanastjórinn í okkur', color: 'yellow', icon: '🎉' },
    8: { id: 8, title: 'Gagnrýnin hugsun og tækni', color: 'purple', icon: '🧠' },
    9: { id: 9, title: 'Sjálfbærni og neysla', color: 'teal', icon: '🌱' },
    10: { id: 10, title: 'Nýsköpun og hugmyndavinna', color: 'rose', icon: '💡' },
    11: { id: 11, title: 'Tilfinningar og kvíði', color: 'cyan', icon: '💬' },
    12: { id: 12, title: 'Þakklæti og samvera', color: 'red', icon: '❤️' },
};

export const CURRICULUM: Quest[] = [
    // MONTH 1
    {
        displayId: 1,
        title: 'Hver erum við?',
        description: 'Teiknið plakat fyrir hvern fjölskyldumeðlim með nafni, lit, styrkleikum og einni skemmtilegri staðreynd.',
        xpReward: 100,
        monthId: 1,
        weekId: 1
    },
    {
        displayId: 2,
        title: 'Hlustunarstöðin',
        description: 'Setjið upp „hlustunarstöð“ þar sem tveir tala saman og æfa sig í að spegla og spyrja: „Þannig að þú meinar…?“',
        xpReward: 100,
        monthId: 1,
        weekId: 2
    },
    {
        displayId: 3,
        title: 'Tilfinningaspjöld',
        description: 'Notið tilfinningaspjöld. Talið saman um hvaða aðstæður hafa kallað fram mismunandi tilfinningar nýlega.',
        xpReward: 100,
        monthId: 1,
        weekId: 3
    },
    {
        displayId: 4,
        title: 'Þakklætisveggur',
        description: 'Búið til „Þakklætisvegg“ heima: límið upp miða með jákvæðum orðum um hvern fjölskyldumeðlim.',
        xpReward: 150,
        monthId: 1,
        weekId: 4
    },
    // MONTH 2
    {
        displayId: 5,
        title: 'Skjátímakaka',
        description: 'Hver heldur skjádagbók. Teiknið „skjátímakökurit“ og berið saman milli fjölskyldumeðlima.',
        xpReward: 100,
        monthId: 2,
        weekId: 1
    },
    {
        displayId: 6,
        title: 'Skjálaus kvöldstund',
        description: 'Skipuleggið eitt skjálaust kvöld og skrifið niður hvernig það gekk.',
        xpReward: 100,
        monthId: 2,
        weekId: 2
    },
    {
        displayId: 7,
        title: '10 hlutir án skjás',
        description: 'Prufið að láta krakkana velja kvölddagskrá án skjáa af listanum „10 hlutir sem við getum gert án skjás“.',
        xpReward: 100,
        monthId: 2,
        weekId: 3
    },
    {
        displayId: 8,
        title: 'Skjáreglur',
        description: 'Fjölskyldufundur: Skrifið og hengið upp skjáreglur heima með litum og myndum.',
        xpReward: 200,
        monthId: 2,
        weekId: 4
    },
    // MONTH 3
    {
        displayId: 9,
        title: 'Saga mín',
        description: 'Taka upp eða skrifa söguna úr eigin lífi og deila með fjölskyldunni.',
        xpReward: 100,
        monthId: 3,
        weekId: 1
    },
    {
        displayId: 10,
        title: 'Ævintýrið okkar',
        description: 'Teikna eða leikrita sameiginlegt ævintýri eða sögu.',
        xpReward: 100,
        monthId: 3,
        weekId: 2
    },
    {
        displayId: 11,
        title: 'Tækni og sköpun',
        description: 'Búa til fjölskyldutákn, hetju eða ævintýri með hjálp gervigreindar eða teikniforrita.',
        xpReward: 100,
        monthId: 3,
        weekId: 3
    },
    {
        displayId: 12,
        title: 'Heimilissýning',
        description: 'Haldið heimilissýningu eða sendið „fjölskyldufréttabréf“ til vina og vandamanna.',
        xpReward: 200,
        monthId: 3,
        weekId: 4
    },
    // MONTH 4
    {
        displayId: 13,
        title: 'Orkugjafar',
        description: 'Skráið hvað þið borðuðuð og hvernig ykkur leið eftir máltíð. Hvað gefur orku?',
        xpReward: 100,
        monthId: 4,
        weekId: 1
    },
    {
        displayId: 14,
        title: 'Hreyfistund',
        description: 'Hver fjölskyldumeðlimur skipuleggur eina hreyfistund (dans, göngutúr, leikur).',
        xpReward: 100,
        monthId: 4,
        weekId: 2
    },
    {
        displayId: 15,
        title: 'Hollustuvenjan',
        description: 'Veljið eina góða heilsuvenju (t.d. vatnsdrykkja) og æfið hana alla vikuna.',
        xpReward: 100,
        monthId: 4,
        weekId: 3
    },
    {
        displayId: 16,
        title: 'Kvöldró',
        description: 'Haldið kvöldrútínu og gerið slökun eða hugleiðslu saman.',
        xpReward: 150,
        monthId: 4,
        weekId: 4
    },
    // MONTH 5
    {
        displayId: 17,
        title: 'Hvað kostar þetta?',
        description: 'Farið saman í búð eða skoðið verð á netinu. Gerið samanburð.',
        xpReward: 100,
        monthId: 5,
        weekId: 1
    },
    {
        displayId: 18,
        title: 'Sparnaðarmarkmið',
        description: 'Teiknið sparnaðarmarkmið – hvað myndir þú vilja spara fyrir?',
        xpReward: 100,
        monthId: 5,
        weekId: 2
    },
    {
        displayId: 19,
        title: 'Ábyrg neysla',
        description: 'Gerið innkaupalista og farið í búð með „ábyrga neyslu“ í huga.',
        xpReward: 100,
        monthId: 5,
        weekId: 3
    },
    {
        displayId: 20,
        title: 'Nýtt úr gömlu',
        description: 'Búið til eitthvað nýtt úr efniviði sem annars hefði verið hent.',
        xpReward: 150,
        monthId: 5,
        weekId: 4
    },
    // MONTH 6
    {
        displayId: 21,
        title: 'Samvinna heima',
        description: 'Veljið heimilisverkefni, deilið ábyrgð og fylgist með hvernig samvinnan gengur.',
        xpReward: 100,
        monthId: 6,
        weekId: 1
    },
    {
        displayId: 22,
        title: 'Hrósahringur',
        description: 'Haldið „hrósahring“ þar sem allir segja eitthvað jákvætt um annan.',
        xpReward: 100,
        monthId: 6,
        weekId: 2
    },
    {
        displayId: 23,
        title: 'Leysa deilur',
        description: 'Leikið lausnardeilu með hlutverkum. Æfið „ég-skilaboð“.',
        xpReward: 100,
        monthId: 6,
        weekId: 3
    },
    {
        displayId: 24,
        title: 'Hvernig líður mér?',
        description: 'Spilið spilið „Hvernig líður mér þegar…“ eða búið það til sjálf.',
        xpReward: 150,
        monthId: 6,
        weekId: 4
    },
    // MONTH 7
    {
        displayId: 25,
        title: 'Sumarlistinn',
        description: 'Búa til lista yfir það sem allir vilja gera í sumar/fríinu.',
        xpReward: 100,
        monthId: 7,
        weekId: 1
    },
    {
        displayId: 26,
        title: 'Skemmtanastjóri',
        description: 'Hver meðlimur fær einn dag til að skipuleggja dagskrána með lítilli aðstoð.',
        xpReward: 200,
        monthId: 7,
        weekId: 2
    },
    {
        displayId: 27,
        title: 'Skapandi dagur',
        description: 'Skipuleggið leikrit, föndurverkefni eða gönguferð saman.',
        xpReward: 100,
        monthId: 7,
        weekId: 3
    },
    {
        displayId: 28,
        title: 'Gleðikort',
        description: 'Teiknið „gleðikort“ með því sem gerir ykkur hamingjusöm.',
        xpReward: 100,
        monthId: 7,
        weekId: 4
    },
    // MONTH 8
    {
        displayId: 29,
        title: 'Raun eða rugl?',
        description: 'Búið til ykkar eigin „falsfrétt“ og látið hina giska: Er þetta satt?',
        xpReward: 100,
        monthId: 8,
        weekId: 1
    },
    {
        displayId: 30,
        title: 'Fréttaskoðun',
        description: 'Rýnið í eina frétt saman og reynið að staðfesta hana. Er hún sönn?',
        xpReward: 100,
        monthId: 8,
        weekId: 2
    },
    {
        displayId: 31,
        title: 'Auglýsingagerð',
        description: 'Gerið ykkar eigin auglýsingu fyrir ímyndaða vöru.',
        xpReward: 150,
        monthId: 8,
        weekId: 3
    },
    {
        displayId: 32,
        title: 'Stafrænt fótspor',
        description: 'Hver teiknar „stafræna fótspor“ sitt og ræðir það.',
        xpReward: 100,
        monthId: 8,
        weekId: 4
    },
    // MONTH 9
    {
        displayId: 33,
        title: 'Hvað eigum við?',
        description: 'Gerið lista eða myndir af hlutum sem má gefa áfram eða nýta betur.',
        xpReward: 100,
        monthId: 9,
        weekId: 1
    },
    {
        displayId: 34,
        title: 'Endurnýting',
        description: 'Búið til skraut, leikföng eða nytjahluti úr endurunnum efniviði.',
        xpReward: 150,
        monthId: 9,
        weekId: 2
    },
    {
        displayId: 35,
        title: 'Grænu gleraugun',
        description: 'Verslið með „grænu gleraugun“ og skráið hvað var umhverfisvænasta valið.',
        xpReward: 100,
        monthId: 9,
        weekId: 3
    },
    {
        displayId: 36,
        title: 'Ruslatínsla',
        description: 'Skipuleggið ruslatínsluferð og ræðið upplifunina eftir á.',
        xpReward: 200,
        monthId: 9,
        weekId: 4
    },
    // MONTH 10
    {
        displayId: 37,
        title: 'Uppfinningin',
        description: 'Teiknið eða lýsið uppfinningu sem myndi leysa vandamál í heiminum.',
        xpReward: 100,
        monthId: 10,
        weekId: 1
    },
    {
        displayId: 38,
        title: 'Frumgerð',
        description: 'Búið til frumgerð (úr pappír, kubbum eða tölvu) af uppfinningunni.',
        xpReward: 200,
        monthId: 10,
        weekId: 2
    },
    {
        displayId: 39,
        title: 'Prófun',
        description: 'Prófið „uppfinninguna“ heima og fáið endurgjöf frá öðrum.',
        xpReward: 100,
        monthId: 10,
        weekId: 3
    },
    {
        displayId: 40,
        title: 'Kynning',
        description: 'Hver meðlimur kynnir sína hugmynd eins og á ráðstefnu.',
        xpReward: 150,
        monthId: 10,
        weekId: 4
    },
    // MONTH 11
    {
        displayId: 41,
        title: 'Tilfinningalíkaminn',
        description: 'Teiknið „tilfinningalíkamann“ – hvar finnum við gleði, reiði, kvíða o.s.frv.?',
        xpReward: 100,
        monthId: 11,
        weekId: 1
    },
    {
        displayId: 42,
        title: 'Róunaraðferðir',
        description: 'Æfið djúpöndun, teljið afturábak eða prófið slökunarspil saman.',
        xpReward: 100,
        monthId: 11,
        weekId: 2
    },
    {
        displayId: 43,
        title: 'Listræn tjáning',
        description: 'Skrifið dagbók, málið eða búið til tónlist sem endurspeglar líðan.',
        xpReward: 150,
        monthId: 11,
        weekId: 3
    },
    {
        displayId: 44,
        title: 'Stuðningsplakat',
        description: 'Gerið plakat þar sem allir nefna hvað hjálpar þeim í erfiðleikum.',
        xpReward: 100,
        monthId: 11,
        weekId: 4
    },
    // MONTH 12
    {
        displayId: 45,
        title: 'Uppáhaldsminning',
        description: 'Hver meðlimur segir frá uppáhaldsminningu ársins og skoðið myndir.',
        xpReward: 100,
        monthId: 12,
        weekId: 1
    },
    {
        displayId: 46,
        title: 'Þakkleikskrukka',
        description: 'Búið til þakkleikskrukku og setjið miða í hana daglega í viku.',
        xpReward: 150,
        monthId: 12,
        weekId: 2
    },
    {
        displayId: 47,
        title: 'Fjölskyldugjöf',
        description: 'Búið til sameiginlega gjöf (t.d. myndband, lag, föndur) fyrir hvort annað.',
        xpReward: 150,
        monthId: 12,
        weekId: 3
    },
    {
        displayId: 48,
        title: 'Samverustund',
        description: 'Hlýleg lokakvöldstund með leik, spjalli og kertaljósi.',
        xpReward: 200,
        monthId: 12,
        weekId: 4
    },
];
