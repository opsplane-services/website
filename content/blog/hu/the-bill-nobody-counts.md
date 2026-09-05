---
title: 'A számla, amit senki nem számol össze'
date: '2026-09-05'
excerpt: 'Hat SaaS előfizetés megfizethetőnek tűnik a számlán. Az igazi költség az, ami sosem kerül rá — az integráció, az átvilágítások, a hosszabbítások és a mérnökök, akik mindezt összetartják.'
author: 'Az OpsPlane csapat'
tags: ['platform', 'költség']
---

Add össze, mennyit fizet egy közepes méretű mérnöki szervezet a terméke alatti rétegért. Feature flagek. Incidenskezelés. Titokkezelő. API gateway. Valami az AI funkciókhoz. Talán egy workflow motor.

Mindegyik önmagában védhető. Mindegyik olcsóbb volt, mint megépíteni. És mindegyik számla külön-külön kerekítési hiba a bérköltséghez képest.

Ezt a számlát számolja mindenki. Nem ez a drága.

## Amit a számla kihagy

Abban a pillanatban, hogy hat szállítód van egy helyett, minden másból is hatot vettél.

**Hat integráció.** Valójában nem hat — inkább annyi, ahány pár egymásról tudni akar. A flag-szolgáltatásnak tudnia kell, ki a felhasználó. Az incidenskezelőnek tudnia kell, melyik csapaté egy szolgáltatás. A gatewaynek ugyanazt a jogosultságot kell érvényesítenie, mint az alkalmazásodnak. Ezek a szállítók nem terveztek egymásra, így a ragasztókód a tiéd — és a működésben tartása is.

**Hat biztonsági átvilágítás.** Minden hosszabbítási körben valaki kitölt egy kérdőívet, utánamegy egy SOC 2 riportnak, és újratárgyalja az adatfeldolgozási szerződést. Ez a munka nem lesz gyorsabb a gyakorlattól.

**Hat hibamód, ami felett nincs kontrollod.** Ha egy szállítónál kiesés van, a státuszoldalukról tudod meg, és vársz.

**Hat frissítési taposómalom.** Kivezetett API-k, kényszerű migrációk, áremelés hosszabbításkor, és időnként egy felvásárlás, ami mindent megváltoztat egy eszközben, amire már gondolni sem kellett.

Ebből semmi nem jelenik meg tételként. Mérnökökként jelenik meg, akik el vannak foglalva, de nem azon dolgoznak, amit eladsz.

## Miért az egy dolog

Az alternatíva nem az, hogy „építsd meg magad”. Hat szolgáltatást nulláról megépíteni rosszabb üzlet, mint hatot megvenni.

Az alternatíva egyetlen platform, amiben ezek már benne vannak, és ahol a darabokat az első pillanattól egymásra tervezték. Egy azonosítási modell, amit minden szolgáltatás olvas, így nincs köztük ragasztó. Egy telepítés, egy adathatár, egy biztonsági átvilágítás. Egy dolog, amit frissíteni kell.

Ez viszont csak akkor működik, ha a platform kicsi marad. Egy összevont platform, amihez dedikált csapat kell, csak áthelyezte a költséget, nem megszüntette. A próba az, hogy az a csapat, amelyik ma is viszi az infrastruktúrádat, el tudja-e vinni ezt is anélkül, hogy a főállásává válna.

## Mikor rossz válasz ez

Érdemes kimondani azokat az eseteket is, amikor nem ez a jó irány.

Ha pontosan egyet használsz ezekből az eszközökből, és a többivel nincs terved, akkor a célszoftver egyszerűbb — tartsd meg. Ha a csapatod mélyen beleépült egy adott szállító ökoszisztémájába, a migráció költsége valós, és lehet, hogy nem térül meg. És ha nálatok senki nem akar infrastruktúrát üzemeltetni, akkor a saját üzemeltetésű platform rossz forma, függetlenül a számtantól.

De ha felismered a bekezdés elején lévő listát — és mellette a csendes fejszámot, ami összetartja —, akkor érdemes rendesen elvégezni a konszolidációs számítást. A legtöbb csapat még sosem tette meg.
