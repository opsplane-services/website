---
title: 'Az azonosítás platformszintű kérdés, nem szolgáltatásszintű'
date: '2026-08-14'
excerpt: 'Minden szolgáltatás, amelyik maga kezeli a felhasználóit, előbb-utóbb vitába kerül az összes többivel arról, hogy ki kicsoda. Ezért van az OpsPlane-ben pontosan egy helyen az identitás.'
author: 'Az OpsPlane csapat'
tags: ['architektúra', 'azonosítás']
---

A legtöbb belső platform ugyanúgy indul. Az egyik csapat kiad egy incidenskezelő eszközt saját bejelentkezéssel. A másik egy feature flag szolgáltatást, és mivel tudnia kell, ki kapcsolt át egy flaget, nő rá egy `users` tábla. A harmadik hozzáad egy titoktárat, és innentől három elképzelés él arról, hogy mi is az a fiók.

Külön-külön egyik sem hiba. Együtt már az.

## A hibamód az elcsúszás, nem a betörés

A probléma ritkán látványos. Inkább az, hogy valaki kilép a cégtől, és a három rendszerből kettőből törlik. Vagy hogy az „admin” mást jelent a flag szolgáltatásban, mint az incidenskezelőben. Vagy hogy egy deploy pipeline-hoz létrehozott szolgáltatásfiók két évvel túléli magát a pipeline-t, mert senki nem felelős az életciklusáért.

Mindegyik önmagában apró seb. Együtt azt jelentik, hogy senki nem tud válaszolni egy egyszerű kérdésre — *ki mit tehet meg most?* — anélkül, hogy négy adatbázist elolvasna.

## Egy forrás, a többiek csak validálnak

Az OpsPlane az ellenkező álláspontot képviseli: az identitás pontosan egy szolgáltatásban él, és rajta kívül semmi nem kezel felhasználót.

Az auth szolgáltatás birtokolja a felhasználókat, csoportokat, szerepköröket, szervezeteket, szolgáltatásfiókokat és API kulcsokat. Kezeli a GitHub és Google OAuth-ot, valamint a helyi bejelentkezést, ahol arra van szükség. És kibocsátja a JWT-ket.

Minden más szolgáltatás — incidensek, feature flagek, biztonság, gateway — egyetlen dolgot csinál az identitással: validálja a tokent. Nincs felhasználótáblájuk. Nincs saját jogosultsági modelljük. Amikor kérés érkezik, ellenőrzik az aláírást, kiolvassák a claimeket, és foglalkoznak a tényleges munkával.

Ennek van néhány következménye, amit érdemes kimondani:

- **A kiléptetés egyetlen művelet.** Tiltsd le a felhasználót az auth szolgáltatásban, és minden szolgáltatás azonnal elutasítja a tokenjeit.
- **A jogosultságoknak egy szótáruk van.** Egy szerepkör mindenhol ugyanazt jelenti, mert csak egy helyen van definiálva.
- **Az új szolgáltatás olcsó.** Egy hatodik szolgáltatás hozzáadása annyi, hogy írsz egy JWT-t validáló middleware-t. Nem kell újabb fiókmodellt tervezni.

## Hol jön képbe a gateway

Az identitás központosítása csak akkor segít, ha a peremen is értik. Ezért validálja az OpsPlane gateway közvetlenül az auth szolgáltatás felé a JWT-ket és az `opsk_*` API kulcsokat, rövid életű gyorsítótárral — ahelyett, hogy az autentikáció egy utólag felcsavarozott bővítmény lenne.

A gyakorlati különbség az, hogy egy útvonalra kötött auth szabályt ugyanaz az azonosítási rendszer érvényesít, amiben a szolgáltatásaid is megbíznak. Nincs a peremen egy második, külön szinkronban tartandó hitelesítőadat-készlet.

## A kompromisszum

Az őszinte ára egy erős függőség. Ha az auth szolgáltatás nem elérhető, semmi nem hitelesít. Szerintünk ez a helyes csere — egyetlen jól értett függőség, amit magas rendelkezésre állásúvá tudsz tenni, jobb, mint öt részleges megvalósítás, amiről nem tudsz gondolkodni —, de valós korlát, és érdemes ehhez igazítani a telepítést.

Cserébe megkapod a képességet, hogy válaszolj arra az egyszerű kérdésre. A legtöbb platformcsapatnak ez többet ér, mint a feladott függetlenség.
