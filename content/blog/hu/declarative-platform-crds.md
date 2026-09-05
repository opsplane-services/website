---
title: 'A platformod helye a Git, nem egy felület, amit valaki egyszer végigkattintott'
date: '2026-07-02'
excerpt: 'Tizenkilenc egyedi erőforrás, egy operátor, és a különbség egy újraépíthető platform és egy olyan között, amiről csak reménykedsz, hogy tovább fut.'
author: 'Az OpsPlane csapat'
tags: ['kubernetes', 'gitops', 'operátor']
---

Érdemes feltenni egy kérdést bármelyik belső platformról: ha ma éjjel eltűnne a klaszter, mennyit tudnál belőle újraépíteni egy repóból?

Sok csapatnál a válasz az, hogy „az alkalmazásokat igen — a platformkonfigurációt nem igazán”. Az útvonalak, a rate limitek, a szerepkörök, a titoktár konnektora: ezeket egyszer, egy felületen állította be valaki, aki azóta másik csapatban dolgozik.

## Konfiguráció, ami csak egy adatbázisban létezik

Egy beállítási oldal funkciónak tűnik. Az is — egészen addig, amíg egy döntés egyetlen nyilvántartásává nem válik.

A kattintással beállított állapotnak nincs diffje, tehát nem tudod átnézni. Nincs története, tehát nem látod, mikor és miért változott. Nincs visszaállítása azon túl, hogy emlékszel, mi volt korábban. És nem hozható létre újra egy staging környezetben anélkül, hogy valaki megismételné ugyanazokat a kattintásokat ugyanabban a sorrendben.

Ebből semmi nem látszik azon a napon, amikor beállítod. Mind látszani fog egy incidens közben.

## Tizenkilenc CRD és egy reconciler

Az OpsPlane ugyanúgy kezeli a platformkonfigurációt, ahogy a Kubernetes a workloadokat: deklarált erőforrásként, amit egy kontroller szinkronizál.

Egy Go operátor 19 egyedi erőforrás-definíciót figyel, és szinkronizálja őket a mögöttes szolgáltatásokba:

- **Identitás** — szervezetek, felhasználók, csoportok, szerepkörök, szolgáltatásfiókok
- **Gateway** — útvonalak, upstreamek, rate limit szabályok, auth szabályok, WASM bővítmények
- **Biztonság** — titok-konnektorok Vaulthoz, OpenBaóhoz és a felhős titokkezelőkhöz
- **Incidensek** — Grafana konnektorok

Mindegyikből YAML fájl lesz egy repóban. Ez azt jelenti, hogy minden módosítás egy pull request, minden módosításnak van szerzője és indoka, a visszaállítás pedig `git revert`, nem régészeti feltárás.

## Szinkronizált, nem szkriptelt

Fontos különbség van eközött és egy provisioning szkript között.

Az operátor create-if-not-exists végpontokon keresztül szinkronizálja az erőforrásokat az egyes szolgáltatásokba. Ugyanannak a manifestnek a kétszeri alkalmazása nem hiba, és nem duplikátum — a deklarált állapot felé konvergál. Éppen ez a tulajdonság teszi biztonságossá, hogy folyamatosan fusson, ahelyett hogy egy egyszeri migráció lenne, amit félsz újra lefuttatni.

Azt is jelenti, hogy az elcsúszás láthatóvá válik. Ha valaki kézzel átír egy útvonalat, a deklarált és a tényleges állapot eltér — és ez látszik.

## A felület továbbra is létezik

Semmi ebből nem érv a webes felület ellen. Az OpsPlane szállít egyet — dashboardokkal, incidensekkel, flagekkel, konnektorokkal, beállításokkal, sötét témával, mindennel.

A különbség az, hogy a felület *mire való*. Kiváló az állapot leolvasására incidens közben, annak felfedezésére, hogy mi létezik, és egy riasztás triázsolásának valóban interaktív munkájához. Rossz viszont nyilvántartásnak olyan konfigurációhoz, aminek túl kell élnie azt, aki beállította.

A konzolt arra használd, hogy megértsd a platformodat. A repót arra, hogy definiáld.
