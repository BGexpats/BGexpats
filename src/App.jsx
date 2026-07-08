import { useState, useRef, useEffect } from "react"

const INIT_POSTS=[
  {id:1,author:"BGexpats Team",av:"BG",role:"Official",time:"Just now",
   title:"Welcome to the BGexpats community 👋",
   body:"This is your space — ask questions, share experiences, help other expats navigate life in Bulgaria. Whether you just arrived or have been here for years, your insights are valuable. Start by introducing yourself below!",
   cat:"General",likes:0,replies:0,pinned:true},
  {id:2,author:"BGexpats Team",av:"BG",role:"Official",time:"Just now",
   title:"📌 How to use BGexpats — quick guide",
   body:"🗺️ MAP — Find hospitals, banks, car rentals, restaurants and more in 16 cities\n🛠️ TOOLS — Tax calculator, visa checker, cost comparison across 11 cities\n💑 CONNECT — Meet expats and Bulgarians\n📱 APPS — 50 essential apps for life in Bulgaria\n\nHave a question not answered in the guides? Ask below or use the AI assistant!",
   cat:"Guide",likes:0,replies:0,pinned:true},
]
const C = {
  page:"#f5f1e8",surface:"#ffffff",primary:"#1e5e3f",primaryDark:"#164530",
  primaryLight:"#e6f2eb",accent:"#b8792a",text:"#1c1c1a",muted:"#6e6b65",border:"#e0dbd0",
}

const LANGS = {
  en:{flag:"🇬🇧",name:"English",   short:"EN"},
  fr:{flag:"🇫🇷",name:"Français",  short:"FR"},
  es:{flag:"🇪🇸",name:"Español",   short:"ES"},
  de:{flag:"🇩🇪",name:"Deutsch",   short:"DE"},
  nl:{flag:"🇳🇱",name:"Nederlands",short:"NL"},
  ru:{flag:"🇷🇺",name:"Русский",   short:"RU"},
  uk:{flag:"🇺🇦",name:"Українська",short:"UK"},
  tr:{flag:"🇹🇷",name:"Türkçe",    short:"TR"},
  bg:{flag:"🇧🇬",name:"Български", short:"BG"},
}

const T = {
  en:{
    badge:"Your complete guide to life in Bulgaria",
    h1a:"Everything expats need",h1b:"to live well in Bulgaria",
    sub:"Visas, healthcare, banking, housing and more — all in plain English. Plus an AI assistant available 24/7.",
    askBtn:"Ask the AI assistant",stats:["Topics covered","AI assistant","Free to use"],
    browse:"Browse topics",browseSub:"Everything you need to know, organized by topic",
    facts:"Quick facts about Bulgaria",
    factsList:[
      ["💰","10% flat income tax — one of the lowest in the EU"],
      ["💶","Bulgaria uses the Euro (€) since 2025 — fixed rate"],
      ["🚑","Emergency: 112 (police, fire, ambulance)"],
      ["🇪🇺","EU member since 2007 — free movement for EU citizens"],
      ["🏔️","2nd cheapest cost of living in the EU"],
      ["☀️","300+ sunny days/year on the Black Sea coast"],
    ],
    ctaTitle:"Have a specific question?",
    ctaSub:"Ask the AI assistant anything about living in Bulgaria.\nAvailable 24/7, answers in seconds.",
    ctaBtn:"Start chatting →",guide:"guide",guides:"guides",
    stillQ:"Still have questions?",askLink:"Ask the AI →",
    chatTitle:"BGexpats AI",chatSub:"Expert on expat life in Bulgaria",
    greeting:"👋 Hi! I'm your BGexpats assistant.\n\nAsk me anything about living in or visiting Bulgaria — visas, healthcare, banking, housing, taxes, or local tips. I'm here to help!",
    suggestions:["How do I get a residency permit?","What's the cost of living in Sofia?","How to open a bank account as a foreigner?","How to register an EOOD company?","Best neighborhoods in Sofia for expats?"],
    placeholder:"Ask anything about life in Bulgaria...",
    translating:"Translating...",home:"← Home",translateBtn:"Translate this guide",
  },
  fr:{
    badge:"Votre guide complet pour vivre en Bulgarie",
    h1a:"Tout ce dont les expatriés ont besoin",h1b:"pour vivre bien en Bulgarie",
    sub:"Visas, santé, banque, logement et plus — tout clairement expliqué. Plus un assistant IA disponible 24h/24.",
    askBtn:"Demander à l'assistant IA",stats:["Sujets couverts","Assistant IA","Entièrement gratuit"],
    browse:"Parcourir les sujets",browseSub:"Tout ce que vous devez savoir, organisé par sujet",
    facts:"Faits essentiels sur la Bulgarie",
    factsList:[
      ["💰","Impôt sur le revenu de 10% — l'un des plus bas de l'UE"],
      ["💶","Le lev est fixé à 1,95583 par euro — taux fixe"],
      ["🚑","Urgences : 112 (police, pompiers, ambulance)"],
      ["🇪🇺","Membre de l'UE depuis 2007 — libre circulation pour les citoyens UE"],
      ["🏔️","2e coût de la vie le moins cher de l'UE"],
      ["☀️","Plus de 300 jours ensoleillés par an sur la mer Noire"],
    ],
    ctaTitle:"Vous avez une question précise ?",
    ctaSub:"Posez n'importe quelle question à l'IA sur la vie en Bulgarie.\nDisponible 24h/24, réponse en quelques secondes.",
    ctaBtn:"Commencer à chatter →",guide:"guide",guides:"guides",
    stillQ:"Vous avez encore des questions ?",askLink:"Demander à l'IA →",
    chatTitle:"Assistant IA BGexpats",chatSub:"Expert sur la vie d'expatrié en Bulgarie",
    greeting:"👋 Bonjour ! Je suis votre assistant guide pour la Bulgarie.\n\nPosez-moi n'importe quelle question sur la vie en Bulgarie — visas, santé, banque, logement, impôts ou conseils locaux. Je suis là pour vous aider !",
    suggestions:["Comment obtenir un permis de résidence ?","Quel est le coût de la vie à Sofia ?","Comment ouvrir un compte bancaire en tant qu'étranger ?","Comment créer une société EOOD ?","Meilleurs quartiers de Sofia pour les expatriés ?"],
    placeholder:"Posez n'importe quelle question sur la vie en Bulgarie...",
    translating:"Traduction en cours...",home:"← Accueil",translateBtn:"Traduire ce guide",
  },
  es:{
    badge:"Tu guía completa para vivir en Bulgaria",
    h1a:"Todo lo que los expatriados necesitan",h1b:"para vivir bien en Bulgaria",
    sub:"Visados, sanidad, banca, vivienda y más — todo explicado claramente. Más un asistente de IA disponible 24/7.",
    askBtn:"Preguntar al asistente IA",stats:["Temas cubiertos","Asistente IA","Totalmente gratis"],
    browse:"Explorar temas",browseSub:"Todo lo que necesitas saber, organizado por tema",
    facts:"Datos clave sobre Bulgaria",
    factsList:[
      ["💰","IRPF del 10% — uno de los más bajos de la UE"],
      ["💶","El lev está fijado a 1,95583 por euro — tipo fijo"],
      ["🚑","Emergencias: 112 (policía, bomberos, ambulancia)"],
      ["🇪🇺","Miembro de la UE desde 2007 — libre circulación para ciudadanos UE"],
      ["🏔️","2º coste de vida más bajo de la UE"],
      ["☀️","Más de 300 días soleados al año en la costa del Mar Negro"],
    ],
    ctaTitle:"¿Tienes una pregunta específica?",
    ctaSub:"Pregunta al asistente IA cualquier cosa sobre vivir en Bulgaria.\nDisponible 24/7, respuestas en segundos.",
    ctaBtn:"Empezar a chatear →",guide:"guía",guides:"guías",
    stillQ:"¿Tienes más preguntas?",askLink:"Preguntar al IA →",
    chatTitle:"Asistente IA BGexpats",chatSub:"Experto en vida de expatriado en Bulgaria",
    greeting:"👋 ¡Hola! Soy tu asistente guía para Bulgaria.\n\nPregúntame lo que quieras sobre vivir o visitar Bulgaria — visados, sanidad, banca, vivienda, impuestos o consejos locales. ¡Estoy aquí para ayudarte!",
    suggestions:["¿Cómo obtengo un permiso de residencia?","¿Cuál es el coste de vida en Sofía?","¿Cómo abro una cuenta bancaria como extranjero?","¿Cómo registro una empresa EOOD?","¿Mejores barrios de Sofía para expatriados?"],
    placeholder:"Pregunta cualquier cosa sobre la vida en Bulgaria...",
    translating:"Traduciendo...",home:"← Inicio",translateBtn:"Traducir esta guía",
  },
  de:{
    badge:"Ihr vollständiger Leitfaden für das Leben in Bulgarien",
    h1a:"Alles, was Expats brauchen,",h1b:"um gut in Bulgarien zu leben",
    sub:"Visa, Gesundheit, Banking, Wohnen und mehr — klar erklärt. Plus ein KI-Assistent rund um die Uhr verfügbar.",
    askBtn:"KI-Assistent fragen",stats:["Themen abgedeckt","KI-Assistent","Kostenlos"],
    browse:"Themen durchsuchen",browseSub:"Alles, was Sie wissen müssen, nach Thema geordnet",
    facts:"Wichtige Fakten über Bulgarien",
    factsList:[
      ["💰","10% Einkommensteuer — einer der niedrigsten in der EU"],
      ["💶","Der Lev ist fest bei 1,95583 je Euro — fester Wechselkurs"],
      ["🚑","Notruf: 112 (Polizei, Feuerwehr, Krankenwagen)"],
      ["🇪🇺","EU-Mitglied seit 2007 — Freizügigkeit für EU-Bürger"],
      ["🏔️","Zweitgünstigstes Land in der EU (Lebenshaltungskosten)"],
      ["☀️","300+ Sonnentage pro Jahr an der Schwarzmeerküste"],
    ],
    ctaTitle:"Haben Sie eine spezifische Frage?",
    ctaSub:"Fragen Sie den KI-Assistenten alles über das Leben in Bulgarien.\nRund um die Uhr verfügbar, Antworten in Sekunden.",
    ctaBtn:"Chat starten →",guide:"Leitfaden",guides:"Leitfäden",
    stillQ:"Noch Fragen?",askLink:"KI fragen →",
    chatTitle:"BGexpats KI",chatSub:"Experte für Expat-Leben in Bulgarien",
    greeting:"👋 Hallo! Ich bin Ihr Bulgarien-Reiseführer-Assistent.\n\nFragen Sie mich alles über das Leben in oder den Besuch Bulgariens — Visa, Gesundheit, Banking, Wohnen, Steuern oder lokale Tipps. Ich helfe Ihnen gerne!",
    suggestions:["Wie bekomme ich eine Aufenthaltserlaubnis?","Wie sind die Lebenshaltungskosten in Sofia?","Wie eröffne ich ein Bankkonto als Ausländer?","Wie registriere ich eine EOOD-Firma?","Beste Viertel in Sofia für Expats?"],
    placeholder:"Stellen Sie eine Frage über das Leben in Bulgarien...",
    translating:"Übersetze...",home:"← Startseite",translateBtn:"Diesen Leitfaden übersetzen",
  },
  nl:{
    badge:"Uw complete gids voor het leven in Bulgarije",
    h1a:"Alles wat expats nodig hebben",h1b:"om goed te leven in Bulgarije",
    sub:"Visa's, gezondheidszorg, bankieren, wonen en meer — duidelijk uitgelegd. Plus een AI-assistent beschikbaar 24/7.",
    askBtn:"Vraag de AI-assistent",stats:["Onderwerpen","AI-assistent","Gratis"],
    browse:"Onderwerpen bekijken",browseSub:"Alles wat u moet weten, per onderwerp georganiseerd",
    facts:"Feiten over Bulgarije",
    factsList:[
      ["💰","10% vlak inkomstenbelasting — een van de laagste in de EU"],
      ["💶","De lev is vastgezet op 1,95583 per euro — vaste koers"],
      ["🚑","Noodgeval: 112 (politie, brandweer, ambulance)"],
      ["🇪🇺","EU-lid sinds 2007 — vrij verkeer voor EU-burgers"],
      ["🏔️","2e goedkoopste levensonderhoud in de EU"],
      ["☀️","300+ zonnedagen per jaar aan de Zwarte Zeekust"],
    ],
    ctaTitle:"Heeft u een specifieke vraag?",
    ctaSub:"Vraag de AI-assistent alles over leven in Bulgarije.\nBeschikbaar 24/7, antwoorden in seconden.",
    ctaBtn:"Begin met chatten →",guide:"gids",guides:"gidsen",
    stillQ:"Heeft u nog vragen?",askLink:"Vraag de AI →",
    chatTitle:"BGexpats AI",chatSub:"Expert in expatleven in Bulgarije",
    greeting:"👋 Hallo! Ik ben uw gids-assistent voor Bulgarije.\n\nStel me alles over leven in of bezoeken van Bulgarije — visa's, gezondheidszorg, bankieren, wonen, belastingen of lokale tips. Ik help u graag!",
    suggestions:["Hoe krijg ik een verblijfsvergunning?","Wat zijn de kosten van levensonderhoud in Sofia?","Hoe open ik een bankrekening als buitenlander?","Hoe registreer ik een EOOD-bedrijf?","Beste wijken in Sofia voor expats?"],
    placeholder:"Stel een vraag over het leven in Bulgarije...",
    translating:"Vertalen...",home:"← Terug",translateBtn:"Vertaal deze gids",
  },
  ru:{
    badge:"Ваш полный путеводитель по жизни в Болгарии",
    h1a:"Всё необходимое для экспатов",h1b:"чтобы хорошо жить в Болгарии",
    sub:"Визы, здравоохранение, банки, жильё и многое другое — на понятном языке. Плюс ИИ-ассистент 24/7.",
    askBtn:"Задать вопрос ИИ-ассистенту",stats:["Тем охвачено","ИИ-ассистент","Бесплатно"],
    browse:"Просмотр тем",browseSub:"Всё, что нужно знать — организовано по темам",
    facts:"Факты о Болгарии",
    factsList:[
      ["💰","Подоходный налог 10% — один из самых низких в ЕС"],
      ["💶","Болгария использует евро (€) с 2025 года"],
      ["🚑","Экстренная помощь: 112 (полиция, пожарные, скорая)"],
      ["🇪🇺","Член ЕС с 2007 года — свободное передвижение для граждан ЕС"],
      ["🏔️","2-я самая дешёвая страна по стоимости жизни в ЕС"],
      ["☀️","300+ солнечных дней в год на Черноморском побережье"],
    ],
    ctaTitle:"Есть конкретный вопрос?",
    ctaSub:"Задайте ИИ-ассистенту любой вопрос о жизни в Болгарии.\nДоступен 24/7, ответ за секунды.",
    ctaBtn:"Начать чат →",guide:"гид",guides:"гиды",
    stillQ:"Остались вопросы?",askLink:"Спросить ИИ →",
    chatTitle:"BGexpats ИИ",chatSub:"Эксперт по жизни экспатов в Болгарии",
    greeting:"👋 Привет! Я ваш ассистент BGexpats.\n\nЗадайте любой вопрос о жизни или туризме в Болгарии — визы, здравоохранение, банки, жильё, налоги или местные советы. Я здесь, чтобы помочь!",
    suggestions:["Как получить вид на жительство?","Какова стоимость жизни в Софии?","Как открыть банковский счёт иностранцу?","Как зарегистрировать компанию ЭООД?","Лучшие районы Софии для экспатов?"],
    placeholder:"Задайте вопрос о жизни в Болгарии...",
    translating:"Перевод...",home:"← Главная",translateBtn:"Перевести этот гид",
  },
  uk:{
    badge:"Ваш повний путівник по життю в Болгарії",
    h1a:"Все необхідне для експатів",h1b:"щоб добре жити в Болгарії",
    sub:"Візи, охорона здоров'я, банки, житло та багато іншого — зрозумілою мовою. Плюс ШІ-асистент 24/7.",
    askBtn:"Запитати ШІ-асистента",stats:["Тем охоплено","ШІ-асистент","Безкоштовно"],
    browse:"Перегляд тем",browseSub:"Все, що потрібно знати — організовано за темами",
    facts:"Факти про Болгарію",
    factsList:[
      ["💰","Прибутковий податок 10% — один з найнижчих у ЄС"],
      ["💶","Болгарія використовує євро (€) з 2025 року"],
      ["🚑","Екстрена допомога: 112 (поліція, пожежні, швидка)"],
      ["🇪🇺","Член ЄС з 2007 року — вільне пересування для громадян ЄС"],
      ["🏔️","2-га найдешевша країна за вартістю життя в ЄС"],
      ["☀️","300+ сонячних днів на рік на Чорноморському узбережжі"],
    ],
    ctaTitle:"Є конкретне запитання?",
    ctaSub:"Задайте ШІ-асистенту будь-яке запитання про життя в Болгарії.\nДоступний 24/7, відповідь за секунди.",
    ctaBtn:"Почати чат →",guide:"гід",guides:"гіди",
    stillQ:"Залишилися питання?",askLink:"Запитати ШІ →",
    chatTitle:"BGexpats ШІ",chatSub:"Експерт з життя експатів у Болгарії",
    greeting:"👋 Привіт! Я ваш асистент BGexpats.\n\nЗадайте будь-яке питання про життя або туризм у Болгарії — візи, охорона здоров'я, банки, житло, податки або місцеві поради. Я тут, щоб допомогти!",
    suggestions:["Як отримати посвідку на проживання?","Яка вартість життя в Софії?","Як відкрити банківський рахунок іноземцю?","Як зареєструвати компанію ЕООД?","Найкращі райони Софії для експатів?"],
    placeholder:"Задайте питання про життя в Болгарії...",
    translating:"Переклад...",home:"← Головна",translateBtn:"Перекласти цей гід",
  },
  bg:{
    badge:"Вашият пълен наръчник за живота в България",
    h1a:"Всичко, което експатите имат нужда",h1b:"за добър живот в България",
    sub:"Визи, здравеопазване, банки, жилища и още — на разбираем език. Плюс ИИ асистент 24/7.",
    askBtn:"Попитай ИИ асистента",stats:["Теми","ИИ асистент","Безплатно"],
    browse:"Разгледай темите",browseSub:"Всичко, което трябва да знаете — организирано по теми",
    facts:"Бързи факти за България",
    factsList:[
      ["💰","Плосък данък 10% — един от най-ниските в ЕС"],
      ["💶","България използва евро (€) от 2025 година"],
      ["🚑","Спешна помощ: 112 (полиция, пожарна, линейка)"],
      ["🇪🇺","Член на ЕС от 2007 г. — свободно движение за граждани на ЕС"],
      ["🏔️","2-ра най-евтина страна по разходи за живот в ЕС"],
      ["☀️","300+ слънчеви дни годишно по Черноморието"],
    ],
    ctaTitle:"Имате конкретен въпрос?",
    ctaSub:"Задайте на ИИ асистента всичко за живота в България.\nДостъпен 24/7, отговор за секунди.",
    ctaBtn:"Започни чат →",guide:"наръчник",guides:"наръчници",
    stillQ:"Имате още въпроси?",askLink:"Попитай ИИ →",
    chatTitle:"BGexpats ИИ",chatSub:"Експерт по живота на експати в България",
    greeting:"👋 Здравейте! Аз съм вашият BGexpats асистент.\n\nЗадайте всякакви въпроси за живота или туризма в България — визи, здравеопазване, банки, жилища, данъци или местни съвети. Тук съм, за да помогна!",
    suggestions:["Как да получа разрешение за пребиваване?","Какви са разходите за живот в София?","Как да открия банкова сметка като чужденец?","Как да регистрирам ЕООД?","Най-добрите квартали в София за експати?"],
    placeholder:"Задайте въпрос за живота в България...",
    translating:"Превод...",home:"← Начало",translateBtn:"Преведи този наръчник",
  },
  tr:{
    badge:"Bulgaristan'da yaşamın tam rehberi",
  tr:{
    badge:"Bulgaristan'da yaşamın tam rehberi",
    h1a:"Expatların ihtiyaç duyduğu her şey",h1b:"Bulgaristan'da iyi yaşamak için",
    sub:"Vizeler, sağlık, bankacılık, konut ve daha fazlası — sade bir dille. Ayrıca 7/24 yapay zeka asistanı.",
    askBtn:"Yapay zeka asistanına sor",stats:["Konu başlığı","Yapay zeka asistanı","Ücretsiz"],
    browse:"Konulara göz at",browseSub:"Bilmeniz gereken her şey, konulara göre düzenlenmiş",
    facts:"Bulgaristan hakkında hızlı gerçekler",
    factsList:[
      ["💰","Düz %10 gelir vergisi — AB'nin en düşüklerinden"],
      ["💶","Bulgaristan 2025'ten itibaren Euro (€) kullanıyor"],
      ["🚑","Acil: 112 (polis, itfaiye, ambulans)"],
      ["🇪🇺","2007'den beri AB üyesi — AB vatandaşları için serbest dolaşım"],
      ["🏔️","AB'de yaşam maliyeti en düşük 2. ülke"],
      ["☀️","Karadeniz kıyısında yılda 300+ güneşli gün"],
    ],
    ctaTitle:"Belirli bir sorunuz mu var?",
    ctaSub:"Yapay zeka asistanına Bulgaristan'da yaşamla ilgili her şeyi sorun.\n7/24 mevcut, saniyeler içinde yanıt.",
    ctaBtn:"Sohbete başla →",guide:"rehber",guides:"rehberler",
    stillQ:"Hâlâ sorularınız mı var?",askLink:"Yapay zekaya sor →",
    chatTitle:"BGexpats Yapay Zeka",chatSub:"Bulgaristan expat yaşamı uzmanı",
    greeting:"👋 Merhaba! Ben BGexpats asistanınızım.\n\nBulgaristan'da yaşam veya turizm hakkında her şeyi sorabilirsiniz — vizeler, sağlık, bankacılık, konut, vergiler veya yerel ipuçları. Yardımcı olmak için buradayım!",
    suggestions:["Oturma izni nasıl alınır?","Sofya'da yaşam maliyeti nedir?","Yabancı olarak banka hesabı nasıl açılır?","EOOD şirketi nasıl kurulur?","Expatlar için Sofya'nın en iyi mahalleleri?"],
    placeholder:"Bulgaristan'da yaşam hakkında bir şeyler sorun...",
    translating:"Çevriliyor...",home:"← Ana sayfa",translateBtn:"Bu rehberi çevir",
  },
}

const CATEGORIES = [
  {
    id:"legal",icon:"⚖️",bg:"#e8f0fd",
    labels:{en:{label:"Legal & Residency",sub:"Visas, permits, registration"},fr:{label:"Juridique & Résidence",sub:"Visas, permis, inscription"},es:{label:"Legal y Residencia",sub:"Visados, permisos, registro"},de:{label:"Recht & Aufenthalt",sub:"Visa, Genehmigungen, Anmeldung"},nl:{label:"Juridisch & Verblijf",sub:"Visa's, vergunningen, registratie"}},
    articles:[
      {titles:{en:"Type D visa — for non-EU citizens",fr:"Visa de type D — pour les ressortissants hors UE",es:"Visado tipo D — para ciudadanos no comunitarios",de:"Typ-D-Visum — für Nicht-EU-Bürger",nl:"Type D-visum — voor niet-EU-burgers"},
       source:"Bulgarian Ministry of Foreign Affairs",sourceUrl:"https://www.mfa.bg",readTime:"4 min read",body:`A Type D (long-stay) visa lets you stay in Bulgaria for up to 180 days and is the first step toward residency.\n\n**Who needs it:** Non-EU/EEA citizens who want to stay longer than 90 days.\n\n**Documents needed:**\n• Valid passport (6+ months remaining)\n• Health insurance (min €30,000 coverage)\n• Proof of accommodation (rental contract)\n• Proof of finances (~€500/month in account)\n• Proof of purpose (work, study, family, etc.)\n\n**Apply at:** The Bulgarian embassy in your home country.\n\n**Processing:** 10–30 days. Fee ~€100.\n\n**After arrival:** Within 3 months, apply for a Temporary Residence Permit at your local Migration Directorate.\n\n💡 Tip: Call the Bulgarian embassy first — they give you the exact list for your nationality.`},
      {titles:{en:"EU citizens — registering your right to stay",fr:"Citoyens UE — enregistrer votre droit de séjour",es:"Ciudadanos UE — registrar su derecho de residencia",de:"EU-Bürger — Anmeldung des Aufenthaltsrechts",nl:"EU-burgers — uw verblijfsrecht registreren"},
       source:"Bulgarian Migration Directorate",sourceUrl:"https://mvr.bg/nsdmp",readTime:"3 min read",body:`As an EU/EEA citizen you have the right to live in Bulgaria without a visa. But after 3 months you must register.\n\n**Where to go:** Your local Migration Directorate office.\n\n**Documents needed:**\n• Valid EU passport or national ID card\n• Proof of address (rental contract or property deed)\n• Proof of income or employment, OR health insurance\n• 2 passport photos\n\n**Cost:** ~€5\n**Time:** Usually same day or 1–2 days\n\n**After 5 years:** You can apply for permanent residency.\n\n💡 Register in the city where you actually live — Sofia, Plovdiv, Varna each have their own office.`},
      {titles:{en:"Digital nomads & self-employed in Bulgaria",fr:"Nomades numériques et indépendants en Bulgarie",es:"Nómadas digitales y autónomos en Bulgaria",de:"Digitale Nomaden und Selbstständige in Bulgarien",nl:"Digitale nomaden en zelfstandigen in Bulgarije"},
       body:`Bulgaria is popular with digital nomads: 10% flat income tax, EU membership, and very low cost of living.\n\n**Best option — start a Bulgarian EOOD company:** Corporate tax is 10%, dividends taxed at 5%. Total effective tax ~14.5% — among the lowest in the EU.\n\n**EOOD registration:** 3–7 days, ~€50–150 in state fees plus notary.\n\n**You will need:** A local accountant (~€75–150/month). Essential and worth every lev.\n\n**Alternatively:** Type D visa (freelance) — apply showing regular income from abroad (€500+/month in bank statements).\n\n💡 Facebook groups "Sofia Digital Nomads" and "Expats in Sofia" are very active and helpful.`},
    ,
      {titles:{en:"Driving licence exchange",fr:"\u00c9change de permis de conduire",es:"Canje del carn\u00e9 de conducir",de:"F\u00fchrerscheinumtausch",nl:"Rijbewijsomwisseling",ru:"Обмен водительского удостоверения",uk:"Обмін водійського посвідчення",tr:"Ehliyet değişimi",bg:"Смяна на шофьорска книжка"},
       source:"KAT Traffic Police",sourceUrl:"https://www.mvr.bg/ods",readTime:"5 min read",body:`**Bulgaria recognises driving licences from all EU countries, Vienna Convention countries, and others — but the rules differ.**

## EU/EEA citizens

• You can drive on your home licence indefinitely while it's valid
• When it expires, simply exchange it at KAT (Traffic Police) — **no test required**
• Documents needed: current licence, residence certificate, 2 passport photos, medical certificate (~€15 from approved Bulgarian doctor), ~€10 fee
• Processing: 1–3 days

**Where to go:** KAT headquarters — 52 Cherni Vrah Blvd, Sofia (KAT Пътна полиция)

---

## Vienna Convention countries (US, UK, Canada, Australia, Switzerland)

Bulgaria accepts licences from Vienna Convention members with a simple exchange — **no driving test required**.

• You may drive on your foreign licence for **up to 6 months** after establishing residence
• After 6 months you must exchange or risk an invalid licence
• UK post-Brexit: treated as Vienna Convention (not EU) — exchange only, no test
• Required: official Bulgarian translation of your licence (notarised, ~€25), same docs as EU

**Important for US drivers:** Your licence must show your full legal name. An International Driving Permit (IDP) alongside your US licence is strongly recommended for the first 6 months.

---

## Non-Vienna Convention countries (some Asian, African, Middle Eastern countries)

You must take the **full Bulgarian driving test** — theory and practical.

• Enrol at a licensed Bulgarian driving school (автошкола)
• Theory: computer-based test, available in English at select centres in Sofia
• Practical: conducted in Bulgarian traffic with an examiner
• **Cost: €400–750** (school fees + test fees)
• Processing time: 1–3 months depending on school availability

---

## The medical certificate

All exchanges require a Bulgarian medical certificate (медицинско свидетелство за водач):
• Blood pressure, vision check, declaration of no alcohol/drug dependency
• Any approved medical clinic can issue it
• Cost: €15–30
• Valid for 1 year

💡 **Tip:** Go to KAT early in the morning — queues are long. Bring all documents in originals AND photocopies. The whole process takes 1–2 hours if you have everything.

💡 **Online check:** bgktd.bg — check your current licence status and book appointments.`},
      {titles:{en:"Retirement in Bulgaria \u2014 the complete guide",fr:"Prendre sa retraite en Bulgarie",es:"Jubilarse en Bulgaria",de:"Rente in Bulgarien",nl:"Pensionering in Bulgarije"},
       source:"Bulgarian Migration Directorate",sourceUrl:"https://mvr.bg/nsdmp",readTime:"6 min read",body:`Bulgaria is one of Europe's most affordable and beautiful retirement destinations — with a warm climate, low cost of living, excellent healthcare, and a welcoming expat community.

## Can you retire in Bulgaria?

**EU/EEA retirees:** Yes, with minimal paperwork. Register at Migration Directorate within 3 months of arrival.

**Non-EU retirees:** Apply for a Type D visa (financial means category), then annual temporary residence. After 5 years, permanent residence.

---

## Financial requirements

• **Minimum income proof:** ~€500/month per person (pension statement, investment income, etc.)
• **Or savings:** €30,000–60,000 in a bank account
• **Health insurance:** Required if not covered by your home country's S1 scheme

**EU retirees with S1 form:** Your home country pays for your Bulgarian healthcare — huge benefit. Register your S1 at the NHIF (НЗОК) office.

---

## Monthly budget (couple)

| Expense | Budget | Comfortable |
|---|---|---|
| Rent (2-bed) | €450 | €700 |
| Food | €250 | €400 |
| Utilities | €80 | €130 |
| Health/insurance | €100 | €200 |
| Transport | €50 | €100 |
| Entertainment | €150 | €300 |
| **Total** | **€1,080** | **€1,830** |

---

## Best retirement locations

**Sofia** — Best medical facilities, international community, cultural life. Slightly more expensive.

**Varna** — Black Sea coast, warm summers, large British/German expat community. Excellent for active retirees.

**Plovdiv** — Charming Old Town, mild climate, growing arts scene. Very affordable.

**Bansko** — Mountain air, skiing in winter, cool summers. Popular with UK retirees. Properties from €40,000.

**Velingrad** — Thermal spas, mineral waters, health-focused community. Excellent for health-conscious retirees.

**Small villages** — Houses from €20,000–50,000. Peaceful but requires a car and basic Bulgarian.

---

## Healthcare for retirees

• **Private clinics (recommended):** Tokuda, Acibadem, Vita — English-speaking, excellent quality
• **GP consultation:** €15–30 private / free with NHIF
• **Specialist:** €25–60 private
• **Dental:** €40–150 for most procedures (vs €200–600 in Western Europe)
• **Private health insurance:** €80–250/month depending on age and coverage

---

## Community

Join these Facebook groups: "Retiring to Bulgaria", "British Expats Bulgaria", "Sofia Expats", "Expats in Varna". Very active communities with honest local advice.

💡 **Tip:** Visit for 1–2 months before committing. Rent first, buy later. Bulgaria rewards those who take their time.`},
      {titles:{en:"Apostilles & document legalisation",fr:"Apostilles et l\u00e9galisation de documents",es:"Apostillas y legalizaci\u00f3n de documentos",de:"Apostille und Beglaubigung",nl:"Apostille en documentlegalisatie",ru:"Апостили и легализация документов",uk:"Апостилі та легалізація документів",tr:"Apostil ve belge onayı",bg:"Апостили и легализация на документи"},
       source:"Bulgarian Ministry of Justice",sourceUrl:"https://www.justice.government.bg",readTime:"4 min read",body:`Moving to Bulgaria means a paper trail. Here's how to make your documents legally valid in Bulgaria.

## What is an apostille?

An apostille is an official certification that a document is genuine — recognised between all 124 Hague Convention member countries, including Bulgaria and most Western nations.

**You will almost certainly need apostilles on:**
• Birth certificate (for schools, residency registration)
• Marriage / divorce certificate
• Criminal record check (for residency permits)
• Academic degrees (for work)
• Power of attorney (for legal transactions)

---

## Getting apostilles BEFORE you move

This must be done in your **home country** — plan ahead.

**UK:** FCDO Legalisation Office — £30–45 per document, 3–10 days (fco.gov.uk)
**US:** Secretary of State of the state that issued the document — $5–30 per document
**France:** Tribunal de Grande Instance or Ministry of Justice
**Germany:** Oberlandesgericht (Regional Court of Appeals)
**Netherlands:** Ministry of Justice and Security

---

## Getting apostilles on Bulgarian documents

• **Ministry of Justice (Министерство на правосъдието):** For court documents and civil status acts
• **Regional Governor's office (Областна управа):** For some local documents
• **Ministry of Foreign Affairs (МВнР):** For most official Bulgarian documents
• **Cost:** €5–8 per document
• **Processing:** Same day to 5 business days

---

## Translations

All foreign documents used officially in Bulgaria must be **translated into Bulgarian by a sworn/certified translator.**

• **Cost:** €20–50 per page
• **Find certified translators at:** The Ministry of Foreign Affairs list, or ask at your local notary
• **Average document:** 1–2 pages = €30–80 total

---

## Criminal record check

Most residency permits require a clean criminal record from your home country:

• **UK:** DBS basic check — £23, online at gov.uk/request-copy-criminal-record
• **US:** FBI Identity History Summary — $18, takes 3–5 weeks
• **EU countries:** Generally issued by local police headquarters

Get it apostilled before leaving your home country.

💡 **Tip:** Get 3–4 certified translations of your most important documents when you first arrive. Much cheaper than going back repeatedly.`}]
  },
  {
    id:"healthcare",icon:"🏥",bg:"#e4f2ec",
    labels:{en:{label:"Healthcare",sub:"Doctors, hospitals, insurance"},fr:{label:"Santé",sub:"Médecins, hôpitaux, assurance"},es:{label:"Sanidad",sub:"Médicos, hospitales, seguro"},de:{label:"Gesundheit",sub:"Ärzte, Krankenhäuser, Versicherung"},nl:{label:"Gezondheidszorg",sub:"Artsen, ziekenhuizen, verzekering"}},
    articles:[
      {titles:{en:"The Bulgarian public health system (NHIF)",fr:"Le système de santé public bulgare (NHIF)",es:"El sistema sanitario público búlgaro (NHIF)",de:"Das bulgarische Gesundheitssystem (NHIF)",nl:"Het Bulgaarse gezondheidsstelsel (NHIF)"},
       body:`Bulgaria's public health insurance is called NHIF (НЗОК in Bulgarian).\n\n**If employed:** Employer registers you and pays contributions automatically.\n\n**If self-employed/company owner:** You pay ~€16/month yourself.\n\n**EU visitors:** Your EHIC card gives you access on the same terms as Bulgarian citizens.\n\n**What NHIF covers:**\n• GP visits (free with registration)\n• Hospital treatment (co-pay: €1/day)\n• Specialist visits (with GP referral)\n• Maternity care and emergency treatment\n\n**Not covered:** Most dental, private clinics, most medicines.\n\n💡 Register with a local GP near your address — required for referrals in the public system.`},
      {titles:{en:"English-speaking doctors in Sofia",fr:"Médecins anglophones à Sofia",es:"Médicos angloparlantes en Sofía",de:"Englischsprachige Ärzte in Sofia",nl:"Engelstalige artsen in Sofia"},
       body:`Finding English-speaking care is easier than expected, especially in Sofia.\n\n**Private hospitals with English staff:**\n\n**Tokuda Hospital** — excellent, many English-speaking specialists. Tel: +359 2 403 4000\n\n**Acibadem City Clinic** — international standard, well-equipped, English service.\n\n**Vita Private Hospital** — popular with expats, good emergency department.\n\n**Consultation costs:**\n• GP: €25–40\n• Specialist: €40–75\n• Blood panel: €15–40\n\n**Emergency:** Dial 112. Many operators speak English.\n\n💡 Always confirm the doctor speaks English before your appointment.`},
    ,
      {titles:{en:"International schools & education in Bulgaria",fr:"\u00c9coles internationales et \u00e9ducation en Bulgarie",es:"Colegios internacionales y educaci\u00f3n en Bulgaria",de:"Internationale Schulen & Bildung in Bulgarien",nl:"Internationale scholen & onderwijs in Bulgarije",ru:"Международные школы и образование в Болгарии",uk:"Міжнародні школи та освіта в Болгарії",tr:"Bulgaristan'da uluslararası okullar ve eğitim",bg:"Международни училища и образование в България"},
       body:`Education is the number one question for expat families. Bulgaria has excellent options — from free public schools to world-class international institutions.

## Public schools — free for all residents

All legally resident children (EU and non-EU) have the right to free public education in Bulgaria.

**The reality for expat children:**
• Instruction is entirely in Bulgarian
• Children typically adapt within 6–12 months — language immersion works remarkably well for young children
• Schools are academically rigorous by European standards
• Class sizes: 20–28 students
• School year: mid-September to May

**Enrol at:** Your local neighbourhood school (районно училище). Bring: residence certificate, child's ID/passport, apostilled birth certificate with Bulgarian translation.

---

## International schools in Sofia

### Anglo-American School of Sofia
• **Curriculum:** US-accredited (NEASC), IB Diploma (grades 9–12)
• **Ages:** Pre-K through Grade 12
• **Language:** English
• **Fees:** €12,000–16,000/year
• **Location:** Simeonovo, Sofia
• **Strength:** Largest international school, strong university placement
• Website: aas-sofia.org

### The British School of Sofia
• **Curriculum:** British National Curriculum, IGCSE, A-Levels
• **Ages:** 3–18
• **Language:** English
• **Fees:** €9,000–13,000/year
• **Location:** Dragalevtsi, Sofia
• **Strength:** Strong academic tradition, small class sizes
• Website: britishschool.bg

### Deutsche Schule Sofia (German School)
• **Curriculum:** German curriculum, DSD German language certification
• **Ages:** 6–18
• **Language:** German (some English)
• **Fees:** €6,000–9,000/year (subsidised by German government)
• **Location:** Central Sofia
• **Strength:** Most affordable international school, excellent for German speakers

### Sofia International School
• **Curriculum:** Mixed international + Bulgarian
• **Ages:** 4–18
• **Language:** English and Bulgarian
• **Fees:** €7,000–10,000/year
• **Location:** Krastova Vada, Sofia
• **Strength:** Bilingual education, strong Bulgarian cultural integration

### Le Lycée Victor Hugo
• **Curriculum:** French CNED/AEFE curriculum
• **Ages:** Pre-school to Baccalauréat
• **Language:** French
• **Fees:** €5,000–8,000/year
• **Location:** Central Sofia
• **Strength:** Official French accreditation, strong Franco-Bulgarian community

---

## International school in Varna

### International School of Varna
• **Curriculum:** British curriculum, IGCSE
• **Ages:** 4–18
• **Language:** English
• **Fees:** €7,000–10,000/year
• **Location:** Varna city
• Website: isv.bg

---

## Choosing between public and international school

| | Public school | International school |
|---|---|---|
| Cost | Free | €6,000–16,000/year |
| Language | Bulgarian | English/German/French |
| Integration | Full Bulgarian immersion | International community |
| Continuity | Curriculum changes if you move | Global curriculum continuity |
| Academics | Rigorous, exam-focused | Balanced, project-based |

**Many expat families choose public school** — especially if they plan to stay 3+ years. Children aged 5–12 adapt astonishingly quickly. It's free, builds real Bulgarian language skills, and creates genuine local friendships.

---

## Practical tips

• **Apply 6–12 months in advance** for international schools — spaces fill quickly, especially at Anglo-American and British School
• **Financial aid:** Most international schools offer needs-based bursaries — always ask
• **University prep:** Anglo-American and British School both have strong records of students accepted at UK, US and European universities
• **Nurseries & kindergarten:** Plenty of private English-language nurseries in Sofia for ages 0–5, from €300/month

💡 **Tip:** Join the Facebook group "Parents at [school name]" for honest, current reviews from actual families. Far more useful than official school marketing.`}]
  },
  {
    id:"banking",icon:"🏦",bg:"#fdf3e3",
    labels:{en:{label:"Banking & Tax",sub:"Accounts, money, tax rates"},fr:{label:"Banque & Impôts",sub:"Comptes, argent, fiscalité"},es:{label:"Banca e Impuestos",sub:"Cuentas, dinero, fiscalidad"},de:{label:"Banking & Steuern",sub:"Konten, Geld, Steuern"},nl:{label:"Bankieren & Belasting",sub:"Rekeningen, geld, belastingen"}},
    articles:[
      {titles:{en:"Opening a bank account as a foreigner",fr:"Ouvrir un compte bancaire en tant qu'étranger",es:"Abrir una cuenta bancaria como extranjero",de:"Ein Bankkonto als Ausländer eröffnen",nl:"Een bankrekening openen als buitenlander"},
       body:`Opening a Bulgarian bank account is straightforward once you have a registered address.\n\n**Most foreigner-friendly banks:**\n\n**DSK Bank** — largest Bulgarian bank, branches everywhere, solid app, English service.\n\n**UniCredit Bulbank** — international, great for international transfers, English staff in center.\n\n**First Investment Bank (FIB)** — good mobile banking, competitive fees.\n\n**Documents needed:**\n• Passport\n• Bulgarian address proof (rental contract)\n• Bulgarian personal number (EGN or LNC)\n• For non-EU: residence permit\n\n**Costs:** Account opening free. Monthly fee €1–3. SEPA transfers free or €1–2.\n\n💡 Go to a branch on Vitosha Blvd in Sofia center — staff there are used to foreigners.`},
      {titles:{en:"Bulgarian tax system explained simply",fr:"Le système fiscal bulgare expliqué simplement",es:"El sistema fiscal búlgaro explicado de forma sencilla",de:"Das bulgarische Steuersystem einfach erklärt",nl:"Het Bulgaarse belastingsysteem eenvoudig uitgelegd"},
       body:`Bulgaria has one of the most attractive tax systems in the EU.\n\n**Personal income tax:** 10% flat — everyone pays the same rate, no brackets.\n\n**Corporate tax (EOOD):** 10% flat on company profits.\n\n**Dividend tax:** 5% — when you pay yourself from your company.\n\n**Total effective tax as company owner:** ~14.5%\n\n**VAT:** 20% standard (9% for hotels, restaurants, tourist services).\n\n**Social & health contributions (self-employed, 2024):** ~€65–100/month.\n\n**Tax residency:** 183+ days/year in Bulgaria = Bulgarian tax resident.\n\n**Filing deadline:** April 30 for the previous calendar year.\n\n💡 Always hire a local accountant (€75–150/month). Best investment you can make.`},
      {titles:{en:"Sending money to Bulgaria — best options",fr:"Envoyer de l'argent en Bulgarie — meilleures options",es:"Enviar dinero a Bulgaria — mejores opciones",de:"Geld nach Bulgarien senden — beste Optionen",nl:"Geld naar Bulgarije sturen — beste opties"},
       body:`Bulgaria joined the Eurozone and uses the Euro (€) as its official currency since 2025.\n\n**Best transfer services:**\n\n**Wise** — best exchange rates, low fees, fast. Most expats' first choice for international transfers.\n\n**Revolut** — great for daily spending and transfers. Get a card as soon as you arrive.\n\n**Bank SWIFT** — works but fees are high (€5–13 per transfer). Avoid for regular use.\n\n**ATMs:** Very common. Use Wise or Revolut card to withdraw Euros. Always pay in local currency — never let the ATM convert for you.\n\n💡 Bulgaria is expected to join the Bulgaria is now in the Eurozone and uses the Euro.`},
    ]
  },
  {
    id:"tourism",icon:"✈️",bg:"#edf2fd",
    labels:{en:{label:"Tourism & Travel",sub:"Places, tips, getting around"},fr:{label:"Tourisme & Voyages",sub:"Lieux, conseils, transports"},es:{label:"Turismo y Viajes",sub:"Lugares, consejos, transporte"},de:{label:"Tourismus & Reisen",sub:"Orte, Tipps, Mobilität"},nl:{label:"Toerisme & Reizen",sub:"Plaatsen, tips, vervoer"}},
    articles:[
      {titles:{en:"Top places to visit in Bulgaria",fr:"Les incontournables de la Bulgarie",es:"Los mejores lugares para visitar en Bulgaria",de:"Top-Sehenswürdigkeiten in Bulgarien",nl:"Topbestemmingen in Bulgarije"},
       body:`Bulgaria is one of Europe's most underrated destinations.\n\n**Sofia** — the capital. Must-see: Alexander Nevsky Cathedral (free), Vitosha Mountain (15 min from center), Boyana Church (UNESCO), Vitosha Blvd for shopping and coffee.\n\n**Plovdiv** — older than Rome. Cobblestone Old Town (Stari Grad) with a working Roman amphitheater. 2 hours from Sofia. Very walkable.\n\n**Bansko** — best ski resort in Bulgaria (Pirin Mountains). Excellent skiing (Dec–Mar) and hiking (summer). Great restaurants and nightlife.\n\n**Black Sea** — Varna city is beautiful. Sunny Beach is the big resort. Golden Sands is more pleasant.\n\n**Rila Monastery** — UNESCO site, one of the most beautiful monasteries in the Balkans. Easy day trip from Sofia.\n\n**Veliko Tarnovo** — dramatic medieval capital on a hilltop. Tsarevets Fortress has a famous sound-and-light show.\n\n💡 Best time to visit: May–June or September–October. Warm, not crowded.`},
      {titles:{en:"Getting around Bulgaria",fr:"Se déplacer en Bulgarie",es:"Moverse por Bulgaria",de:"In Bulgarien unterwegs",nl:"Vervoer in Bulgarije",ru:"Передвижение по Болгарии",uk:"Пересування Болгарією",tr:"Bulgaristan'da ulaşım",bg:"Придвижване в България"},
       body:`**By bus (recommended):**\n• Sofia → Plovdiv: 1h45m, €6\n• Sofia → Varna: 6h, €15\n• Book at bus stations or avtogara.bg\n\n**By train:**\n• Sofia → Plovdiv: €5, ~2.5h. Slower but scenic.\n• Book at bdz.bg (English available)\n\n**By car:**\n• Motorway vignette required: €8/week or €15/month\n• Parking in Sofia: €0.80–1/hour (blue zone, pay by SMS)\n\n**In Sofia:**\n• Metro, trams, buses — ticket €0.80, day pass €2\n• Sofia Traffic app for routes\n\n**Taxis:**\n• Use Bolt or Yandex Go apps — cheaper and safer than street taxis\n• Avoid unmarked taxis at airports\n\n💡 Buses are usually faster than trains and similarly priced.`},
    ]
  },
  {
    id:"housing",icon:"🏠",bg:"#f0edf8",
    labels:{en:{label:"Housing & Renting",sub:"Find your home in Bulgaria"},fr:{label:"Logement & Location",sub:"Trouvez votre logement en Bulgarie"},es:{label:"Vivienda y Alquiler",sub:"Encuentra tu hogar en Bulgaria"},de:{label:"Wohnen & Mieten",sub:"Dein Zuhause in Bulgarien finden"},nl:{label:"Wonen & Huren",sub:"Vind uw thuis in Bulgarije"}},
    articles:[
      {titles:{en:"How to rent an apartment as a foreigner",fr:"Comment louer un appartement en tant qu'étranger",es:"Cómo alquilar un apartamento como extranjero",de:"Als Ausländer eine Wohnung mieten",nl:"Een appartement huren als buitenlander"},
       body:`Renting in Bulgaria is very affordable, especially outside Sofia.\n\n**Typical prices (2024):**\n\nSofia center:\n• Studio/1-bed: €400–720/month\n• 2-bed: €600–1,000/month\n\nSofia suburbs: 30–40% cheaper\nPlovdiv: 40% cheaper than Sofia\nVarna: similar to Plovdiv (higher in summer)\nBansko: €200–700 for 1-bed (winter)\n\n**Where to find apartments:**\n• imoti.net — main property portal\n• address.bg — another large portal\n• Facebook: "Apartments for rent Sofia English"\n• Real estate agents (charge 1 month rent fee)\n\n**Rental contract:**\n• Always in writing, in both Bulgarian and English\n• Standard deposit: 1–2 months rent\n• Notice period: usually 1 month\n\n**Utilities:** NOT included in rent. Budget €51–200 extra in winter.\n\n💡 Best Sofia neighborhoods for expats: Lozenets, Iztok, Doctor's Garden, Mladost, Oborishte.`},
    ,
      {titles:{en:"Buying property in Bulgaria \u2014 the complete guide",fr:"Acheter un bien immobilier en Bulgarie",es:"Comprar una propiedad en Bulgaria",de:"Immobilienkauf in Bulgarien",nl:"Onroerend goed kopen in Bulgarije"},
       source:"Bulgarian Property Registry",sourceUrl:"https://www.registryagency.bg",readTime:"7 min read",body:`Bulgaria offers some of the most affordable property in the EU — but the buying process and legal framework differ significantly from Western Europe.

## Can foreigners buy property?

**EU citizens:** Full rights to buy any property including land — since 2012.

**Non-EU citizens:** Can buy apartments and buildings freely. **Cannot buy land directly.** Workaround: register a Bulgarian EOOD company and purchase land through the company — very common practice.

---

## Where to search

• **imot.net** — largest portal, most listings
• **address.bg** — quality-verified listings, better for Sofia
• **imotbg.com** — additional listings
• **Direct from builders (ново строителство)** — for new builds

Prices range enormously: €500/m² (small towns) to €2,500/m² (prime Sofia/Varna).

---

## The buying process

**Step 1 — Find your property**
Use imot.net, view in person. Negotiate — offers of 10–15% below asking are normal and expected.

**Step 2 — Preliminary contract (Предварителен договор)**
Both parties sign. Buyer pays 10% deposit. Sets out terms, completion date.

**Step 3 — Title check**
Your lawyer checks the Property Register (Имотен регистър) for encumbrances (mortgages, claims, court orders). Never skip this step.

**Step 4 — Notary appointment (Нотариус)**
Both buyer and seller appear in person (or via authorised representative). Notary reads the title deed (Нотариален акт) aloud. Buyer pays remainder. Ownership transfers immediately.

**Step 5 — Registration**
Notary registers the transfer at the Registry Agency (Агенция по вписванията). Takes 1–3 days.

**Step 6 — Municipality notification**
Register the property with the local municipality for property tax within 2 months.

---

## Buying costs

| Cost | Amount |
|---|---|
| Notary fee | 0.1–1.5% of purchase price |
| Local transfer tax | 2–3% (varies by municipality) |
| Estate agent commission | 3% (usually paid by buyer in Bulgaria) |
| Property registration | 0.1% |
| Lawyer fee | €500–800 (highly recommended) |
| **Total typical costs** | **3–5% of purchase price** |

---

## ⚠️ Critical warnings

**Act 16 (Акт 16):** The final completion certificate for new builds. **Never buy without it.** Many Black Sea apartments built 2006–2010 lack proper Act 16 — meaning they're technically uninhabitable and unmortgageable.

**Encumbrance check:** Always verify at the Property Registry that the property has no mortgages or legal claims. Your notary does this but check independently too.

**Old panel blocks (панелки):** Cheap but energy-inefficient. Check if the building has been renovated (саниране).

**Rural land:** Fantastically cheap but often has agricultural use restrictions — check zoning carefully.

---

## Financing

Bulgarian banks offer mortgages to foreign residents with:
• 20–30% minimum deposit
• Regular income proof
• Interest rates: 2.5–4% (2026)
• BULSTAT number required

Expat-friendly banks: UniCredit, DSK Bank, Fibank.

---

## Property taxes & running costs

• **Annual property tax (Данък сгради):** 0.01–0.45% of assessed value (~€50–300/year for typical apartment)
• **Maintenance fee (Такса поддръжка):** €20–100/month for apartment buildings
• **Utilities:** see the Utilities guide

💡 **Best advice:** Hire a Bulgarian property lawyer (not just an agent). They cost €500–800 but can save you from catastrophic mistakes. The notary represents the transaction, not you.`},
      {titles:{en:"Utilities, internet & SIM card setup",fr:"Services publics, internet et carte SIM",es:"Servicios p\u00fablicos, internet y tarjeta SIM",de:"Strom, Internet & SIM-Karte",nl:"Nutsvoorzieningen, internet en simkaart",ru:"Коммунальные услуги, интернет и SIM-карта",uk:"Комунальні послуги, інтернет та SIM-карта",tr:"Faturalar, internet ve SIM kart kurulumu",bg:"Комунални услуги, интернет и SIM карта"},
       body:`Setting up utilities is one of the first things to do when you arrive. Here's everything you need — energy, water, internet and mobile.

## Electricity

Electricity in Bulgaria is divided by regions:
• **Sofia & surroundings:** EVN Bulgaria
• **Northwest Bulgaria:** CEZ (now part of Eon)
• **Northeast & Black Sea:** Energo-Pro

**Registering in your name:**
Bring your lease, ID, and previous meter reading to the local energy office or register online. Monthly bill: €30–80 for a typical 2-bedroom apartment.

**Paying bills:** Via ePay.bg (best), bank transfer, or at post offices and EasyPay terminals (in every petrol station and many shops).

---

## Water

• **Sofia:** Sofiyska Voda (sofiyskavoda.bg)
• Billed every 2 months
• Monthly average: €10–25 for apartment
• Register online or at their office with lease + ID

---

## District heating (Топлофикация — ТЕЦ)

Many Sofia apartments have centralised district heating — you cannot choose to opt out of your building's system.

• **Season:** October–April (approx.)
• **Monthly winter bill:** €40–120 depending on apartment size
• **Register at:** toplo.bg (Sofia) — bring lease and previous tenant's account number
• Individual heat meters are now mandatory in new buildings

💡 Tip: Ask your landlord if the building has individual heat meters (делители). Buildings without them split the total bill equally — you could pay for neighbours who leave windows open.

---

## Internet

Bulgaria has **some of the fastest internet in Europe** — fibre optic is widely available even in smaller towns.

| Provider | Speed | Price | Notes |
|---|---|---|---|
| Vivacom | Up to 1Gbps | €14–20/month | Most reliable, best rural coverage |
| A1 Bulgaria | Up to 1Gbps | €15–22/month | Good bundle deals |
| Yettel | Up to 1Gbps | €13–18/month | Competitive pricing |

• **Installation:** Free with 12-month contract
• **Average Sofia apartment:** Gets 300–500 Mbps easily
• **Required:** Proof of address, ID, lease agreement

---

## SIM cards & mobile plans

**The 3 main operators:**
• **A1 Bulgaria** — best overall coverage including mountains and rural areas
• **Yettel** — best data deals, excellent EU roaming package
• **Vivacom** — best in rural/village areas, competitive prices

**Where to buy:** Any operator shop, large supermarkets (Kaufland, BILLA), malls.

**Required:** Passport or national ID card.

**Prepaid SIM:** ~€3–5 for SIM card, top up separately.

**Monthly plans (2026 approximate):**
• Basic: €8/month — 10GB data, unlimited calls in Bulgaria
• Standard: €13/month — 30GB data + EU roaming
• Premium: €20/month — unlimited data + EU roaming

💡 **Tip:** Yettel's EU roaming is excellent for expats who travel back home frequently. Vivacom is the best choice if you plan to spend time in the mountains or countryside.

---

## TV & streaming

• Bulgarian cable/satellite: BULSATCOM, MAX TV
• Netflix, Disney+, HBO Max all work in Bulgaria on any subscription
• VPN: not required, most international content is available

💡 **Everything can be set up within your first week — electricity and internet are the priorities. Water and heating can usually wait a few days.**`},
      {titles:{en:"Pets \u2014 bringing your animals to Bulgaria",fr:"Animaux de compagnie \u2014 amener vos animaux en Bulgarie",es:"Mascotas \u2014 traer sus animales a Bulgaria",de:"Haustiere \u2014 Ihre Tiere nach Bulgarien bringen",nl:"Huisdieren \u2014 uw dieren meenemen naar Bulgarije"},
       body:`Bulgaria is a very pet-friendly country — dogs are welcome in most outdoor spaces, many restaurants have dog-friendly terraces, and vet care is excellent and affordable.

## Entry requirements from EU countries

**Dogs, cats and ferrets need:**
1. **Microchip** — ISO 11784/11785 standard (mandatory before any vaccination)
2. **EU Pet Passport** — issued by your vet, lists vaccinations
3. **Valid rabies vaccination** — at least 21 days after the first vaccination
4. **Dogs only:** Tapeworm treatment (echinococcus) — done by a vet 1–5 days before entry and recorded in the passport

Your vet in your home country should handle all of this. Allow at least 3–4 weeks if your pet hasn't been vaccinated before.

---

## Entry requirements from non-EU countries (UK, US, Canada, Australia)

• Microchip ✓
• Accredited veterinary health certificate (not an EU pet passport — must be the official country-specific form)
• Rabies vaccination ✓
• Rabies antibody titre test (blood test) — required for some countries. Done at approved labs, results take 30 days
• UK: use the AHC (Animal Health Certificate) form from a DAERA/APHA-listed vet

**Always check the current Bulgarian Food Safety Agency (БАБХ) requirements** before travel as rules can change.

---

## Getting here with your pet

**By air:**
• Most airlines allow small pets in-cabin (under 8kg including carrier): Wizz Air, Ryanair (hold only), LOT, Turkish Airlines
• Book the pet space when booking your ticket — limited spaces per flight
• Larger dogs travel in the hold — check airline temperature restrictions in summer

**By car/road:**
• Easiest option — full control of your pet's comfort
• Border checks are quick — have all documents ready
• Stop every 2–3 hours, water available

---

## Vet care in Bulgaria

Excellent quality at a fraction of Western European prices:

| Service | Bulgaria | UK/Germany |
|---|---|---|
| Consultation | €15–25 | €50–100 |
| Vaccination | €10–20 | €40–80 |
| Neutering (cat) | €50–80 | €150–300 |
| Dental cleaning | €40–80 | €150–400 |
| Emergency visit | €30–80 | €100–300 |

**Recommended vet chains in Sofia:** Vet Clinic, Vita Vet, Dr. Djoki's clinics — all have English-speaking vets.

---

## Pet life in Bulgaria

• **Dogs in public:** Leash required. Most parks and outdoor terraces welcome dogs.
• **Dog parks:** Borisova Gradina, Yuzhen Park, Vitosha mountain (Sofia)
• **Pet shops:** Magnolia, Zoomarket in all major cities
• **Pet food brands:** Royal Canin, Hills, Purina all widely available in Kaufland, BILLA, pet shops
• **Facebook groups:** "Pets in Sofia", "Expat Pets Bulgaria" — great for vet recommendations

💡 **Tip:** Register your pet with the Bulgarian Food Safety Agency (БАБХ) within 30 days of arrival. It's free and required. Your vet can help with this.`},
      {titles:{en:"Shipping, removals & moving logistics",fr:"Transport, d\u00e9m\u00e9nagement et logistique",es:"Env\u00edo, mudanzas y log\u00edstica",de:"Versand, Umzug und Logistik",nl:"Verzending, verhuizing en logistiek",ru:"Грузоперевозки и переезд в Болгарию",uk:"Перевезення та переїзд до Болгарії",tr:"Nakliye ve taşınma lojistiği",bg:"Транспорт и логистика при преместване"},
       body:`Moving to Bulgaria is logistically simpler than most people think — especially from the EU. Here's the practical breakdown.

## Moving from EU countries

**No customs formalities** for household goods moving between EU countries. Your belongings can arrive by van or truck with no duty and minimal paperwork.

**Options by volume:**

| Volume | Best option | Cost estimate |
|---|---|---|
| 1–2 suitcases | Fly with excess baggage or courier | €50–200 |
| Van load (1 room) | Man & Van hire | €300–800 |
| 1–2 bedroom flat | Shared container / groupage | €800–2,000 |
| Full house | Dedicated removal truck | €2,000–5,000 |

**Popular man & van routes to Bulgaria:** Many Polish and Romanian drivers offer Sofia/Plovdiv/Varna routes at excellent prices. Search Facebook groups or shiply.com.

---

## Moving from non-EU countries (UK, US, Canada, Australia)

**UK post-Brexit:** Now treated as a third country — customs formalities apply.
• Personal effects relief: if items owned 6+ months → no import duty
• You'll need a detailed inventory of all items with approximate values
• Use a specialist international removals company — they handle the customs paperwork

**US/Canada/Australia:** Full customs declaration required.
• Household goods owned 12+ months: generally duty-free
• Hire a company specialising in Bulgaria routes: PSS International, Seven Seas Worldwide, Anglo Pacific

---

## Self-storage in Bulgaria

If you arrive before your belongings or need to store items temporarily:

• **Sofia:** CityStorage, StorageBox — from €30/month for small unit
• **Varna:** Several options near the port area
• Booking 2–4 weeks in advance recommended in summer

---

## Useful services

• **Excess Baggage Company** (excessbaggage.com) — UK to Bulgaria shipping, door to door
• **Transglobal Express** — competitive international courier rates
• **Local Bulgarian movers:** Get 3 quotes — huge price variation. Recommended: ask in Facebook expat groups for trusted recommendations.

---

## What NOT to bring

• Large appliances: Bulgaria uses standard 220V/50Hz European sockets. UK appliances need adaptors. Washing machines, fridges are cheap and plentiful locally.
• Cars from non-EU: import duty (10%) + VAT (20%) usually makes it uneconomical — buy locally.
• Plants: strict phytosanitary rules — leave them behind or check BABH requirements.

💡 **Tip:** Facebook Marketplace and OLX Bulgaria are excellent for furnishing your Bulgarian home on arrival. Many expats sell complete sets of furniture when leaving. You can furnish a 2-bedroom apartment for €500–1,500.`},
      {titles:{en:"Buying or importing a car in Bulgaria",fr:"Acheter ou importer une voiture en Bulgarie",es:"Comprar o importar un coche en Bulgaria",de:"Auto kaufen oder importieren in Bulgarien",nl:"Auto kopen of importeren in Bulgarije",ru:"Покупка или ввоз автомобиля в Болгарию",uk:"Купівля або ввезення автомобіля до Болгарії",tr:"Bulgaristan'da araç satın alma veya ithalatı",bg:"Покупка или внос на автомобил в България"},
       body:`Whether you're buying locally or bringing your car from abroad, here's everything you need to know.

## Buying locally — recommended

**Where to search:**
• **mobile.bg** — Bulgaria's largest used car marketplace (100,000+ listings)
• **bazar.bg** — additional listings
• **Cars.bg** — alternative portal
• **Dealers:** Major Sofia dealerships for new/certified used

Prices are generally 10–25% lower than Western Europe for equivalent vehicles. Quality varies — always get an independent technical inspection before buying.

---

## The registration process (Регистрация)

When you buy a car in Bulgaria and establish residency:

**Documents needed:**
• Proof of ownership (Талон / registration certificate)
• ID / passport
• Proof of Bulgarian address
• Valid insurance (задължителна застраховка ГО)
• Technical inspection certificate (ГТП)

**Where:** Regional Road Infrastructure Agency (РИАПП) — book appointment online at rta.government.bg

**Fee:** €15–40 depending on region

**Note:** EU residents keeping their own country's plates have 3 months after establishing Bulgarian residence to re-register.

---

## Annual technical inspection (ГТП — Годишен технически преглед)

• **Required** for all vehicles
• **Frequency:** Every 12 months for cars under 7 years, every 6 months for older
• **Cost:** €15–35 at any approved ГТП station
• Book online or walk in — usually quick (30–45 minutes)
• Checks: lights, brakes, emissions, steering, tyres

---

## Road vignette (Виньетка)

**Mandatory for all vehicles on Bulgarian roads** — not just highways.

| Duration | Cost |
|---|---|
| 1 week | €15 |
| 1 month | €30 |
| 3 months | €52 |
| 1 year | €97 |

**Buy at:** bgtoll.bg (online), petrol stations, post offices, some shops. Digital vignette — licence plate registered, no sticker needed.

---

## Car insurance

**Mandatory third-party (ГО — Гражданска отговорност):**
• Required by law for all vehicles
• Cost: €60–200/year depending on vehicle and driver history
• Available from: ДЗИ, Алианц, ОЗК, Армеец, Евроинс

**Optional comprehensive (Каско):**
• Covers theft, accident damage, weather
• Cost: €200–600/year
• Worth it for newer/valuable vehicles

---

## Importing from EU countries

No customs duty on EU-origin vehicles. Process:
1. Bring original title documents + purchase invoice
2. Bulgarian technical inspection (ГТП) — €20–30
3. Pay registration tax (varies by engine size, age, CO2 emissions) — €30–300
4. Register at РИАПП

---

## Importing from non-EU (UK, US)

• 10% customs duty on vehicle value
• 20% VAT
• Homologation may be required (adjusting lights, speedometer to km/h etc.)
• Total costs often exceed 35–40% of vehicle value
• **Usually not worth it — buy locally instead**

💡 **Tip:** For used cars on mobile.bg, always check the vehicle history at carvertical.com or carjam.bg before viewing. Request the VIN number from the seller first.`}]
  },
  {
    id:"business",icon:"💼",bg:"#fef3f3",
    labels:{en:{label:"Business Setup",sub:"EOOD, freelance, company"},fr:{label:"Créer son entreprise",sub:"EOOD, freelance, société"},es:{label:"Montar un negocio",sub:"EOOD, autónomo, empresa"},de:{label:"Unternehmensgründung",sub:"EOOD, Freelance, Firma"},nl:{label:"Bedrijf Opzetten",sub:"EOOD, freelance, onderneming"}},
    articles:[
      {titles:{en:"Setting up an EOOD — your Bulgarian company",fr:"Créer une EOOD — votre société bulgare",es:"Crear una EOOD — su empresa búlgara",de:"Eine EOOD gründen — Ihre bulgarische Firma",nl:"Een EOOD oprichten — uw Bulgaars bedrijf"},
       body:`An EOOD is a single-person limited liability company — the most popular structure for expat entrepreneurs.\n\n**Why EOOD?**\n• 10% corporate tax\n• 5% dividend tax when you pay yourself\n• Total effective tax: ~14.5% (one of lowest in EU)\n• Full EU company — invoice anyone in the world\n• Foreigners can own 100%\n\n**Requirements:**\n• Minimum capital: €1 (literally two lev!)\n• Registered address in Bulgaria\n• You can be both owner and manager\n\n**How to register:**\n1. Choose a company name (check at brra.bg)\n2. Articles of association (notarized)\n3. Open company bank account, deposit capital\n4. Register with BRRA (Commercial Register)\n5. Register with NRA (Tax Authority)\n\n**Cost:** €102–500 in fees + €153–600 if using a lawyer.\n**Time:** 3–7 business days.\n\n**Monthly costs:** Accountant €75–150/month (essential). Health insurance ~€16/month.\n\n💡 Ask expat Facebook groups for accountant recommendations — a good one is worth everything.`},
    ]
  },
]

const makePrompt = (langName) =>
  `You are the BGexpats AI Assistant — a warm, knowledgeable helper for expats and tourists in Bulgaria. IMPORTANT: Always respond in ${langName}. Expert on: visas (Type D, EU registration), healthcare (NHIF, Tokuda/Acibadem/Vita hospitals), banking (DSK, UniCredit, FIB), taxes (10% flat), EOOD company setup (€1 capital, 3-7 days), property (Sofia neighborhoods: Lozenets, Iztok, Mladost), transport (Bolt/Yandex, buses, trains), tourism (Sofia, Plovdiv, Bansko, Black Sea, Rila). Key facEmergency: 112. Give prices in € and EUR. Be practical, friendly, specific.`

function useScrollEnd(dep){
  const ref=useRef(null)
  useEffect(()=>{ref.current&&ref.current.scrollIntoView({behavior:"smooth"})},[dep])
  return ref
}

function useScrollReveal(){
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal')
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}})
    },{threshold:0.12})
    els.forEach(el=>obs.observe(el))
    return()=>obs.disconnect()
  },[])
}

function LangBanner({lang,setLang}){
  const labels={en:"English",fr:"Français",es:"Español",de:"Deutsch",nl:"Nederlands",ru:"Русский",uk:"Українська",tr:"Türkçe"}
  return(
    <div style={{background:"#f0f0ec",borderBottom:"1px solid #ddd9ce",padding:"0 20px"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:0,overflowX:"auto"}}>
        <span style={{fontSize:12,color:"#888",marginRight:12,whiteSpace:"nowrap",flexShrink:0}}>🌍 Language:</span>
        {Object.entries(LANGS).map(([k,v])=>(
          <button key={k} onClick={()=>setLang(k)}
            style={{
              background:lang===k?"#1e5e3f":"transparent",
              border:"none",
              color:lang===k?"#fff":"#555",
              padding:"8px 14px",
              cursor:"pointer",
              fontSize:13,
              fontWeight:lang===k?600:400,
              display:"flex",alignItems:"center",gap:6,
              borderBottom:lang===k?"2px solid #b8792a":"2px solid transparent",
              transition:"all 0.15s",
              whiteSpace:"nowrap",
              flexShrink:0,
            }}
            onMouseEnter={e=>{if(lang!==k){e.currentTarget.style.background="#e8f2eb";e.currentTarget.style.color="#1e5e3f"}}}
            onMouseLeave={e=>{if(lang!==k){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#555"}}}>
            <span style={{fontSize:18}}>{v.flag}</span>
            <span>{v.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Nav({view,setView,lang,t,user,setUser,subscription,openCheckout=()=>{}}){
  const [mob,setMob]=useState(false)
  const aiLabel={en:"Ask AI",fr:"IA",es:"IA",de:"KI",nl:"AI"}
  const [userMenu,setUserMenu]=useState(false)
  return(
    <nav style={{background:C.primary,position:"sticky",top:0,zIndex:100,borderBottom:`1px solid ${C.primaryDark}`}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8,padding:0,flexShrink:0}}>
          <span style={{fontSize:22}}>🌹</span>
          <span style={{color:"#fff",fontSize:16,fontWeight:700,letterSpacing:"-0.3px"}}>BGexpats</span>
          {subscription&&<span style={{background:"#f0c060",color:"#1a3a20",fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:700,marginLeft:4}}>{subscription.plan.toUpperCase()}</span>}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setView("tools")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="tools"?700:400}}>
            🛠️ Tools
          </button>
          <button onClick={()=>setView("map")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="map"?700:400}}>
            📍 Map
          </button>
          <button onClick={()=>setView("advertise")} style={{background:"rgba(240,192,96,0.15)",border:"1px solid rgba(240,192,96,0.25)",color:"#f0c060",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:400}}>
            📢 Advertise
          </button>
          <button onClick={()=>setView("pricing")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="pricing"?700:400}}>
            ⭐ Pricing
          </button>
          <button onClick={()=>setView("community")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="community"?700:400}}>
          <button onClick={()=>setView("pricing")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="pricing"?700:400}}>
            ⭐ Pricing
          </button>
                      💬 Community
          </button>
          <button onClick={()=>setView("connect")} style={{background:view==="connect"?"rgba(147,51,234,0.3)":"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="connect"?700:400}}>
            💑 Connect
          </button>
          <button onClick={()=>setView("apps")} style={{background:view==="apps"?"rgba(99,102,241,0.3)":"rgba(255,255,255,0.12)",border:view==="apps"?"1px solid rgba(99,102,241,0.5)":"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="apps"?700:400}}>
            📱 Apps
          </button>
          <button onClick={()=>setView("chat")} style={{background:C.accent,border:"none",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
            🤖 {aiLabel[lang]||"AI"}
          </button>
          {user&&(
            <button onClick={()=>setView("tracker")} style={{background:view==="tracker"?"rgba(240,192,96,0.2)":"rgba(255,255,255,0.12)",border:view==="tracker"?"1px solid #f0c060":"none",color:view==="tracker"?"#f0c060":"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:view==="tracker"?700:400,flexShrink:0}}>
              📅 Deadlines
            </button>
          )}
          {user&&!subscription&&(
            <button onClick={()=>openCheckout("basic")} style={{background:"rgba(240,192,96,0.15)",border:"1px solid rgba(240,192,96,0.4)",color:"#f0c060",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600}}>
              ⭐ Upgrade
            </button>
          )}
          {user?(
            <div style={{position:"relative"}}>
              <button onClick={()=>setUserMenu(!userMenu)}
                style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",padding:"5px 10px 5px 6px",borderRadius:20,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{user.av||user.name.slice(0,2).toUpperCase()}</div>
                {user.name.split(" ")[0]}
              </button>
              {userMenu&&(
                <div style={{position:"absolute",right:0,top:42,background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:180,zIndex:200,overflow:"hidden"}}>
                  <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:C.page}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.text}}>{user.name}</div>
                    <div style={{fontSize:12,color:C.muted}}>{user.email}</div>
                  </div>
                  <button onClick={()=>{setView("advertise");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"#b8792a",display:"flex",gap:8,borderTop:`1px solid ${C.border}`}}>📢 Advertise on BGexpats</button>
          <button onClick={()=>{setView("community");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:C.text,display:"flex",gap:8}}>💬 My community</button>
                  {(user&&user.isAdmin)&&<button onClick={()=>{setView("analytics");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"#1d4ed8",display:"flex",gap:8,borderTop:"1px solid var(--border)"}}>📊 Analytics dashboard</button>}
                  <button onClick={()=>{setUser(null);setUserMenu(false);setView("home")}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"#c00",display:"flex",gap:8,borderTop:`1px solid ${C.border}`}}>🚪 Sign out</button>
                </div>
              )}
            </div>
          ):(
            <button onClick={()=>setView("login")} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>
              👤 Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

function Hero({setView,t,lang}){
  const heroImages=[
    "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1400&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=1400&q=80",
  ]
  const [imgIdx,setImgIdx]=useState(0)
  useEffect(()=>{
    const t=setInterval(()=>setImgIdx(i=>(i+1)%heroImages.length),5000)
    return()=>clearInterval(t)
  },[])
  return(
    <div style={{position:"relative",height:"88vh",minHeight:520,maxHeight:720,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {heroImages.map((src,i)=>(
        <div key={src} style={{position:"absolute",inset:0,opacity:imgIdx===i?1:0,transition:"opacity 1.5s ease",zIndex:0}}>
          <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}
            onError={e=>{e.currentTarget.style.display="none"}}/>
          <div style={{position:"absolute",inset:0,background:["linear-gradient(135deg,#0d3d25 0%,#1e7a4a 50%,#2a9a5e 100%)","linear-gradient(135deg,#1a2a4a 0%,#2a4a7a 50%,#3a6aaa 100%)","linear-gradient(135deg,#3a1a0a 0%,#6a3a1a 50%,#9a5a2a 100%)"][i],zIndex:-1}}/>
        </div>
      ))}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(10,40,20,0.55) 0%, rgba(10,40,20,0.75) 100%)",zIndex:1}}/>
      <div style={{position:"relative",zIndex:2,textAlign:"center",padding:"0 20px",maxWidth:680}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:20,padding:"5px 16px",marginBottom:20,border:"1px solid rgba(255,255,255,0.2)"}}>
          <span style={{fontSize:14}}>🇧🇬</span>
          <span style={{color:"rgba(255,255,255,0.95)",fontSize:13}}>{t.badge}</span>
        </div>
        <h1 style={{color:"#fff",fontSize:"clamp(28px,5.5vw,52px)",fontWeight:800,margin:"0 0 16px",lineHeight:1.1,letterSpacing:"-1px",textShadow:"0 2px 20px rgba(0,0,0,0.4)"}}>
          {t.h1a}<br/><span style={{color:"#f0c060"}}>{t.h1b}</span>
        </h1>
        <p style={{color:"rgba(255,255,255,0.85)",fontSize:17,margin:"0 0 32px",lineHeight:1.65,textShadow:"0 1px 8px rgba(0,0,0,0.3)"}}>{t.sub}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setView("chat")} style={{background:C.accent,border:"none",color:"#fff",padding:"14px 28px",borderRadius:12,cursor:"pointer",fontSize:15,fontWeight:700,display:"inline-flex",alignItems:"center",gap:8,boxShadow:"0 6px 24px rgba(0,0,0,0.3)"}}>
            🤖 {t.askBtn}
          </button>
          <button onClick={()=>setView("tourism")} style={{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"14px 28px",borderRadius:12,cursor:"pointer",fontSize:15,fontWeight:600}}>
            ✈️ {lang==="fr"?"Explorer":(lang==="es"?"Explorar":(lang==="de"?"Entdecken":(lang==="nl"?"Ontdekken":"Explore Bulgaria")))}
          </button>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:36,marginTop:40}}>
          {[["6",t.stats[0]],["24/7",t.stats[1]],["5★",t.stats[2]]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{color:"#f0c060",fontSize:24,fontWeight:800}}>{n}</div>
              <div style={{color:"rgba(255,255,255,0.65)",fontSize:12}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:20}}>
          {heroImages.map((_,i)=>(
            <button key={i} onClick={()=>setImgIdx(i)} style={{width:i===imgIdx?24:8,height:8,borderRadius:4,background:i===imgIdx?"#f0c060":"rgba(255,255,255,0.4)",border:"none",cursor:"pointer",transition:"all 0.3s",padding:0}}/>
          ))}
        </div>
      </div>
    </div>
  )
}

const CAT_PHOTOS={
  legal:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=75",
  healthcare:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=75",
  banking:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=75",
  tourism:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=75",
  housing:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75",
  business:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75",
}

function CategoryGrid({setView,t,lang}){
  useScrollReveal()
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"52px 20px"}}>
      <h2 className="reveal serif" style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:400,color:C.text,margin:"0 0 8px"}}>{t.browse}</h2>
      <p className="reveal" style={{color:C.muted,margin:"0 0 32px",fontSize:16,fontWeight:300}}>{t.browseSub}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {CATEGORIES.map(cat=>{
          const lb=cat.labels[lang]
          return(
            <button key={cat.id} onClick={()=>setView(cat.id)}
              className="reveal hover-lift"
              style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,overflow:"hidden",cursor:"pointer",textAlign:"left",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",padding:0}}>
              <div style={{position:"relative",height:160,overflow:"hidden",background:cat.bg}}>
                <img src={CAT_PHOTOS[cat.id]} alt={lb.label}
                  style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.3s"}}
                  onError={e=>{e.currentTarget.style.display="none"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 60%)"}}/>
                <div style={{position:"absolute",top:12,left:12,width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat.icon}</div>
                <div style={{position:"absolute",bottom:10,left:12,color:"#fff",fontSize:13,fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.5)"}}>{lb.label}</div>
              </div>
              <div style={{padding:"14px 16px 16px"}}>
                <div className="serif" style={{fontWeight:400,fontSize:17,color:C.text,marginBottom:4}}>{lb.label}</div>
                <div style={{fontSize:13,color:C.muted,marginBottom:10}}>{lb.sub}</div>
                <div style={{fontSize:12,color:C.primary,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                  {cat.articles.length} {cat.articles.length>1?t.guides:t.guide} <span style={{fontSize:14}}>→</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function QuickFacts({t}){
  return(
    <div style={{background:C.primaryLight,padding:"36px 20px",borderTop:`1px solid #bcd4c6`}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <h3 style={{fontSize:17,fontWeight:600,color:C.primary,margin:"0 0 18px"}}>{t.facts}</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:10}}>
          {t.factsList.map(([icon,text])=>(
            <div key={text} style={{display:"flex",alignItems:"flex-start",gap:10,background:"#fff",borderRadius:10,padding:"11px 13px",border:`1px solid #bcd4c6`}}>
              <span style={{fontSize:17,flexShrink:0}}>{icon}</span>
              <span style={{fontSize:13,color:C.text,lineHeight:1.5}}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhotoGallery({setView,lang}){
  const photos=[
    {src:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",city:"Sofia",desc:"Alexander Nevsky Cathedral"},
    {src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",city:"Plovdiv",desc:"Old Town"},
    {src:"https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80",city:"Bansko",desc:"Pirin Mountains"},
    {src:"https://images.unsplash.com/photo-1567021208000-e2b69c42c910?w=800&q=80",city:"Black Sea",desc:"Sunny Beach"},
    {src:"https://images.unsplash.com/photo-1580204137373-fbf0e5b6e14b?w=800&q=80",city:"Rila",desc:"Rila Monastery"},
    {src:"https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",city:"Nessebar",desc:"Ancient City"},
  ]
  const titles={en:"Discover Bulgaria",fr:"Découvrez la Bulgarie",es:"Descubre Bulgaria",de:"Entdecke Bulgarien",nl:"Ontdek Bulgarije"}
  const subs={en:"From mountain peaks to ancient cities and sun-soaked beaches",fr:"Des sommets montagneux aux villes antiques et plages ensoleillées",es:"De picos montañosos a ciudades antiguas y playas soleadas",de:"Von Berggipfeln zu antiken Städten und sonnigen Stränden",nl:"Van bergtoppen tot oude steden en zonnige stranden"}
  const [active,setActive]=useState(0)
  return(
    <div style={{background:C.primaryDark,padding:"60px 0"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <h2 style={{color:"#fff",fontSize:28,fontWeight:700,margin:"0 0 8px"}}>{titles[lang]}</h2>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,margin:0}}>{subs[lang]}</p>
        </div>
        <div style={{position:"relative",borderRadius:18,overflow:"hidden",height:420,marginBottom:16,boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
          {photos.map((p,i)=>(
            <div key={i} style={{position:"absolute",inset:0,opacity:active===i?1:0,transition:"opacity 0.7s ease",zIndex:active===i?1:0}}>
              <div style={{position:"relative",width:"100%",height:"100%"}}>
                <div style={{position:"absolute",inset:0,background:["linear-gradient(135deg,#0d3d25,#2a7a52)","linear-gradient(135deg,#1a3a6a,#2a6aaa)","linear-gradient(135deg,#2a1a0a,#8a5a1a)","linear-gradient(135deg,#0a2a4a,#1a5a8a)","linear-gradient(135deg,#1a0a2a,#4a1a6a)","linear-gradient(135deg,#2a0a0a,#7a2a2a)"][i]}}/>
                <img src={p.src} alt={p.city} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}
                  onError={e=>{e.currentTarget.style.display="none"}}/>
              </div>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",bottom:24,left:28}}>
                <div style={{color:"#f0c060",fontSize:13,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{p.city}</div>
                <div style={{color:"#fff",fontSize:20,fontWeight:700}}>{p.desc}</div>
              </div>
            </div>
          ))}
          <button onClick={()=>setActive(a=>(a-1+photos.length)%photos.length)} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",zIndex:10,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:44,height:44,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <button onClick={()=>setActive(a=>(a+1)%photos.length)} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",zIndex:10,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:44,height:44,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {photos.map((p,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{flexShrink:0,width:90,height:60,borderRadius:10,overflow:"hidden",border:active===i?"3px solid #f0c060":"3px solid transparent",cursor:"pointer",padding:0,transition:"border 0.2s"}}>
              <div style={{position:"relative",width:"100%",height:"100%",background:["#1e5e3f","#1a3a6a","#6a3a1a","#0a3a5a","#3a1a5a","#5a1a1a"][i]}}>
                <img src={p.src} alt={p.city} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}
                  onError={e=>{e.currentTarget.style.display="none"}}/>
              </div>
            </button>
          ))}
        </div>
        <div style={{marginTop:40}}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <span style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>▶ {lang==="fr"?"Regarder la vidéo":lang==="es"?"Ver el vídeo":lang==="de"?"Video ansehen":lang==="nl"?"Bekijk de video":"Watch: Living in Bulgaria as an expat"}</span>
          </div>
          <div style={{position:"relative",borderRadius:16,overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,0.4)",paddingTop:"56.25%"}}>
            <iframe
              src="https://www.youtube.com/embed/ctpOAWZqtQg?autoplay=1&mute=1&loop=1&playlist=ctpOAWZqtQg&controls=0&rel=0&modestbranding=1&playsinline=1"
              title="Living in Bulgaria"
              style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen/>
          </div>
        </div>
      </div>
    </div>
  )
}

function AiCta({setView,t}){
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"44px 20px"}}>
      <div className="reveal" style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,borderRadius:22,padding:"44px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:24,marginBottom:7}}>🤖</div>
          <h3 className="serif" style={{color:"#fff",fontSize:"clamp(20px,3vw,28px)",fontWeight:400,margin:"0 0 10px"}}>{t.ctaTitle}</h3>
          <p style={{color:"rgba(255,255,255,0.72)",fontSize:14,margin:0,lineHeight:1.6,whiteSpace:"pre-line"}}>{t.ctaSub}</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={()=>setView("chat")} style={{background:"#fff",border:"none",color:C.primary,padding:"11px 22px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
            {t.ctaBtn}
          </button>
          <button onClick={()=>setView("pricing")} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"11px 22px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:500}}>
            ⭐ View plans
          </button>
        </div>
      </div>
    </div>
  )
}

function Footer({lang}){
  const lines={en:"Helping expats navigate life in Bulgaria",fr:"Aider les expatriés à vivre en Bulgarie",es:"Ayudando a expatriados a vivir en Bulgaria",de:"Für Expats in Bulgarien"}
  return(
    <footer style={{background:C.primaryDark,padding:"28px 20px",textAlign:"center"}}>
      <div style={{fontSize:20,marginBottom:5}}>🌹</div>
      <div style={{color:"rgba(255,255,255,0.45)",fontSize:13}}>BGexpats — {lines[lang]}</div>
      <div style={{color:"rgba(255,255,255,0.25)",fontSize:11,marginTop:5}}>Always verify legal and financial information with a qualified local professional.</div>
    </footer>
  )
}

function CategoryPage({catId,setView,lang,t,cache,setCache,user,reviews,setReviews}){
  const cat=CATEGORIES.find(c=>c.id===catId)
  const [open,setOpen]=useState(-1)
  if(!cat)return null
  const lb=cat.labels[lang]

  const getTranslation=(artIdx)=>{
    const key=`${catId}_${artIdx}_${lang}`
    return cache[key]
  }

  const translateArticle=async(artIdx,body)=>{
    if(lang==="en")return
    const key=`${catId}_${artIdx}_${lang}`
    if(cache[key])return
    setCache(prev=>({...prev,[key]:"__loading__"}))
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:`Translate this expat guide text to ${LANGS[lang].name}. Keep all formatting exactly: • bullet points, **bold** text, 💡 tip blocks, line breaks. Return only the translated text:\n\n${body}`}]})
      })
      const data=await res.json()
      const translated=((data.content&&data.content[0]&&data.content[0].text)||'')||body
      setCache(prev=>({...prev,[key]:translated}))
    }catch{
      setCache(prev=>({...prev,[key]:body}))
    }
  }

  const handleOpen=(i)=>{
    const next=open===i?-1:i
    setOpen(next)
    if(next>=0&&lang!=="en")translateArticle(next,cat.articles[next].body)
  }

  const formatBody=(text)=>
    text.split("\n").map((line,i)=>{
      if(line.startsWith("**")&&line.endsWith("**"))return<div key={i} style={{fontWeight:600,color:C.text,margin:"12px 0 3px",fontSize:14}}>{line.slice(2,-2)}</div>
      if(line.startsWith("• ")||line.startsWith("• "))return<div key={i} style={{display:"flex",gap:8,margin:"3px 0"}}><span style={{color:C.accent,flexShrink:0}}>•</span><span>{line.slice(2)}</span></div>
      if(line.match(/^\d+\./))return<div key={i} style={{margin:"3px 0",paddingLeft:4}}>{line}</div>
      if(line.startsWith("💡"))return<div key={i} style={{background:"#fff9f0",border:`1px solid #f0d9b0`,borderRadius:8,padding:"9px 12px",margin:"12px 0 0",fontSize:13,color:"#8a5a1a"}}>{line}</div>
      if(line.trim()==="")return<div key={i} style={{height:5}}/>
      return<div key={i} style={{lineHeight:1.7,color:C.text,fontSize:14}}>{line}</div>
    })

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"32px 20px 60px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:26}}>
          <div style={{width:46,height:46,borderRadius:13,background:cat.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:23}}>{cat.icon}</div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>{lb.label}</h1>
            <p style={{fontSize:13,color:C.muted,margin:0}}>{cat.articles.length} {cat.articles.length>1?t.guides:t.guide}</p>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {cat.articles.map((art,i)=>{
            const isOpen=open===i
            const translation=getTranslation(i)
            const isLoading=translation==="__loading__"
            const bodyToShow=lang==="en"?art.body:(translation&&translation!=="__loading__"?translation:null)
            return(
              <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                <button onClick={()=>handleOpen(i)} style={{width:"100%",background:"none",border:"none",padding:"16px 18px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                  <span style={{fontWeight:600,fontSize:14,color:C.text}}>{art.titles[lang]||art.titles.en}</span>
                  <span style={{color:C.muted,fontSize:16,flexShrink:0,transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>⌄</span>
                </button>
                {isOpen&&(
                  <div style={{padding:"0 18px 18px",borderTop:`1px solid ${C.border}`,paddingTop:14}}>
                    {isLoading?(
                      <div style={{display:"flex",alignItems:"center",gap:8,color:C.muted,fontSize:13,padding:"8px 0"}}>
                        <span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> {t.translating}
                      </div>
                    ):bodyToShow?(
                      formatBody(bodyToShow)
                    ):(
                      <>{formatBody(art.body)}</>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{marginTop:24,background:C.primaryLight,border:`1px solid #b8d4c4`,borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <p style={{fontSize:14,color:C.primary,margin:0}}>
            <strong>{t.stillQ}</strong>{" "}
            <button onClick={()=>setView("chat")} style={{background:"none",border:"none",color:C.accent,fontWeight:600,cursor:"pointer",padding:0,fontSize:14,textDecoration:"underline"}}>{t.askLink}</button>
          </p>
          <button onClick={()=>setView("map")} style={{background:C.primary,border:"none",color:"#fff",padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,flexShrink:0}}>
            📍 View on map
          </button>
        </div>
        <div style={{marginTop:16,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,fontSize:12,color:"#92400e"}}>
          ⚠️ <strong>Always verify official information</strong> — immigration rules and fees change. Cross-check with the relevant Bulgarian authority before making decisions.
        </div>
        <ReviewsSection catId={catId} user={user} reviews={reviews} setReviews={setReviews}/>
      </div>
    </div>
  )
}

function ChatPage({lang,t}){
  const [messages,setMessages]=useState([{role:"assistant",content:t.greeting}])
  const [input,setInput]=useState("")
  const [loading,setLoading]=useState(false)
  const endRef=useScrollEnd(messages)

  useEffect(()=>{
    setMessages(prev=>{
      if(prev.length===1)return[{role:"assistant",content:t.greeting}]
      return prev
    })
  },[lang])

  const send=async(text)=>{
    const msg=(text||input).trim()
    if(!msg||loading)return
    const newMsgs=[...messages,{role:"user",content:msg}]
    setMessages(newMsgs)
    setInput("")
    setLoading(true)
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:makePrompt(LANGS[lang].name),messages:newMsgs.map(m=>({role:m.role,content:m.content}))})
      })
      const data=await res.json()
      const reply=((data.content&&data.content[0]&&data.content[0].text)||'')||"Sorry, try again."
      setMessages([...newMsgs,{role:"assistant",content:reply}])
    }catch{
      setMessages([...newMsgs,{role:"assistant",content:"Connection error. Please try again."}])
    }
    setLoading(false)
  }

  const fmt=(text)=>text.split("\n").map((line,i)=>{
    if(line.startsWith("**")&&line.endsWith("**"))return<div key={i} style={{fontWeight:700,marginTop:8}}>{line.slice(2,-2)}</div>
    if(line.startsWith("• ")||line.startsWith("- "))return<div key={i} style={{paddingLeft:10,borderLeft:"2px solid rgba(255,255,255,0.25)",margin:"2px 0"}}>{line.slice(2)}</div>
    if(line.trim()==="")return<div key={i} style={{height:4}}/>
    return<div key={i} style={{lineHeight:1.65}}>{line}</div>
  })

  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 58px)",background:C.page}}>
      <div style={{background:C.primary,padding:"12px 18px",borderBottom:`1px solid ${C.primaryDark}`}}>
        <div style={{maxWidth:780,margin:"0 auto",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
          <div>
            <div style={{color:"#fff",fontWeight:600,fontSize:14}}>{t.chatTitle}</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>{t.chatSub}</div>
          </div>
          <div style={{marginLeft:"auto",background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"3px 10px",fontSize:12,color:"rgba(255,255,255,0.7)"}}>
            {LANGS[lang].flag} {LANGS[lang].name}
          </div>
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:"18px 16px"}}>
        <div style={{maxWidth:780,margin:"0 auto",display:"flex",flexDirection:"column",gap:12}}>
          {messages.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"82%",background:m.role==="user"?C.primary:C.surface,color:m.role==="user"?"#fff":C.text,borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"11px 15px",fontSize:14,border:m.role==="assistant"?`1px solid ${C.border}`:"none",boxShadow:m.role==="assistant"?"0 1px 3px rgba(0,0,0,0.04)":"none"}}>
                {fmt(m.content)}
              </div>
            </div>
          ))}
          {loading&&(
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"16px 16px 16px 4px",padding:"11px 16px",display:"flex",gap:5,alignItems:"center"}}>
                {[0,1,2].map(j=><div key={j} style={{width:7,height:7,borderRadius:"50%",background:C.muted,animation:`bounce 1s ${j*0.2}s infinite`}}/>)}
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>
      </div>

      {messages.length===1&&(
        <div style={{padding:"0 16px 10px"}}>
          <div style={{maxWidth:780,margin:"0 auto"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {t.suggestions.map(s=>(
                <button key={s} onClick={()=>send(s)} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"6px 13px",fontSize:12,color:C.text,cursor:"pointer",lineHeight:1.4}}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{padding:"10px 16px 18px",background:C.surface,borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:780,margin:"0 auto",display:"flex",gap:9}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
            placeholder={t.placeholder}
            style={{flex:1,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 15px",fontSize:14,outline:"none",background:C.page,color:C.text}}/>
          <button onClick={()=>send()} disabled={!input.trim()||loading}
            style={{background:input.trim()&&!loading?C.primary:"#ccc",border:"none",color:"#fff",padding:"10px 16px",borderRadius:10,cursor:input.trim()&&!loading?"pointer":"default",fontSize:15,fontWeight:700,transition:"background 0.15s",minWidth:44}}>→</button>
        </div>
      </div>
    </div>
  )
}


// ── Social data (session-level) ─────────────────────────────────
let SESSION_USERS = [{email:"demo@bulgaria.com",password:"demo123",name:"Demo User",av:"DU",joined:"January 2024"},{email:"admin@bgexpats.com",password:"BGexpats2025!",name:"Diego — Admin",av:"DA",joined:"January 2025",isAdmin:true}]
const INIT_REVIEWS = {
  legal:[{author:"David K.",av:"DK",rating:5,time:"1 month ago",text:"The Type D visa guide was incredibly detailed. Followed it step by step and got approved first try!"}],
  healthcare:[{author:"Lisa M.",av:"LM",rating:4,time:"2 weeks ago",text:"Great info about Tokuda Hospital. The English-speaking staff really made a difference at my first appointment."}],
  banking:[{author:"Tom R.",av:"TR",rating:5,time:"3 weeks ago",text:"Opened my DSK account following this guide. Very smooth process — about 1 hour total."}],
  tourism:[{author:"Anna B.",av:"AB",rating:5,time:"1 week ago",text:"The Plovdiv recommendation was spot on! Spent a whole day there and it was magical."}],
  housing:[{author:"Chris N.",av:"CN",rating:4,time:"2 months ago",text:"Found my apartment in Lozenets thanks to the imoti.net tip. Great neighborhood for expats!"}],
  business:[{author:"Sara P.",av:"SP",rating:5,time:"5 days ago",text:"EOOD setup guide saved me so much confusion. My accountant confirmed all info was accurate."}],
}

// ── Stars ────────────────────────────────────────────────────────
function Stars({rating,size=14,interactive=false,onRate}){
  const [hover,setHover]=useState(0)
  return(
    <span style={{display:"inline-flex",gap:1}}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} onClick={()=>interactive&&onRate&&onRate(i)}
          onMouseEnter={()=>interactive&&setHover(i)} onMouseLeave={()=>interactive&&setHover(0)}
          style={{fontSize:size,color:i<=(hover||rating)?"#f0c060":"#ddd",cursor:interactive?"pointer":"default",transition:"color 0.1s"}}>★</span>
      ))}
    </span>
  )
}

// ── Avatar ───────────────────────────────────────────────────────
function Av({initials,size=36,bg}){
  const colors=["#1e5e3f","#2a6a8a","#8a3a1a","#5a2a8a","#1a5a5a","#6a4a1a"]
  const c=bg||(colors[initials.charCodeAt(0)%colors.length])
  return(
    <div style={{width:size,height:size,borderRadius:"50%",background:c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.36,fontWeight:700,flexShrink:0,letterSpacing:"-0.5px"}}>{initials}</div>
  )
}

// ── Login Page ───────────────────────────────────────────────────
function LoginPage({setUser,setView}){
  const [mode,setMode]=useState("login")
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")
  const [name,setName]=useState("")
  const [err,setErr]=useState("")
  const [ok,setOk]=useState(false)

  const submit=()=>{
    setErr("")
    if(!email.includes("@")){setErr("Please enter a valid email address.");return}
    if(pass.length<6){setErr("Password must be at least 6 characters.");return}
    if(mode==="register"){
      if(!name.trim()){setErr("Please enter your full name.");return}
      if(SESSION_USERS.find(u=>u.email===email)){setErr("This email is already registered.");return}
      const av=name.trim().split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
      const u={email,password:pass,name:name.trim(),av,joined:new Date().toLocaleDateString("en-GB",{month:"long",year:"numeric"})}
      SESSION_USERS=[...SESSION_USERS,u]
      setUser(u);setOk(true);gtrack("login",{method:"email"});setTimeout(()=>setView("community"),900)
    } else {
      const u=SESSION_USERS.find(u=>u.email===email&&u.password===pass)
      if(!u){setErr("Incorrect email or password. Try demo@bulgaria.com / demo123");return}
      setUser(u);setOk(true);gtrack("sign_up",{method:"email"});setTimeout(()=>setView("community"),900)
    }
  }

  return(
    <div style={{minHeight:"calc(100vh - 100px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px",background:C.page}}>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{background:C.surface,borderRadius:22,border:`1px solid ${C.border}`,boxShadow:"0 12px 40px rgba(0,0,0,0.1)",overflow:"hidden"}}>
          <div style={{background:`linear-gradient(135deg,${C.primary} 0%,#2a7a52 100%)`,padding:"36px 32px 30px",textAlign:"center"}}>
            <div style={{fontSize:36,marginBottom:10}}>🌹</div>
            <h1 style={{color:"#fff",fontSize:24,fontWeight:800,margin:"0 0 6px",letterSpacing:"-0.4px"}}>BGexpats Community</h1>
            <p style={{color:"rgba(255,255,255,0.72)",fontSize:14,margin:0}}>Join 2,400+ expats sharing tips about Bulgaria</p>
          </div>
          <div style={{padding:"28px 32px 32px"}}>
            <div style={{display:"flex",background:C.page,borderRadius:12,padding:4,marginBottom:24,gap:4}}>
              {[["login","Sign in"],["register","Create account"]].map(([m,l])=>(
                <button key={m} onClick={()=>{setMode(m);setErr("")}}
                  style={{flex:1,background:mode===m?C.surface:"transparent",border:mode===m?`1px solid ${C.border}`:"none",borderRadius:9,padding:"9px 8px",cursor:"pointer",fontSize:13,fontWeight:mode===m?700:400,color:mode===m?C.text:C.muted,transition:"all 0.15s",boxShadow:mode===m?"0 1px 4px rgba(0,0,0,0.07)":"none"}}>{l}</button>
              ))}
            </div>
            {mode==="register"&&(
              <div style={{marginBottom:16}}>
                <label style={{display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:5}}>Full name</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Maria Ivanova"
                  style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
              </div>
            )}
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:5}}>Email address</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email"
                onKeyDown={e=>e.key==="Enter"&&submit()}
                style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
            </div>
            <div style={{marginBottom:err||ok?16:24}}>
              <label style={{display:"block",fontSize:13,fontWeight:600,color:C.text,marginBottom:5}}>Password</label>
              <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Minimum 6 characters"
                onKeyDown={e=>e.key==="Enter"&&submit()}
                style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
            </div>
            {err&&<div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#c00",marginBottom:16}}>⚠️ {err}</div>}
            {ok&&<div style={{background:"#f0fff4",border:"1px solid #9de",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#060",marginBottom:16}}>✅ Welcome! Redirecting to community...</div>}
            <button onClick={submit}
              style={{width:"100%",background:C.primary,border:"none",color:"#fff",padding:"13px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:700,marginBottom:18,boxSizing:"border-box"}}>
              {mode==="login"?"Sign in to community":"Join the community →"}
            </button>
            <div style={{textAlign:"center",padding:"14px 0",borderTop:`1px solid ${C.border}`}}>
              <p style={{fontSize:12,color:C.muted,margin:"0 0 6px"}}>Try the demo account:</p>
              <code style={{fontSize:12,background:C.page,padding:"4px 10px",borderRadius:6,color:C.text}}>demo@bulgaria.com</code>
              <span style={{fontSize:12,color:C.muted,margin:"0 6px"}}>/</span>
              <code style={{fontSize:12,background:C.page,padding:"4px 10px",borderRadius:6,color:C.text}}>demo123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Community Page ───────────────────────────────────────────────
const CAT_COLORS={general:"#e8f0fd",legal:"#e8f0fd",healthcare:"#e4f2ec",banking:"#fdf3e3",tourism:"#edf2fd",housing:"#f0edf8",business:"#fef3f3"}
const CAT_ICONS={general:"💬",legal:"⚖️",healthcare:"🏥",banking:"🏦",tourism:"✈️",housing:"🏠",business:"💼"}

// ── Avatar & Media helpers ────────────────────────────────────────
const readFileAsBase64 = (file) => new Promise((res, rej) => {
  const r = new FileReader()
  r.onload = () => res(r.result)
  r.onerror = rej
  r.readAsDataURL(file)
})

const saveAvatar = (email, base64) => {
  try { localStorage.setItem(`bgx_av_${email}`, base64) } catch(e) {}
}
const loadAvatar = (email) => {
  try { return localStorage.getItem(`bgx_av_${email}`) || null } catch(e) { return null }
}
const savePosts = (posts) => {
  try { localStorage.setItem('bgx_posts', JSON.stringify(posts.slice(-50))) } catch(e) {}
}
const loadPosts = () => {
  try { const p = localStorage.getItem('bgx_posts'); return p ? JSON.parse(p) : null } catch(e) { return null }
}


function CommunityPage({user,setView,posts,setPosts}){
  const [filter,setFilter]=useState("all")
  const [newPost,setNewPost]=useState("")
  const [newCat,setNewCat]=useState("general")
  const [replyOpen,setReplyOpen]=useState(null)
  const [replyText,setReplyText]=useState("")
  const filtered=filter==="all"?posts:posts.filter(p=>p.cat===filter)
  const tabs=["all","general","legal","healthcare","banking","tourism","housing","business"]

  const addPost=()=>{
    if(!newPost.trim())return
    const av=(user.av||user.name.slice(0,2).toUpperCase())
    setPosts(prev=>[{id:Date.now(),author:user.name,av,time:"Just now",content:newPost.trim(),likes:0,liked:false,cat:newCat,replies:[]},...prev])
    setNewPost("")
  }
  const toggleLike=(id)=>{
    setPosts(prev=>prev.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p))
  }
  const addReply=(id)=>{
    if(!replyText.trim())return
    const av=(user.av||user.name.slice(0,2).toUpperCase())
    setPosts(prev=>prev.map(p=>p.id===id?{...p,replies:[...p.replies,{author:user.name,av,text:replyText.trim()}]}:p))
    setReplyText("");setReplyOpen(null)
  }

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:"28px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{color:"#fff",fontSize:22,fontWeight:800,margin:"0 0 4px"}}>💬 Expat Community</h1>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,margin:0}}>Connect with expats living in Bulgaria</p>
          </div>
          <div style={{display:"flex",gap:20,color:"rgba(255,255,255,0.8)",fontSize:13}}>
            <span>👥 2,400+ members</span><span>🌍 34 countries</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 20px",display:"grid",gridTemplateColumns:"1fr 300px",gap:20,alignItems:"start"}}>
        <div style={{minWidth:0}}>
          {user&&(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"18px",marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
              <div style={{display:"flex",gap:12,marginBottom:12}}>
                <Av initials={user.av||user.name.slice(0,2).toUpperCase()} size={40}/>
                <textarea value={newPost} onChange={e=>setNewPost(e.target.value)}
                  placeholder="Share a tip, ask a question, or start a discussion about Bulgaria..."
                  style={{flex:1,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,resize:"none",minHeight:76,outline:"none",color:C.text,background:C.page,fontFamily:"inherit"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <select value={newCat} onChange={e=>setNewCat(e.target.value)}
                  style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 12px",fontSize:13,background:C.page,color:C.text,outline:"none"}}>
                  {tabs.filter(t=>t!=="all").map(c=><option key={c} value={c}>{CAT_ICONS[c]} {c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
                <button onClick={addPost} disabled={!newPost.trim()}
                  style={{background:newPost.trim()?C.primary:"#ccc",border:"none",color:"#fff",padding:"8px 22px",borderRadius:9,cursor:newPost.trim()?"pointer":"default",fontSize:14,fontWeight:700}}>
                  Post
                </button>
              </div>
            </div>
          )}

          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:10,marginBottom:14}}>
            {tabs.map(c=>(
              <button key={c} onClick={()=>setFilter(c)}
                style={{background:filter===c?C.primary:C.surface,border:`1px solid ${filter===c?C.primary:C.border}`,color:filter===c?"#fff":C.text,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:filter===c?700:400,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>
                {c==="all"?"🌍 All":CAT_ICONS[c]+" "+c.charAt(0).toUpperCase()+c.slice(1)}
              </button>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {filtered.map(post=>(
              <div key={post.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",gap:12}}>
                  <Av initials={post.av} size={40}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:6}}>
                      <span style={{fontWeight:700,fontSize:14,color:C.text}}>{post.author}</span>
                      <span style={{fontSize:11,color:C.muted}}>{post.time}</span>
                      <span style={{fontSize:11,background:CAT_COLORS[post.cat],padding:"2px 9px",borderRadius:10,color:C.text}}>{CAT_ICONS[post.cat]} {post.cat}</span>
                    </div>
                    <p style={{fontSize:14,color:C.text,margin:"0 0 12px",lineHeight:1.65}}>{post.content}</p>
                    <div style={{display:"flex",gap:14,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                      <button onClick={()=>user&&toggleLike(post.id)}
                        style={{background:"none",border:"none",cursor:user?"pointer":"default",display:"flex",alignItems:"center",gap:5,fontSize:13,color:post.liked?C.accent:C.muted,fontWeight:post.liked?700:400,padding:0}}>
                        {post.liked?"❤️":"🤍"} {post.likes}
                      </button>
                      <button onClick={()=>user&&setReplyOpen(replyOpen===post.id?null:post.id)}
                        style={{background:"none",border:"none",cursor:user?"pointer":"default",display:"flex",alignItems:"center",gap:5,fontSize:13,color:C.muted,padding:0}}>
                        💬 {post.replies.length} {post.replies.length===1?"reply":"replies"}
                      </button>
                      {!user&&<button onClick={()=>setView("login")} style={{background:"none",border:"none",color:C.primary,cursor:"pointer",fontSize:12,fontWeight:600,padding:0,marginLeft:"auto"}}>Sign in to interact →</button>}
                    </div>
                    {post.replies.length>0&&(
                      <div style={{marginTop:12,paddingLeft:14,borderLeft:`2px solid ${C.border}`}}>
                        {post.replies.map((r,i)=>(
                          <div key={i} style={{display:"flex",gap:10,marginBottom:8}}>
                            <Av initials={r.av} size={28}/>
                            <div style={{background:C.page,borderRadius:10,padding:"8px 12px",flex:1}}>
                              <span style={{fontWeight:700,fontSize:12,color:C.text}}>{r.author}</span>
                              <p style={{fontSize:13,color:C.text,margin:"3px 0 0",lineHeight:1.55}}>{r.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {replyOpen===post.id&&user&&(
                      <div style={{marginTop:12,display:"flex",gap:9}}>
                        <Av initials={user.av||user.name.slice(0,2).toUpperCase()} size={28}/>
                        <input value={replyText} onChange={e=>setReplyText(e.target.value)}
                          onKeyDown={e=>e.key==="Enter"&&addReply(post.id)}
                          placeholder="Write a reply... (Enter to send)"
                          style={{flex:1,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:13,outline:"none",background:C.page,color:C.text}}/>
                        <button onClick={()=>addReply(post.id)} style={{background:C.primary,border:"none",color:"#fff",padding:"8px 14px",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:700}}>→</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {!user?(
            <div style={{background:C.primary,borderRadius:14,padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>🌹</div>
              <h3 style={{color:"#fff",fontSize:16,fontWeight:700,margin:"0 0 6px"}}>Join the community</h3>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:13,margin:"0 0 14px",lineHeight:1.5}}>Ask questions, share tips and meet other expats in Bulgaria</p>
              <button onClick={()=>setView("login")} style={{background:"#fff",border:"none",color:C.primary,padding:"10px",borderRadius:9,cursor:"pointer",fontSize:14,fontWeight:700,width:"100%"}}>Sign up free →</button>
            </div>
          ):(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <Av initials={user.av||user.name.slice(0,2).toUpperCase()} size={44}/>
                <div><div style={{fontWeight:700,fontSize:14,color:C.text}}>{user.name}</div><div style={{fontSize:12,color:C.muted}}>Member since {user.joined}</div></div>
              </div>
            </div>
          )}
          <div style={{background:"linear-gradient(135deg,#6b21a8,#9333ea)",borderRadius:14,padding:"16px",textAlign:"center",marginBottom:0}}>
            <div style={{fontSize:24,marginBottom:6}}>💑</div>
            <div style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:4}}>Meet & Connect</div>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:12,margin:"0 0 12px"}}>Find friends or romance with Bulgarians and expats</p>
            <button onClick={()=>setView("connect")} style={{background:"#fff",border:"none",color:"#6b21a8",padding:"8px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,width:"100%"}}>Browse profiles →</button>
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px"}}>
            <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 12px"}}>📊 Community stats</h3>
            {[["👥 Members","2,400+"],["💬 Posts this week","48"],["🌍 Countries","34"],["⭐ Avg. rating","4.8/5"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:13,color:C.muted}}>{l}</span><span style={{fontSize:13,fontWeight:700,color:C.text}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px"}}>
            <h3 style={{fontSize:14,fontWeight:700,color:C.text,margin:"0 0 12px"}}>🔥 Hot topics</h3>
            {[["EOOD company setup","23"],["Best Sofia neighborhoods","19"],["Healthcare for expats","17"],["Cost of living 2024","15"],["Driving license exchange","12"]].map(([t,n])=>(
              <div key={t} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:13,color:C.text}}>{t}</span><span style={{fontSize:12,color:C.muted}}>{n} posts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Reviews Section ──────────────────────────────────────────────
function ReviewsSection({catId,user,reviews,setReviews}){
  const list=reviews[catId]||[]
  const avg=list.length?(Math.round(list.reduce((s,r)=>s+r.rating,0)/list.length*10)/10):0
  const [showForm,setShowForm]=useState(false)
  const [rating,setRating]=useState(0)
  const [text,setText]=useState("")

  const submit=()=>{
    if(!rating||!text.trim())return
    const r={author:user.name,av:user.av||user.name.slice(0,2).toUpperCase(),rating,time:"Just now",text:text.trim()}
    setReviews(prev=>({...prev,[catId]:[r,...(prev[catId]||[])]}))
    setRating(0);setText("");setShowForm(false)
  }

  return(
    <div style={{marginTop:28,background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden"}}>
      <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,background:`linear-gradient(to right,${C.primaryLight},${C.surface})`}}>
        <div>
          <h3 style={{fontSize:16,fontWeight:700,color:C.text,margin:"0 0 4px"}}>⭐ Community reviews</h3>
          {list.length>0&&(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Stars rating={avg}/><span style={{fontSize:15,fontWeight:700,color:C.text}}>{avg}</span>
              <span style={{fontSize:13,color:C.muted}}>({list.length} review{list.length>1?"s":""})</span>
            </div>
          )}
        </div>
        {user&&!showForm&&<button onClick={()=>setShowForm(true)} style={{background:C.primary,border:"none",color:"#fff",padding:"8px 18px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:700}}>✏️ Write a review</button>}
        {!user&&<span style={{fontSize:13,color:C.muted}}>Sign in to leave a review</span>}
      </div>
      {showForm&&(
        <div style={{padding:"18px",borderBottom:`1px solid ${C.border}`,background:C.page}}>
          <p style={{fontSize:13,color:C.muted,margin:"0 0 8px"}}>Your rating:</p>
          <div style={{marginBottom:14}}><Stars rating={rating} size={28} interactive onRate={setRating}/></div>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Share your experience with this guide..."
            style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,resize:"none",minHeight:80,outline:"none",color:C.text,background:C.surface,fontFamily:"inherit",marginBottom:12,boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={submit} disabled={!rating||!text.trim()}
              style={{background:rating&&text.trim()?C.primary:"#ccc",border:"none",color:"#fff",padding:"9px 22px",borderRadius:9,cursor:rating&&text.trim()?"pointer":"default",fontSize:14,fontWeight:700}}>Submit</button>
            <button onClick={()=>setShowForm(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.text,padding:"9px 16px",borderRadius:9,cursor:"pointer",fontSize:14}}>Cancel</button>
          </div>
        </div>
      )}
      <div>
        {list.map((r,i)=>(
          <div key={i} style={{padding:"16px 18px",borderBottom:i<list.length-1?`1px solid ${C.border}`:"none"}}>
            <div style={{display:"flex",gap:12}}>
              <Av initials={r.av} size={38}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                  <span style={{fontWeight:700,fontSize:14,color:C.text}}>{r.author}</span>
                  <Stars rating={r.rating} size={13}/>
                  <span style={{fontSize:12,color:C.muted}}>{r.time}</span>
                </div>
                <p style={{fontSize:14,color:C.text,margin:0,lineHeight:1.65}}>{r.text}</p>
              </div>
            </div>
          </div>
        ))}
        {list.length===0&&<div style={{padding:"28px",textAlign:"center",color:C.muted,fontSize:14}}>No reviews yet — be the first! 🌟</div>}
      </div>
    </div>
  )
}


const NEIGHBOURHOODS=[
  {name:"Lozenets",city:"sofia",rent:900,safety:9,expat:9,transport:7,restaurants:9,desc:"Most popular with expats. Quiet, leafy, great cafes."},
  {name:"Iztok",city:"sofia",rent:800,safety:8,expat:8,transport:7,restaurants:8,desc:"Upscale residential, embassies, large apartments."},
  {name:"Doctor's Garden",city:"sofia",rent:1100,safety:9,expat:8,transport:8,restaurants:9,desc:"Most central and premium. Near the park."},
  {name:"Center",city:"sofia",rent:950,safety:7,expat:9,transport:10,restaurants:10,desc:"Best location, most walkable, lively but can be noisy."},
  {name:"Oborishte",city:"sofia",rent:850,safety:8,expat:8,transport:8,restaurants:8,desc:"Great balance of location and price. Very liveable."},
  {name:"Mladost 1",city:"sofia",rent:700,safety:8,expat:7,transport:8,restaurants:7,desc:"Modern, good metro link, popular with families."},
  {name:"Vitosha",city:"sofia",rent:750,safety:9,expat:6,transport:5,restaurants:6,desc:"At the foot of the mountain. Quiet, green, car needed."},
  {name:"Studentski Grad",city:"sofia",rent:500,safety:6,expat:5,transport:8,restaurants:7,desc:"Student area, very affordable, young vibe.",city:"sofia"},
  // ── PLOVDIV ────────────────────────────────────────────────────
  {name:"Old Town (Stari Grad)",rent:550,safety:8,expat:9,transport:7,restaurants:10,desc:"UNESCO cobblestone streets, galleries, best cafes. Premium but unmatchable charm.",city:"plovdiv"},
  {name:"Kapana",rent:500,safety:8,expat:9,transport:8,restaurants:10,desc:"Creative arts district. Buzzing bars, galleries, independent shops. Very expat-friendly.",city:"plovdiv"},
  {name:"Center (Plovdiv)",rent:500,safety:7,expat:8,transport:10,restaurants:9,desc:"Pedestrian zone, everything walkable. Lively but can be noisy.",city:"plovdiv"},
  {name:"Kamenitsa",rent:380,safety:7,expat:5,transport:8,restaurants:6,desc:"Large residential area. Affordable and practical. Good transport links.",city:"plovdiv"},
  {name:"Ostromila",rent:420,safety:8,expat:6,transport:6,restaurants:6,desc:"Quiet residential, family-friendly, close to Plovdiv University.",city:"plovdiv"},
  {name:"Trakiya (Plovdiv)",rent:320,safety:6,expat:4,transport:7,restaurants:5,desc:"Most affordable Plovdiv neighbourhood. Panel blocks. Good for budget living.",city:"plovdiv"},
  // ── VARNA ──────────────────────────────────────────────────────
  {name:"Sea Garden Area",rent:700,safety:8,expat:9,transport:7,restaurants:9,desc:"Best address in Varna. Walking distance to beach and park. Premium lifestyle.",city:"varna"},
  {name:"Primorski",rent:650,safety:7,expat:8,transport:8,restaurants:8,desc:"Central Varna. Upscale, great restaurants, sea views from higher floors.",city:"varna"},
  {name:"Center (Varna)",rent:550,safety:7,expat:7,transport:10,restaurants:8,desc:"Most walkable area. All shops and services. Busy but practical.",city:"varna"},
  {name:"Chaika",rent:500,safety:8,expat:6,transport:6,restaurants:7,desc:"Quiet northern area. Green, relaxed. Good for families. Car helpful.",city:"varna"},
  {name:"Asparuhovo",rent:380,safety:6,expat:4,transport:7,restaurants:5,desc:"Most affordable Varna neighbourhood. Local feel, away from tourist areas.",city:"varna"},
  {name:"Golden Sands Area",rent:600,safety:8,expat:8,transport:5,restaurants:8,desc:"Resort living year-round. Quieter in winter. Beach on your doorstep.",city:"varna"},
  // ── BURGAS ─────────────────────────────────────────────────────
  {name:"Burgas Center",rent:450,safety:7,expat:7,transport:9,restaurants:8,desc:"Pedestrian zone, sea garden nearby. Best location in Burgas for expats.",city:"burgas"},
  {name:"Sea Garden (Burgas)",rent:500,safety:8,expat:7,transport:7,restaurants:8,desc:"Along the beautiful seafront park. Walking distance to beach and marina.",city:"burgas"},
  {name:"Slaveykov",rent:380,safety:7,expat:5,transport:8,restaurants:6,desc:"Residential area with good amenities. Mix of locals and some expats.",city:"burgas"},
  {name:"Izgrev",rent:340,safety:7,expat:4,transport:7,restaurants:5,desc:"Quieter residential quarter. Affordable, local feel.",city:"burgas"},
  {name:"Meden Rudnik",rent:290,safety:6,expat:3,transport:7,restaurants:5,desc:"Most affordable Burgas area. Panel blocks. Good bus links to center.",city:"burgas"},
  // ── STARA ZAGORA ───────────────────────────────────────────────
  {name:"Stara Zagora Center",rent:300,safety:7,expat:5,transport:9,restaurants:7,desc:"Tree-lined boulevards. City famous for its linden trees. All services walkable.",city:"stara"},
  {name:"Tri Chuchura",rent:270,safety:7,expat:4,transport:8,restaurants:6,desc:"Popular residential area. Good schools, parks, reliable transport.",city:"stara"},
  {name:"Zagorka (Stara Zagora)",rent:260,safety:6,expat:3,transport:7,restaurants:5,desc:"Local neighbourhood. Very affordable, quiet, authentic Bulgarian life.",city:"stara"},
  {name:"Industrialen (Stara Zagora)",rent:230,safety:6,expat:2,transport:7,restaurants:4,desc:"Near the industrial zone. Very cheap. Mainly for long-term budget residents.",city:"stara"},
  // ── RUSE ───────────────────────────────────────────────────────
  {name:"Ruse Center (Svoboda Sq)",rent:320,safety:7,expat:6,transport:9,restaurants:8,desc:"Beautiful neo-Baroque architecture. Called Little Vienna. Best address in Ruse.",city:"ruse"},
  {name:"Danube Riverside",rent:300,safety:7,expat:6,transport:7,restaurants:7,desc:"Scenic promenade along the Danube. Cafes, parks, Romania views across the river.",city:"ruse"},
  {name:"Druzhba (Ruse)",rent:250,safety:6,expat:4,transport:7,restaurants:5,desc:"Large residential panel district. Affordable and practical for budget expats.",city:"ruse"},
  {name:"Nadezhda (Ruse)",rent:260,safety:6,expat:3,transport:7,restaurants:5,desc:"Quieter residential area. Local community, low cost, good for long stays.",city:"ruse"},
  // ── BANSKO ─────────────────────────────────────────────────────
  {name:"Bansko Old Town",rent:420,safety:9,expat:9,transport:5,restaurants:9,desc:"Cobblestone streets, mehanas, mountain views. Very popular with expats.",city:"bansko"},
  {name:"Ski Quarter (Bansko)",rent:500,safety:8,expat:8,transport:6,restaurants:7,desc:"Near the gondola lift. Ski-in ski-out lifestyle. Lively in season, quieter in summer.",city:"bansko"},
  {name:"New Bansko",rent:350,safety:8,expat:7,transport:5,restaurants:6,desc:"Modern residential development. More affordable than Old Town. Car recommended.",city:"bansko"},
  // ── VELINGRAD ──────────────────────────────────────────────────
  {name:"Velingrad Spa District",rent:300,safety:8,expat:7,transport:5,restaurants:7,desc:"Heart of the spa town. Walking distance to thermal pools and wellness centres.",city:"velingrad"},
  {name:"Velingrad Center",rent:270,safety:7,expat:5,transport:6,restaurants:6,desc:"Town centre with all amenities. Good balance of convenience and affordability.",city:"velingrad"},
  {name:"Kamenitsa (Velingrad)",rent:240,safety:8,expat:5,transport:4,restaurants:5,desc:"Quiet residential near the springs. Green, peaceful. Car needed.",city:"velingrad"},
  // ── SHUMEN ─────────────────────────────────────────────────────
  {name:"Shumen Center",rent:250,safety:7,expat:4,transport:8,restaurants:6,desc:"City centre with main square, shops and university. Most walkable area.",city:"shumen"},
  {name:"Trakiya (Shumen)",rent:200,safety:6,expat:3,transport:7,restaurants:4,desc:"Large residential panel district. Very affordable. Basic amenities.",city:"shumen"},
  {name:"Madara Neighbourhood",rent:220,safety:7,expat:3,transport:5,restaurants:4,desc:"Quieter area near the famous Madara Horseman. Green, peaceful.",city:"shumen"},
  // ── YAMBOL ─────────────────────────────────────────────────────
  {name:"Yambol Center",rent:220,safety:7,expat:3,transport:8,restaurants:6,desc:"Compact, walkable town centre. All services close by. Very authentic Bulgarian town.",city:"yambol"},
  {name:"Zlatist (Yambol)",rent:190,safety:6,expat:2,transport:7,restaurants:4,desc:"Residential area. Very affordable. Good for long-term budget living.",city:"yambol"},
  {name:"Diyan",rent:180,safety:6,expat:2,transport:6,restaurants:4,desc:"Most affordable Yambol area. Quiet, local, far from tourist activity.",city:"yambol"},
  // ── SLIVEN ─────────────────────────────────────────────────────
  {name:"Sliven Center",rent:230,safety:7,expat:4,transport:8,restaurants:6,desc:"City centre at the foot of the Balkan Mountains. Scenic backdrop, all amenities.",city:"sliven"},
  {name:"Nansen Quarter",rent:200,safety:6,expat:3,transport:7,restaurants:5,desc:"Established residential quarter. Practical and affordable for expats on a budget.",city:"sliven"},
  {name:"Kluchetar",rent:180,safety:6,expat:2,transport:6,restaurants:4,desc:"Most affordable Sliven area. Local neighbourhood, minimal expat presence.",city:"sliven"},
]

const PHRASES={
  basics:[
    {bg:"Здравейте",ph:"Zdraveyte",en:"Hello (formal)"},
    {bg:"Благодаря",ph:"Blagodarya",en:"Thank you"},
    {bg:"Моля",ph:"Molya",en:"Please / You're welcome"},
    {bg:"Да / Не",ph:"Da / Ne",en:"Yes / No"},
    {bg:"Извинете",ph:"Izvinete",en:"Excuse me / Sorry"},
    {bg:"Добро утро",ph:"Dobro utro",en:"Good morning"},
    {bg:"Лека нощ",ph:"Leka nosht",en:"Good night"},
    {bg:"Не разбирам",ph:"Ne razbiram",en:"I don't understand"},
    {bg:"Говорите ли английски?",ph:"Govorite li angliyski?",en:"Do you speak English?"},
    {bg:"Колко струва?",ph:"Kolko struva?",en:"How much does it cost?"},
    {bg:"Помощ!",ph:"Pomosht!",en:"Help!"},
    {bg:"Обадете се на полицията",ph:"Obadete se na politsiata",en:"Call the police"},
  ],
  bank:[
    {bg:"Искам да отворя сметка",ph:"Iskam da otvorya smetka",en:"I want to open an account"},
    {bg:"Банков превод",ph:"Bankov prevod",en:"Bank transfer"},
    {bg:"Банкомат",ph:"Bankomat",en:"ATM / Cash machine"},
    {bg:"Банкова карта",ph:"Bankova karta",en:"Bank card"},
    {bg:"Сметка",ph:"Smetka",en:"Account / Bill"},
    {bg:"Мога ли да платя с карта?",ph:"Moga li da platya s karta?",en:"Can I pay by card?"},
  ],
  health:[
    {bg:"Нуждая се от лекар",ph:"Nuzhdaya se ot lekar",en:"I need a doctor"},
    {bg:"Болница",ph:"Bolnitsa",en:"Hospital"},
    {bg:"Аптека",ph:"Apteka",en:"Pharmacy"},
    {bg:"Линейка",ph:"Lineyka",en:"Ambulance"},
    {bg:"Боли ме",ph:"Boli me",en:"It hurts / I'm in pain"},
    {bg:"Алергия",ph:"Alergiya",en:"Allergy"},
    {bg:"Рецепта",ph:"Retsepta",en:"Prescription"},
  ],
  transport:[
    {bg:"Метро",ph:"Metro",en:"Metro / Subway"},
    {bg:"Автобус",ph:"Avtobus",en:"Bus"},
    {bg:"Летище",ph:"Letishte",en:"Airport"},
    {bg:"Гара",ph:"Gara",en:"Train station"},
    {bg:"Колко е далеч?",ph:"Kolko e dalech?",en:"How far is it?"},
    {bg:"Спри тук",ph:"Spri tuk",en:"Stop here (to taxi driver)"},
    {bg:"Влак",ph:"Vlak",en:"Train"},
  ],
  emergency:[
    {bg:"Помощ!",ph:"Pomosht!",en:"Help!"},
    {bg:"Спешен номер: 112",ph:"Speshen nomer: 112",en:"Emergency number: 112"},
    {bg:"Пожар!",ph:"Pozhar!",en:"Fire!"},
    {bg:"Изгубих паспорта си",ph:"Izgubikh pasporta si",en:"I lost my passport"},
    {bg:"Полиция",ph:"Politsia",en:"Police"},
    {bg:"Нуждая се от помощ",ph:"Nuzhdaya se ot pomosht",en:"I need help"},
  ],
}

function ToolGate({user,setView,children,name}){
  if(user)return children
  return(
    <div style={{position:"relative",minHeight:120}}>
      <div style={{filter:"blur(3px)",pointerEvents:"none",opacity:0.5,maxHeight:160,overflow:"hidden"}}>{children}</div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(247,243,236,0.92)",borderRadius:12,textAlign:"center",padding:20}}>
        <div style={{fontSize:26,marginBottom:8}}>🔒</div>
        <div style={{fontSize:14,fontWeight:600,color:C.primary,margin:"0 0 4px"}}>Sign in to use {name}</div>
        <p style={{fontSize:13,color:C.muted,margin:"0 0 14px"}}>Free account — unlock all 7 tools instantly</p>
        <button onClick={()=>setView("login")} style={{background:C.primary,border:"none",color:"#fff",padding:"9px 22px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>Create free account →</button>
      </div>
    </div>
  )
}

function CostCalcTool({user,setView,subscription}){
  const tier=(subscription&&subscription.plan)||"free"
  const isBasic=tier==="basic"||tier==="premium"
  const [mode,setMode]=useState("single") // "single" | "compare"
  const [city,setCity]=useState("sofia")
  const [city2,setCity2]=useState("plovdiv")
  const [preset,setPreset]=useState("comfortable")
  const presets={budget:{mult:0.65},comfortable:{mult:1},expat:{mult:1.6}}
  const cities=Object.entries(CITY_DATA)
  const calc=(cid,pm)=>{
    const cd=CITY_DATA[cid]||CITY_DATA.sofia
    const pm2=presets[pm]?.mult||1
    return{
      rent:  Math.round(cd.rentBase*pm2),
      food:  Math.round(cd.food*pm2),
      transport:Math.round(cd.transport*pm2),
      utilities:Math.round(cd.utilities*pm2),
      dining:Math.round(cd.dining*pm2),
      health:Math.round(cd.health*pm2),
    }
  }
  const v1=calc(city,preset)
  const v2=calc(city2,preset)
  const total1=Object.values(v1).reduce((s,x)=>s+x,0)
  const total2=Object.values(v2).reduce((s,x)=>s+x,0)
  const euAvg=2400
  const cats=[["🏠","Rent","rent"],["🍽️","Groceries","food"],["🚌","Transport","transport"],["💡","Utilities","utilities"],["🍷","Dining out","dining"],["🏥","Health","health"]]

  return(
    <div>
      {/* Mode toggle */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <button onClick={()=>setMode("single")} style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${mode==="single"?C.primary:C.border}`,background:mode==="single"?C.primaryLight:"transparent",color:mode==="single"?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:mode==="single"?600:400}}>
          📍 Single city
        </button>
        <button onClick={()=>isBasic?setMode("compare"):setView("pricing")} style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${mode==="compare"?C.accent:C.border}`,background:mode==="compare"?C.accentLight:"transparent",color:mode==="compare"?C.accent:C.muted,cursor:"pointer",fontSize:13,fontWeight:mode==="compare"?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          ⚖️ Compare cities
          {!isBasic&&<span style={{fontSize:9,background:"#fef3c7",color:"#92400e",padding:"1px 5px",borderRadius:5,fontWeight:700}}>BASIC</span>}
        </button>
      </div>

      {/* Lifestyle preset */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["budget","comfortable","expat"].map(p=>(
          <button key={p} onClick={()=>setPreset(p)} style={{flex:1,padding:"7px",borderRadius:10,border:`1.5px solid ${preset===p?C.accent:C.border}`,background:preset===p?C.accentLight:"transparent",color:preset===p?C.accent:C.muted,cursor:"pointer",fontSize:12,fontWeight:preset===p?600:400,textTransform:"capitalize"}}>{p}</button>
        ))}
      </div>

      {mode==="single"?(
        <div>
          {/* City selector */}
          <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
            {cities.map(([id,cd])=>(
              <button key={id} onClick={()=>setCity(id)} style={{padding:"5px 11px",borderRadius:16,border:`1.5px solid ${city===id?C.primary:C.border}`,background:city===id?C.primaryLight:"transparent",color:city===id?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:city===id?600:400,display:"flex",alignItems:"center",gap:4}}>
                <span>{cd.flag}</span><span>{cd.name}</span>
              </button>
            ))}
          </div>
          {/* City vibe */}
          <div style={{background:C.primaryLight,borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.primary}}>
            {CITY_DATA[city]?.flag} <strong>{CITY_DATA[city]?.name}</strong> — {CITY_DATA[city]?.vibe}
          </div>
          {/* Breakdown */}
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {cats.map(([icon,label,key])=>(
              <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.page,borderRadius:8,padding:"9px 12px"}}>
                <span style={{fontSize:13,color:C.text}}>{icon} {label}</span>
                <span style={{fontSize:13,fontWeight:600,color:C.primary}}>€{v1[key]}</span>
              </div>
            ))}
          </div>
          {/* Summary card */}
          <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,borderRadius:14,padding:"18px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,color:"#fff"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:11,opacity:0.7,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Monthly total</div>
              <div style={{fontSize:32,fontWeight:800}}>€{total1.toLocaleString()}</div>
              <div style={{fontSize:11,opacity:0.6}}>{CITY_DATA[city]?.name}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:11,opacity:0.7,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>vs EU average</div>
              <div style={{fontSize:32,fontWeight:800,color:"#f0c060"}}>-€{(euAvg-total1).toLocaleString()}</div>
              <div style={{fontSize:11,opacity:0.6}}>saved per month</div>
            </div>
          </div>
        </div>
      ):(
        /* Compare mode */
        <div>
          {/* City pickers */}
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:14}}>
            <select value={city} onChange={e=>setCity(e.target.value)} style={{border:`2px solid ${C.primary}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontWeight:600,color:C.primary,background:C.primaryLight,outline:"none"}}>
              {cities.filter(([id])=>id!==city2).map(([id,cd])=><option key={id} value={id}>{cd.flag} {cd.name}</option>)}
            </select>
            <span style={{textAlign:"center",fontWeight:700,color:C.muted,fontSize:18}}>vs</span>
            <select value={city2} onChange={e=>setCity2(e.target.value)} style={{border:`2px solid ${C.accent}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontWeight:600,color:C.accent,background:C.accentLight,outline:"none"}}>
              {cities.filter(([id])=>id!==city).map(([id,cd])=><option key={id} value={id}>{cd.flag} {cd.name}</option>)}
            </select>
          </div>
          {/* Side by side breakdown */}
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:C.page,padding:"8px 12px",fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              <span>Category</span><span style={{textAlign:"right",color:C.primary}}>{CITY_DATA[city]?.flag} {CITY_DATA[city]?.name}</span>
              <span style={{textAlign:"right",color:C.accent}}>{CITY_DATA[city2]?.flag} {CITY_DATA[city2]?.name}</span>
            </div>
            {cats.map(([icon,label,key])=>{
              const diff=v1[key]-v2[key]
              return(
                <div key={key} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"9px 12px",borderTop:`1px solid ${C.border}`,fontSize:13,alignItems:"center"}}>
                  <span style={{color:C.text}}>{icon} {label}</span>
                  <span style={{textAlign:"right",fontWeight:600,color:C.primary}}>€{v1[key]}</span>
                  <div style={{textAlign:"right"}}>
                    <span style={{fontWeight:600,color:C.accent}}>€{v2[key]}</span>
                    <span style={{fontSize:10,marginLeft:6,color:diff>0?"#16a34a":"#dc2626"}}>{diff>0?"-":"+"}{Math.abs(diff)}</span>
                  </div>
                </div>
              )
            })}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"12px",background:C.page,borderTop:`2px solid ${C.border}`,fontSize:14,fontWeight:700}}>
              <span style={{color:C.text}}>💰 Total</span>
              <span style={{textAlign:"right",color:C.primary}}>€{total1.toLocaleString()}</span>
              <div style={{textAlign:"right"}}>
                <span style={{color:C.accent}}>€{total2.toLocaleString()}</span>
                <span style={{fontSize:11,marginLeft:6,color:total1>total2?"#16a34a":"#dc2626",fontWeight:600}}>
                  {total1>total2?`Save €${(total1-total2).toLocaleString()} in ${CITY_DATA[city2]?.name}`:`€${(total2-total1).toLocaleString()} more`}
                </span>
              </div>
            </div>
          </div>
          {/* Summary bars */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[[city,total1,C.primary],[city2,total2,C.accent]].map(([cid,tot,col])=>(
              <div key={cid} style={{background:`${col}15`,border:`1.5px solid ${col}40`,borderRadius:12,padding:"14px",textAlign:"center"}}>
                <div style={{fontSize:20,marginBottom:4}}>{CITY_DATA[cid]?.flag}</div>
                <div style={{fontSize:13,fontWeight:600,color:col,marginBottom:2}}>{CITY_DATA[cid]?.name}</div>
                <div style={{fontSize:24,fontWeight:800,color:col}}>€{tot.toLocaleString()}</div>
                <div style={{fontSize:11,color:C.muted}}>per month</div>
                <div style={{fontSize:11,color:col,marginTop:4,fontStyle:"italic"}}>{CITY_DATA[cid]?.vibe.split("—")[0].trim()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TaxCalcTool({user,setView}){
  const [mode,setMode]=useState("employee")
  const [gross,setGross]=useState(3000)
  const inEUR=gross
  const social=Math.round(inEUR*0.1378)
  const health=Math.round(inEUR*0.032)
  const taxable=Math.max(0,inEUR-social-health)
  const incomeTax=Math.round(taxable*0.10)
  const netEmp=inEUR-social-health-incomeTax
  const expenses=Math.round(inEUR*0.20)
  const profit=inEUR-expenses
  const corpTax=Math.round(profit*0.10)
  const divTax=Math.round((profit-corpTax)*0.05)
  const netEOOD=profit-corpTax-divTax
  const fmt=v=>`€${Math.round(v).toLocaleString()}`
  const effEmp=Math.round((1-netEmp/inEUR)*100)
  const effEOOD=Math.round((1-netEOOD/inEUR)*100)
  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["employee","👤 Employee"],["eood","🏢 EOOD Owner"]].map(([k,l])=>(
          <button key={k} onClick={()=>setMode(k)} style={{flex:1,padding:"9px",borderRadius:10,border:`1.5px solid ${mode===k?C.primary:C.border}`,background:mode===k?C.primaryLight:"transparent",color:mode===k?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:mode===k?600:400}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <input type="number" value={gross} onChange={e=>setGross(Number(e.target.value)||0)} style={{flex:1,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:20,fontWeight:600,color:C.text,background:C.page,outline:"none"}}/>
        <span style={{padding:"10px 14px",fontSize:15,fontWeight:700,color:C.primary}}>€ EUR</span>
      </div>
      <ToolGate user={user} setView={setView} name="Tax Calculator">
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          {(mode==="employee"?[
            ["💼 Gross income",inEUR,C.text,false],
            ["🏛️ Social contributions (13.78%)",social,"#dc2626",true],
            ["🏥 Health insurance (3.2%)",health,"#dc2626",true],
            ["📊 Taxable income",taxable,C.primary,false],
            ["💰 Income tax (10% flat)",incomeTax,"#dc2626",true],
          ]:[
            ["💼 Revenue",inEUR,C.text,false],
            ["📋 Business expenses (~20%)",expenses,"#dc2626",true],
            ["📈 Company profit",profit,C.primary,false],
            ["🏛️ Corporate tax (10%)",corpTax,"#dc2626",true],
            ["💳 Dividend tax (5%)",divTax,"#dc2626",true],
          ]).map(([label,val,color,minus])=>(
            <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.text}}>{label}</span>
              <span style={{color,fontWeight:600}}>{minus?"-":""}{fmt(val)}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"14px",background:C.primaryLight}}>
            <span style={{fontWeight:700,fontSize:15,color:C.primary}}>Net take-home</span>
            <span style={{fontWeight:700,fontSize:20,color:C.primary}}>{fmt(mode==="employee"?netEmp:netEOOD)}</span>
          </div>
        </div>
        <div style={{background:C.primaryLight,borderRadius:10,padding:"10px 14px",marginTop:10,fontSize:13,color:C.primary}}>
          Effective tax rate: ~{mode==="employee"?effEmp:effEOOD}% — vs 35-45% in Western Europe
        </div>
      </ToolGate>
    </div>
  )
}

function VisaCheckerTool({user,setView}){
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState({})
  const questions=[
    {key:"eu",q:"Are you an EU/EEA citizen?",opts:["Yes — I am EU/EEA","No — I am non-EU"]},
    {key:"duration",q:"How long do you plan to stay in Bulgaria?",opts:["Less than 90 days","More than 90 days","I want to live there long-term"]},
    {key:"purpose",q:"What is your main purpose?",opts:["Work remotely (digital nomad)","Work for a local Bulgarian employer","Start my own business / EOOD","Retire / financial independence","Study","Tourism / short visit"]},
  ]
  const getResult=()=>{
    const eu=(ans.eu&&ans.eu.includes("Yes"))
    const long=!(ans.duration&&ans.duration.includes("Less than"))
    const p=ans.purpose||""
    if(eu&&!long)return{visa:"No visa needed",color:"#16a34a",bg:"#f0fdf4",docs:["Valid EU passport or national ID card","That's it — enjoy Bulgaria! 🎉"],note:"As an EU/EEA citizen you can stay up to 90 days freely with no formalities required."}
    if(eu&&long)return{visa:"EU Residence Certificate",color:C.primary,bg:C.primaryLight,docs:["Valid EU passport or ID card","Proof of address in Bulgaria (rental contract)","Proof of income, employment, or health insurance","2 passport photos","~€5 state fee"],note:"Register at your local Migration Directorate within 3 months of arrival. Same-day processing."}
    if(!eu&&!long)return{visa:"Short-stay visa (type C)",color:"#b8792a",bg:"#fdf3e3",docs:["Valid passport (6+ months validity)","Travel/health insurance","Proof of accommodation","Return ticket or onward travel","Bank statements"],note:"Check the Bulgarian embassy website for your specific nationality. Some nationalities enter visa-free."}
    if(p.includes("remotely"))return{visa:"Type D Visa + EOOD company",color:C.primary,bg:C.primaryLight,docs:["Valid passport (6+ months)","Health insurance (min €30,000 coverage)","Bank statements (€500+/month)","Rental contract in Bulgaria","EOOD registration (recommended)"],note:"Most digital nomads set up an EOOD (Bulgarian LLC). Corporate tax 10%, dividend tax 5% — total ~14.5% effective rate."}
    if(p.includes("Retire"))return{visa:"Type D Visa — financial means",color:"#185fa5",bg:"#e6f0fd",docs:["Valid passport","Proof of pension or regular income","Health insurance","Rental contract or property ownership","Bank statements showing €500+/month"],note:"You must demonstrate sufficient financial means. Many retirees find Bulgaria very affordable — pension goes much further here."}
    return{visa:"Type D Long-Stay Visa",color:"#185fa5",bg:"#e6f0fd",docs:["Valid passport (6+ months)","Health insurance (min €30,000 coverage)","Proof of accommodation in Bulgaria","Proof of sufficient finances (~€500/month)","Proof of purpose (work contract, enrollment letter, etc.)"],note:"Apply at the Bulgarian embassy in your home country. Processing time: 10–30 days. Fee: approximately €100."}
  }
  const answer=(key,val)=>{
    const n={...ans,[key]:val}
    setAns(n)
    if(step<questions.length-1)setStep(step+1)
    else setStep(questions.length)
  }
  const result=step===questions.length?getResult():null
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:20}}>
        {questions.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<step?C.primary:i===step?"#86efac":C.border,transition:"background 0.3s"}}/>)}
      </div>
      {step<questions.length?(
        <div>
          <p style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 14px"}}>{questions[step].q}</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {questions[step].opts.map(opt=>(
              <button key={opt} onClick={()=>answer(questions[step].key,opt)}
                style={{background:C.page,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:14,color:C.text,transition:"all 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.background=C.primaryLight}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.page}}>
                {opt}
              </button>
            ))}
          </div>
          {step>0&&<button onClick={()=>setStep(step-1)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginTop:12}}>← Back</button>}
        </div>
      ):result&&(
        <div>
          <div style={{background:result.bg,border:`1.5px solid ${result.color}30`,borderRadius:14,padding:"18px",marginBottom:14}}>
            <div style={{fontSize:11,color:result.color,fontWeight:600,marginBottom:5,letterSpacing:"0.06em",textTransform:"uppercase"}}>You need</div>
            <div style={{fontSize:20,fontWeight:700,color:result.color,marginBottom:8}}>{result.visa}</div>
            <p style={{fontSize:13,color:C.text,margin:0,lineHeight:1.6}}>{result.note}</p>
          </div>
          <ToolGate user={user} setView={setView} name="Visa Checker">
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px"}}>
              <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:10}}>Documents needed:</div>
              {result.docs.map((d,i)=>(
                <div key={i} style={{display:"flex",gap:8,padding:"5px 0",fontSize:13,color:C.text,borderBottom:`0.5px solid ${C.border}`}}>
                  <span style={{color:C.primary,flexShrink:0}}>✓</span>{d}
                </div>
              ))}
            </div>
          </ToolGate>
          <button onClick={()=>{setStep(0);setAns({})}} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontSize:13,marginTop:12,padding:"7px 14px",borderRadius:8}}>Start over ↺</button>
        </div>
      )}
    </div>
  )
}

function NeighbourhoodTool({user,setView,subscription}){
  const tier=(subscription&&subscription.plan)||"free"
  const isBasic=tier==="basic"||tier==="premium"
  const [hoodCity,setHoodCity]=useState("sofia")
  const [mode,setMode]=useState("city") // "city" | "allcities"
  const [prio,setPrio]=useState("expat")
  const sorted=[...NEIGHBOURHOODS].sort((a,b)=>prio==="rent"?a.rent-b.rent:b[prio]-a[prio])
  const show=user?sorted:sorted.slice(0,3)
  return(
    <div>
      {/* Mode toggle */}
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <button onClick={()=>setMode("city")} style={{flex:1,padding:"7px",borderRadius:10,border:`1.5px solid ${mode==="city"?C.primary:C.border}`,background:mode==="city"?C.primaryLight:"transparent",color:mode==="city"?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:mode==="city"?600:400}}>
          📍 By city
        </button>
        <button onClick={()=>isBasic?setMode("allcities"):setView("pricing")} style={{flex:1,padding:"7px",borderRadius:10,border:`1.5px solid ${mode==="allcities"?C.accent:C.border}`,background:mode==="allcities"?C.accentLight:"transparent",color:mode==="allcities"?C.accent:C.muted,cursor:"pointer",fontSize:12,fontWeight:mode==="allcities"?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          🌍 All cities
          {!isBasic&&<span style={{fontSize:9,background:"#fef3c7",color:"#92400e",padding:"1px 5px",borderRadius:5,fontWeight:700}}>BASIC</span>}
        </button>
      </div>
      {/* City selector (only in city mode) */}
      {mode==="city"&&(
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          {[["sofia","🏛️ Sofia"],["plovdiv","🏺 Plovdiv"],["varna","🌊 Varna"],["burgas","⚓ Burgas"],["stara","🌳 Stara Zagora"],["ruse","🌉 Ruse"],["bansko","🏔️ Bansko"],["velingrad","♨️ Velingrad"],["shumen","🏰 Shumen"],["yambol","🌾 Yambol"],["sliven","🏔️ Sliven"]].map(([id,label])=>(
            <button key={id} onClick={()=>setHoodCity(id)} style={{padding:"5px 12px",borderRadius:16,border:`1.5px solid ${hoodCity===id?C.primary:C.border}`,background:hoodCity===id?C.primaryLight:"transparent",color:hoodCity===id?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:hoodCity===id?600:400}}>{label}</button>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:12,color:C.muted}}>Sort by:</span>
        {[["expat","Expat-friendly"],["safety","Safety"],["restaurants","Dining"],["transport","Transit"],["rent","Lowest rent"]].map(([v,l])=>(
          <button key={v} onClick={()=>setPrio(v)} style={{padding:"5px 12px",borderRadius:16,border:`1.5px solid ${prio===v?C.primary:C.border}`,background:prio===v?C.primaryLight:"transparent",color:prio===v?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:prio===v?600:400}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {show.map((n,i)=>(
          <div key={n.name} style={{background:C.surface,border:`1px solid ${i===0?C.primary:C.border}`,borderRadius:12,padding:"14px 16px",boxShadow:i===0?"0 2px 14px rgba(30,94,63,0.12)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{fontWeight:600,fontSize:14,color:C.text}}>{i===0?"🥇 ":i===1?"🥈 ":""}{n.name}</span>
                {mode==="allcities"&&n.city&&<span style={{fontSize:10,background:n.city==="sofia"?C.primaryLight:n.city==="plovdiv"?C.accentLight:"#e6f6fd",color:n.city==="sofia"?C.primary:n.city==="plovdiv"?C.accent:"#0891b2",padding:"1px 7px",borderRadius:8,fontWeight:600,textTransform:"capitalize"}}>{n.city}</span>}
              </div>
                <p style={{fontSize:12,color:C.muted,margin:"2px 0 0",lineHeight:1.4}}>{n.desc}</p>
              </div>
              <span style={{fontSize:14,fontWeight:700,color:C.primary,flexShrink:0,marginLeft:8}}>~€{n.rent}<span style={{fontSize:11,fontWeight:400,color:C.muted}}>/mo est.</span></span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {[["Safety",n.safety],["Expats",n.expat],["Dining",n.restaurants],["Transit",n.transport]].map(([l,v])=>(
                <div key={l}>
                  <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{l}</div>
                  <div style={{height:4,background:C.page,borderRadius:2,overflow:"hidden",marginBottom:2}}><div style={{width:`${v*10}%`,height:"100%",background:v>=8?C.primary:v>=6?C.accent:"#ccc",borderRadius:2,transition:"width 0.5s"}}/></div>
                  <div style={{fontSize:11,fontWeight:600,color:C.text}}>{v}/10</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!user&&(
        <div style={{textAlign:"center",marginTop:12,padding:"14px",background:C.primaryLight,borderRadius:10}}>
          <p style={{fontSize:13,color:C.primary,margin:"0 0 4px"}}>Sign in to see all neighbourhoods</p>
          <p style={{fontSize:12,color:C.muted,margin:"0 0 10px"}}>Basic subscribers unlock Plovdiv + Varna + cross-city comparison</p>
          <button onClick={()=>setView("login")} style={{background:C.primary,border:"none",color:"#fff",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>Sign in free →</button>
        </div>
      )}
      {user&&!isBasic&&(
        <div style={{textAlign:"center",marginTop:12,padding:"14px",background:C.accentLight,borderRadius:10}}>
          <p style={{fontSize:13,color:C.accent,margin:"0 0 4px",fontWeight:600}}>🌍 Compare across all cities with Basic</p>
          <p style={{fontSize:12,color:C.muted,margin:"0 0 10px"}}>See Plovdiv + Varna neighbourhoods and compare them all side by side</p>
          <button onClick={()=>setView("pricing")} style={{background:C.accent,border:"none",color:"#fff",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>Upgrade to Basic →</button>
        </div>
      )}
    </div>
  )
}

function CurrencyTool(){
  const [amount,setAmount]=useState(100)
  const [base,setBase]=useState("EUR")
  const RATES={EUR:1,USD:1.09,GBP:0.85,CHF:0.96,SEK:11.2,DKK:7.46,NOK:11.6,PLN:4.28,RON:4.97,TRY:38.2,CAD:1.50,AUD:1.67}
      const CURRENCIES=["EUR","USD","GBP","CHF","SEK","DKK","NOK","PLN","RON"]
  return(
    <div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value)||0)} style={{flex:1,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"12px 14px",fontSize:22,fontWeight:600,color:C.text,background:C.page,outline:"none"}}/>
        <select value={base} onChange={e=>setBase(e.target.value)} style={{border:`1.5px solid ${C.primary}`,borderRadius:10,padding:"12px 14px",fontSize:15,fontWeight:600,color:C.primary,background:C.primaryLight,outline:"none"}}>
          {CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {CURRENCIES.filter(c=>c!==base).map(c=>(
          <div key={c} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:c==="EUR"?C.primaryLight:C.page,border:`1px solid ${c==="EUR"?C.primary:C.border}`,borderRadius:10,padding:"10px 16px"}}>
            <div>
              <span style={{fontSize:14,fontWeight:c==="EUR"?700:500,color:c==="EUR"?C.primary:C.text}}>{c}</span>
              {c==="EUR"&&<span style={{fontSize:10,color:C.primary,marginLeft:6,background:"#c8dece",padding:"1px 6px",borderRadius:6}}>Fixed rate 1.95583</span>}
            </div>
            <span style={{fontSize:16,fontWeight:600,color:c==="EUR"?C.primary:C.text}}>{convert(c)}</span>
          </div>
        ))}
      </div>
      <p style={{fontSize:11,color:C.muted,marginTop:10,lineHeight:1.5}}>{liveRates?`✅ Live rates — updated ${ratesUpdated}`:`⏱ ${ratesUpdated}`} · Always use Wise or Revolut for actual transfers.</p>
    </div>
  )
}

function ChecklistTool({user,setView}){
  const [nat,setNat]=useState("eu")
  const [checked,setChecked]=useState({})
  const toggle=id=>setChecked(p=>({...p,[id]:!p[id]}))
  const phases=[
    {title:"3 months before moving",emoji:"📅",items:[
      {id:"a1",text:"Research Sofia neighbourhoods — Lozenets, Iztok, Oborishte, Center"},
      {id:"a2",text:"Join Facebook expat groups: 'Expats in Bulgaria', 'Sofia Expats'"},
      {id:"a3",text:"Get all important documents apostilled (birth cert, marriage cert)"},
      {id:"a4",text:"Research and arrange health insurance (min €30,000 coverage)",eu:false},
      {id:"a5",text:"Start apartment hunting online — imoti.net, address.bg"},
      {id:"a6",text:"Research schools if you have children"},
    ]},
    {title:"1 month before",emoji:"🗓️",items:[
      {id:"b1",text:"Book Airbnb or serviced apartment for first 2–4 weeks"},
      {id:"b2",text:"Sort out pet travel paperwork if applicable"},
      {id:"b3",text:"Arrange shipping or sell/donate what you're leaving behind"},
      {id:"b4",text:"Notify your bank about the move — set up international transfers"},
      {id:"b5",text:"Download useful apps: Bolt, Yandex Go, Sofia Traffic, Google Translate"},
    ]},
    {title:"First week in Bulgaria",emoji:"🏁",items:[
      {id:"c1",text:"Get a Bulgarian SIM card — A1, Yettel, or Vivacom"},
      {id:"c2",text:"Visit Migration Directorate to register EU right of residence",euOnly:true},
      {id:"c3",text:"Start temporary residence permit application at Migration Directorate",nonEU:true},
      {id:"c4",text:"Open a Bulgarian bank account — DSK or UniCredit"},
      {id:"c5",text:"Find a long-term apartment and sign rental contract"},
      {id:"c6",text:"Visit local supermarket — LIDL, Kaufland, Fantastico"},
    ]},
    {title:"First month",emoji:"🌱",items:[
      {id:"d1",text:"Register with a local GP (general practitioner)"},
      {id:"d2",text:"Register for NHIF Bulgarian public health insurance"},
      {id:"d3",text:"Register your EOOD if you are self-employed / freelancer"},
      {id:"d4",text:"Hire a Bulgarian accountant — €75–150/month, essential"},
      {id:"d5",text:"Exchange your driving licence for a Bulgarian one"},
      {id:"d6",text:"Connect utilities and set up internet in your apartment"},
    ]},
  ]
  const allItems=phases.flatMap(p=>p.items.filter(i=>{if(i.euOnly&&nat!=="eu")return false;if(i.nonEU&&nat!=="noneu")return false;return true}))
  const done=allItems.filter(i=>checked[i.id]).length
  const pct=Math.round(done/allItems.length*100)||0
  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["eu","🇪🇺 EU/EEA citizen"],["noneu","🌍 Non-EU citizen"]].map(([k,l])=>(
          <button key={k} onClick={()=>setNat(k)} style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${nat===k?C.primary:C.border}`,background:nat===k?C.primaryLight:"transparent",color:nat===k?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:nat===k?600:400}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,background:C.primaryLight,borderRadius:10,padding:"10px 14px"}}>
        <div style={{flex:1,height:6,background:"#c8d4c8",borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:C.primary,borderRadius:3,transition:"width 0.4s"}}/></div>
        <span style={{fontSize:13,fontWeight:600,color:C.primary,flexShrink:0}}>{done}/{allItems.length}</span>
      </div>
      <ToolGate user={user} setView={setView} name="Moving Checklist">
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {phases.map(phase=>(
            <div key={phase.title} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{background:C.page,padding:"9px 14px",fontSize:12,fontWeight:600,color:C.primary}}>{phase.emoji} {phase.title.toUpperCase()}</div>
              <div style={{padding:"6px 14px 10px"}}>
                {phase.items.filter(i=>{if(i.euOnly&&nat!=="eu")return false;if(i.nonEU&&nat!=="noneu")return false;return true}).map(item=>(
                  <label key={item.id} style={{display:"flex",gap:10,padding:"7px 0",cursor:"pointer",borderBottom:`0.5px solid ${C.border}`}}>
                    <input type="checkbox" checked={!!checked[item.id]} onChange={()=>toggle(item.id)} style={{marginTop:2,accentColor:C.primary,flexShrink:0}}/>
                    <span style={{fontSize:13,color:checked[item.id]?C.muted:C.text,textDecoration:checked[item.id]?"line-through":"none",lineHeight:1.5}}>{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ToolGate>
    </div>
  )
}

function PhraseTool(){
  const [cat,setCat]=useState("basics")
  const [q,setQ]=useState("")
  const cats=[{v:"basics",l:"Basics 🗣️"},{v:"bank",l:"Banking 🏦"},{v:"health",l:"Health 🏥"},{v:"transport",l:"Transport 🚌"},{v:"emergency",l:"Emergency 🚨"}]
  const list=PHRASES[cat]||[]
  const filtered=q?Object.values(PHRASES).flat().filter(p=>p.en.toLowerCase().includes(q.toLowerCase())||p.ph.toLowerCase().includes(q.toLowerCase())):list
  return(
    <div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search phrases in English..." style={{width:"100%",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,outline:"none",color:C.text,background:C.page,marginBottom:12,boxSizing:"border-box"}}/>
      {!q&&(
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {cats.map(c=><button key={c.v} onClick={()=>setCat(c.v)} style={{padding:"5px 12px",borderRadius:16,border:`1.5px solid ${cat===c.v?C.primary:C.border}`,background:cat===c.v?C.primaryLight:"transparent",color:cat===c.v?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:cat===c.v?600:400}}>{c.l}</button>)}
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map((p,i)=>(
          <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontSize:18,color:C.primary,fontWeight:600,marginBottom:2}}>{p.bg}</div>
            <div style={{fontSize:12,color:C.accent,fontStyle:"italic",marginBottom:4}}>{p.ph}</div>
            <div style={{fontSize:13,color:C.muted}}>{p.en}</div>
          </div>
        ))}
        {filtered.length===0&&<p style={{color:C.muted,textAlign:"center",padding:"20px",fontSize:14}}>No phrases found.</p>}
      </div>
    </div>
  )
}

// ── City comparison data ─────────────────────────────────────────
const CITY_DATA = {
  sofia:    {name:"Sofia",        flag:"🏛️",mult:1.00,rentBase:850, food:300,transport:80, utilities:120,dining:150,health:50,pop:"1.3M",vibe:"Capital city — best jobs, nightlife, international community"},
  plovdiv:  {name:"Plovdiv",      flag:"🏺",mult:0.75,rentBase:550, food:220,transport:60, utilities:90, dining:110,health:40,pop:"350K",vibe:"Cultural gem — Old Town, Kapana arts district, growing fast"},
  varna:    {name:"Varna",        flag:"🌊",mult:0.85,rentBase:650, food:260,transport:70, utilities:100,dining:130,health:45,pop:"330K",vibe:"Black Sea coast — beach life, tech hub, large expat community"},
  burgas:   {name:"Burgas",       flag:"⚓",mult:0.70,rentBase:500, food:210,transport:60, utilities:90, dining:100,health:40,pop:"220K",vibe:"Southern coast — quieter, port city, gateway to Sozopol"},
  stara:    {name:"Stara Zagora", flag:"🌳",mult:0.60,rentBase:380, food:180,transport:50, utilities:80, dining:90, health:35,pop:"140K",vibe:"Affordable plains city — practical, less expat community"},
  ruse:     {name:"Ruse",         flag:"🌉",mult:0.62,rentBase:380, food:185,transport:50, utilities:80, dining:90, health:35,pop:"130K",vibe:"Little Vienna — Danube views, near Romania border, charming"},
  bansko:   {name:"Bansko",       flag:"🏔️",mult:0.65,rentBase:420, food:200,transport:40, utilities:110,dining:100,health:35,pop:"10K", vibe:"Ski resort town — mountain air, tight-knit expat scene"},
  velingrad:{name:"Velingrad",    flag:"♨️",mult:0.55,rentBase:320, food:170,transport:40, utilities:90, dining:80, health:40,pop:"22K", vibe:"Spa & thermal waters — health tourism, peaceful, very affordable"},
  shumen:   {name:"Shumen",        flag:"🏰",mult:0.43,rentBase:250, food:150,transport:38, utilities:68, dining:68, health:28,pop:"75K", vibe:"Medieval fortress city — university town, growing, affordable"},
  yambol:   {name:"Yambol",        flag:"🌾",mult:0.40,rentBase:220, food:145,transport:36, utilities:65, dining:65, health:26,pop:"70K", vibe:"Thracian plain city — peaceful, very affordable, authentic Bulgaria"},
  sliven:   {name:"Sliven",        flag:"🏔️",mult:0.42,rentBase:235, food:148,transport:37, utilities:67, dining:67, health:28,pop:"80K", vibe:"Balkan Mountain gateway — affordable, historic silk-weaving city"},
}

const TOOLS_LIST=[
  {id:"cost",icon:"💰",label:"Cost of living",desc:"Budget + compare 8 cities"},
  {id:"tax",icon:"📊",label:"Tax calculator",desc:"Net income under Bulgarian tax"},
  {id:"visa",icon:"🛂",label:"Visa checker",desc:"Which visa do you need?"},
  {id:"hood",icon:"🏙️",label:"Neighbourhoods",desc:"Sofia, Plovdiv, Varna areas"},
  {id:"fx",icon:"💱",label:"Currency converter",desc:"EUR to any currency"},
  {id:"checklist",icon:"✅",label:"Moving checklist",desc:"Your personalised plan"},
  {id:"phrases",icon:"🗣️",label:"Bulgarian phrases",desc:"Essential language guide"},
  {id:"divider",divider:true,label:"── PREMIUM TOOLS ──"},
  {id:"docgen",icon:"📄",label:"Document Generator",desc:"AI legal docs in minutes",premium:true},
  {id:"relocate",icon:"🗺️",label:"Relocation Planner",desc:"Your personal moving plan",premium:true},
  {id:"property",icon:"🏠",label:"Property ROI",desc:"Investment calculator",premium:true},
  {id:"deadlines",icon:"📅",label:"Deadline Tracker",desc:"Never miss a renewal",premium:true},
  {id:"hoodmatch",icon:"🏘️",label:"Neighbourhood Match",desc:"Find your perfect area",premium:true},
  {id:"langcoach",icon:"🇧🇬",label:"Language Coach",desc:"Learn Bulgarian with AI",premium:true},
  {id:"budget",icon:"📊",label:"Budget Planner",desc:"Personal finance tracker",premium:true},
]

function ToolsPage({user,setView,trackEvent=()=>{},subscription}){
  const [active,setActive]=useState("cost")
  const tool=TOOLS_LIST.find(t=>t.id===active)
  const render=()=>{
    if(active==="cost")return<CostCalcTool user={user} setView={setView} subscription={subscription}/>
    if(active==="tax")return<TaxCalcTool user={user} setView={setView}/>
    if(active==="visa")return<VisaCheckerTool user={user} setView={setView}/>
    if(active==="hood")return<NeighbourhoodTool user={user} setView={setView} subscription={subscription}/>
    if(active==="fx")return<CurrencyTool/>
    if(active==="checklist")return<ChecklistTool user={user} setView={setView}/>
    if(active==="phrases")return<PhraseTool/>
    if(active==="docgen")return<DocGenerator subscription={subscription} setView={setView}/>
    if(active==="relocate")return<RelocationPlanner subscription={subscription} setView={setView}/>
    if(active==="property")return<PropertyROI subscription={subscription} setView={setView}/>
    if(active==="deadlines")return<DeadlineTrackerTool subscription={subscription} setView={setView}/>
    if(active==="hoodmatch")return<HoodMatcher subscription={subscription} setView={setView}/>
    if(active==="langcoach")return<LangCoach subscription={subscription} setView={setView}/>
    if(active==="budget")return<BudgetPlanner subscription={subscription} setView={setView}/>
  }
  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:"32px 20px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(24px,4vw,38px)",fontWeight:400,margin:"0 0 6px"}}>Expat tools</h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:15,margin:0,fontWeight:300}}>Free interactive tools to plan your life in Bulgaria</p>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"-24px auto 48px",padding:"0 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"min(220px,30vw) 1fr",gap:"clamp(8px,2vw,20px)",alignItems:"start"}}>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            {TOOLS_LIST.map(t=>{
              if(t.divider)return<div key={t.id} style={{padding:"8px 14px",fontSize:10,fontWeight:600,color:C.muted,letterSpacing:"0.06em",borderTop:`1px solid ${C.border}`,marginTop:4}}>{t.label}</div>
              return(
                <button key={t.id} onClick={()=>{setActive(t.id);trackEvent("tool",t.id)}}
                  style={{width:"100%",background:active===t.id?C.primaryLight:"transparent",border:"none",borderLeft:`3px solid ${active===t.id?C.primary:"transparent"}`,padding:"11px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8,transition:"all 0.15s"}}>
                  <span style={{fontSize:16,flexShrink:0}}>{t.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:active===t.id?600:400,color:active===t.id?C.primary:C.text,display:"flex",alignItems:"center",gap:5}}>
                      {t.label}
                      {t.premium&&<span style={{fontSize:9,background:"#fef3c7",color:"#92400e",padding:"1px 5px",borderRadius:5,fontWeight:700}}>PRO</span>}
                    </div>
                    <div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"22px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:24}}>{(tool&&tool.icon)}</span>
              <div>
                <h2 className="serif" style={{fontSize:19,fontWeight:400,color:C.text,margin:0}}>{(tool&&tool.label)}</h2>
                <p style={{fontSize:13,color:C.muted,margin:0}}>{(tool&&tool.desc)}</p>
              </div>
            </div>
            {render()}
          </div>
        </div>
      </div>
    </div>
  )
}


// ── Map locations data ────────────────────────────────────────────
const MAP_LOCATIONS = [
  // Healthcare
  {id:1,city:"sofia",cat:"health",icon:"🏥",name:"Tokuda Hospital",desc:"One of the best private hospitals in Sofia. Many English-speaking specialists.",addr:"51A Nikola Vaptsarov Blvd",phone:"+359 2 403 4000",english:true,lat:42.6636,lng:23.3046},
  {id:2,city:"sofia",cat:"health",icon:"🏥",name:"Acibadem City Clinic",desc:"International standard hospital. English service available.",addr:"2 Georgi Sofiyski Blvd",phone:"+359 2 9159 000",english:true,lat:42.6897,lng:23.3199},
  {id:3,city:"sofia",cat:"health",icon:"🏥",name:"Vita Private Hospital",desc:"Popular with expats. Good emergency department.",addr:"16 Praga St",phone:"+359 2 815 8300",english:true,lat:42.7001,lng:23.3315},
  {id:4,city:"sofia",cat:"health",icon:"💊",name:"Pharmacy Remedium",desc:"Large central pharmacy. Some English-speaking staff.",addr:"2 Sveta Nedelya Sq",phone:"+359 2 980 0111",english:false,lat:42.6971,lng:23.3220},
  // Banking
  {id:5,city:"sofia",cat:"bank",icon:"🏦",name:"DSK Bank — Vitosha",desc:"Most foreigner-friendly branch. English-speaking staff. Opens accounts for expats.",addr:"4 Vitosha Blvd",phone:"+359 2 939 9611",english:true,lat:42.6944,lng:23.3195},
  {id:6,city:"sofia",cat:"bank",icon:"🏦",name:"UniCredit Bulbank Center",desc:"International bank, English staff, great for SWIFT transfers.",addr:"7 Sveta Nedelya Sq",phone:"+359 2 923 2111",english:true,lat:42.6970,lng:23.3225},
  {id:7,city:"sofia",cat:"bank",icon:"🏦",name:"First Investment Bank",desc:"Good mobile banking and competitive fees.",addr:"37 Dragan Tsankov Blvd",phone:"+359 2 817 1100",english:false,lat:42.6718,lng:23.3440},
  // Legal
  {id:8,city:"sofia",cat:"legal",icon:"⚖️",name:"Migration Directorate Sofia",desc:"Register your EU residence here. Go early — bring all documents!",addr:"48 Knyaz Boris I Blvd",phone:"+359 2 982 3340",english:false,lat:42.7127,lng:23.3139},
  {id:9,city:"sofia",cat:"legal",icon:"📋",name:"Sofia Central Notary",desc:"Notary services for expats. Document authentication and apostille.",addr:"17 Tsar Osvoboditel Blvd",phone:"+359 2 986 1177",english:false,lat:42.6988,lng:23.3280},
  {id:10,city:"sofia",cat:"legal",icon:"🏛️",name:"Sofia Registry Agency",desc:"EOOD company registration and commercial register.",addr:"20 Elitsa St",phone:"+359 2 948 6015",english:false,lat:42.7006,lng:23.3389},
  // Coworking
  {id:11,city:"sofia",cat:"work",icon:"💼",name:"Campus X",desc:"Best coworking in Sofia. Used by startups and remote workers. Super fast WiFi.",addr:"1 Alexander Malinov Blvd",phone:"+359 88 888 0011",english:true,lat:42.6541,lng:23.3789},
  {id:12,city:"sofia",cat:"work",icon:"💼",name:"Puzl CowOrKing",desc:"Central coworking space. Great expat community. Meeting rooms available.",addr:"33 William Gladstone St",phone:"+359 2 491 7400",english:true,lat:42.6978,lng:23.3204},
  {id:13,city:"sofia",cat:"work",icon:"💼",name:"Regus Sofia City",desc:"Professional offices and coworking. All-inclusive packages. Good for client meetings.",addr:"67 James Bourchier Blvd",phone:"+359 2 981 0000",english:true,lat:42.6844,lng:23.3165},
  // Sofia Neighborhoods
  {id:14,city:"sofia",cat:"hood",icon:"🏠",name:"Lozenets",desc:"Most popular with expats. Quiet, leafy, great cafes. Rent: €800-1,400/month.",addr:"Lozenets, Sofia",english:true,lat:42.6838,lng:23.3245,city:"sofia"},
  {id:15,city:"sofia",cat:"hood",icon:"🏠",name:"Iztok",desc:"Upscale residential. Embassy area. Large apartments. Very safe.",addr:"Iztok, Sofia",english:true,lat:42.6761,lng:23.3493,city:"sofia"},
  {id:16,city:"sofia",cat:"hood",icon:"🏠",name:"Doctor's Garden",desc:"Most central and premium. Near the park. Best restaurants nearby.",addr:"Doctor's Garden, Sofia",english:true,lat:42.6920,lng:23.3280,city:"sofia"},
  {id:17,city:"sofia",cat:"hood",icon:"🏠",name:"Oborishte",desc:"Great balance of location and price. Very liveable.",addr:"Oborishte, Sofia",english:true,lat:42.6967,lng:23.3348,city:"sofia"},
  {id:18,city:"sofia",cat:"hood",icon:"🏠",name:"Mladost 1",desc:"Modern area. Great metro links. Popular with families. Rent from €700/month.",addr:"Mladost, Sofia",english:true,lat:42.6486,lng:23.3789,city:"sofia"},

  // ── VARNA ──────────────────────────────────────────────────────
  {id:19,cat:"health",icon:"🏥",name:"St. Marina University Hospital",desc:"The main public hospital in Varna. Largest in Northeast Bulgaria. Emergency 24/7.",addr:"1 Hr. Smirnenski Blvd, Varna",phone:"+359 52 978 100",english:false,lat:43.2100,lng:27.9210,city:"varna"},
  {id:20,cat:"health",icon:"🏥",name:"MedVita Varna Private Clinic",desc:"Modern private clinic. English-speaking doctors. Expat-friendly.",addr:"12 Preslav St, Varna",phone:"+359 52 612 345",english:true,lat:43.2150,lng:27.9155,city:"varna"},
  {id:21,cat:"health",icon:"💊",name:"Pharmacy Varna Center",desc:"Large central pharmacy open late. Some English-speaking staff.",addr:"4 Knyaz Boris I Blvd, Varna",phone:"+359 52 600 111",english:false,lat:43.2141,lng:27.9147,city:"varna"},
  {id:22,cat:"bank",icon:"🏦",name:"DSK Bank — Varna Center",desc:"Main Varna branch. English-speaking staff. Opens expat accounts.",addr:"8 Knyaz Boris I Blvd, Varna",phone:"+359 52 660 200",english:true,lat:43.2138,lng:27.9152,city:"varna"},
  {id:23,cat:"bank",icon:"🏦",name:"UniCredit Bulbank Varna",desc:"International bank. Great for SWIFT transfers and foreign currencies.",addr:"2 Slivnitsa Blvd, Varna",phone:"+359 52 688 888",english:true,lat:43.2144,lng:27.9140,city:"varna"},
  {id:24,cat:"legal",icon:"⚖️",name:"Migration Directorate Varna",desc:"Register your residence here. Arrive early. Queue can be long.",addr:"76 Vladislav Varnenchik Blvd, Varna",phone:"+359 52 730 228",english:false,lat:43.2180,lng:27.8950,city:"varna"},
  {id:25,cat:"work",icon:"💼",name:"Coworking Hub Varna",desc:"Modern coworking space. Fast WiFi. Great sea view. Remote worker favourite.",addr:"33 Osmi Primorski Polk Blvd, Varna",phone:"+359 52 999 123",english:true,lat:43.2141,lng:27.9160,city:"varna"},
  {id:26,cat:"hood",icon:"🏠",name:"Varna Sea Garden Area",desc:"Most desirable neighbourhood. Walking distance to beach & park. Expensive but worth it.",addr:"Sea Garden, Varna",english:true,lat:43.2139,lng:27.9242,city:"varna"},
  {id:27,cat:"hood",icon:"🏠",name:"Primorski (Varna Center)",desc:"Upscale central neighbourhood. Great cafes, restaurants, sea views.",addr:"Primorski, Varna",english:true,lat:43.2090,lng:27.9200,city:"varna"},

  // ── PLOVDIV ────────────────────────────────────────────────────
  {id:28,cat:"health",icon:"🏥",name:"UMBAL St. George Hospital",desc:"Main university hospital in Plovdiv. Emergency department 24/7.",addr:"66 Peshtersko Shosse, Plovdiv",phone:"+359 32 602 930",english:false,lat:42.1490,lng:24.7490,city:"plovdiv"},
  {id:29,cat:"health",icon:"🏥",name:"Pulmed Private Hospital",desc:"Modern private hospital. English-speaking specialists available.",addr:"5 Byala Cherkva St, Plovdiv",phone:"+359 32 943 000",english:true,lat:42.1420,lng:24.7500,city:"plovdiv"},
  {id:30,cat:"bank",icon:"🏦",name:"DSK Bank — Plovdiv Main",desc:"Central Plovdiv branch. Expat accounts. English-speaking staff.",addr:"2 Rayko Daskalov St, Plovdiv",phone:"+359 32 260 000",english:true,lat:43.1430,lng:24.7500,city:"plovdiv"},
  {id:31,cat:"bank",icon:"🏦",name:"UniCredit Bulbank Plovdiv",desc:"International bank. Good for international transfers.",addr:"4 Ivan Vazov St, Plovdiv",phone:"+359 32 955 000",english:true,lat:42.1420,lng:24.7490,city:"plovdiv"},
  {id:32,cat:"legal",icon:"⚖️",name:"Migration Directorate Plovdiv",desc:"EU residence registration. Bring passport, rental contract and photos.",addr:"2 Ekzarh Iosif St, Plovdiv",phone:"+359 32 629 811",english:false,lat:42.1390,lng:24.7540,city:"plovdiv"},
  {id:33,cat:"hood",icon:"🏛️",name:"Plovdiv Old Town (Stari Grad)",desc:"UNESCO heritage area. Cobblestone streets, Roman amphitheatre. Most charming area.",addr:"Old Town, Plovdiv",english:true,lat:42.1440,lng:24.7510,city:"plovdiv"},
  {id:34,cat:"hood",icon:"🎨",name:"Kapana Creative District",desc:"Trendy arts quarter. Great cafes, galleries, restaurants. Popular with digital nomads.",addr:"Kapana, Plovdiv",english:true,lat:42.1410,lng:24.7450,city:"plovdiv"},
  {id:35,cat:"work",icon:"💼",name:"Kapana Coworking Plovdiv",desc:"Great coworking in the creative district. Events, community, fast WiFi.",addr:"11 Nektariya St, Plovdiv",phone:"+359 88 700 7007",english:true,lat:42.1415,lng:24.7455,city:"plovdiv"},

  // ── BURGAS ─────────────────────────────────────────────────────
  {id:36,cat:"health",icon:"🏥",name:"MBAL Burgas Hospital",desc:"Main Burgas hospital. Emergency services. Good cardiology department.",addr:"73 Stefan Stambolov St, Burgas",phone:"+359 56 813 000",english:false,lat:42.5070,lng:27.4670,city:"burgas"},
  {id:37,cat:"bank",icon:"🏦",name:"DSK Bank — Burgas Center",desc:"Main Burgas branch. Good service for expats and seasonal workers.",addr:"3 Aleksandrovska St, Burgas",phone:"+359 56 866 200",english:true,lat:42.5048,lng:27.4626,city:"burgas"},
  {id:38,cat:"legal",icon:"⚖️",name:"Migration Directorate Burgas",desc:"Residence registration for Burgas region. Includes Black Sea coastal areas.",addr:"1 Slavyanska St, Burgas",phone:"+359 56 894 470",english:false,lat:42.5010,lng:27.4580,city:"burgas"},
  {id:39,cat:"hood",icon:"🌊",name:"Burgas Sea Garden",desc:"Beautiful park along the seafront. Best walking and running area. Near beach.",addr:"Sea Garden, Burgas",english:true,lat:42.5000,lng:27.4700,city:"burgas"},
  {id:40,cat:"hood",icon:"🏠",name:"Center Burgas",desc:"City center. Pedestrian zone, restaurants, bars. Good for short to mid-term stays.",addr:"Aleksandrovska St, Burgas",english:true,lat:42.5048,lng:27.4626,city:"burgas"},

  // ── STARA ZAGORA ───────────────────────────────────────────────
  {id:41,cat:"health",icon:"🏥",name:"UMBAL Prof. Dr. Stoyan Kirkovich",desc:"University hospital Stara Zagora. Full emergency services.",addr:"2 Ivan Armeyski St, Stara Zagora",phone:"+359 42 664 400",english:false,lat:42.4260,lng:25.6280,city:"stara_zagora"},
  {id:42,cat:"bank",icon:"🏦",name:"DSK Bank — Stara Zagora",desc:"Main branch. Standard services for expats.",addr:"61 General Gurko St, Stara Zagora",phone:"+359 42 690 100",english:false,lat:42.4278,lng:25.6344,city:"stara_zagora"},
  {id:43,cat:"legal",icon:"⚖️",name:"Migration Directorate Stara Zagora",desc:"Residence registration for Stara Zagora region.",addr:"109 Tsar Simeon Veliki Blvd, Stara Zagora",phone:"+359 42 609 800",english:false,lat:42.4290,lng:25.6370,city:"stara_zagora"},
  {id:44,cat:"hood",icon:"🌳",name:"Stara Zagora Center",desc:"City of linden trees. Well-planned streets, good quality of life, affordable.",addr:"Center, Stara Zagora",english:false,lat:42.4278,lng:25.6344,city:"stara_zagora"},

  // ── SUNNY BEACH ────────────────────────────────────────────────
  {id:45,cat:"health",icon:"🏥",name:"Medical Center Sunny Beach",desc:"Tourist medical center. English-speaking. Open all summer season.",addr:"Sunny Beach Resort, Nesebar",phone:"+359 554 22 123",english:true,lat:42.6965,lng:27.7105,city:"sunny_beach"},
  {id:46,cat:"bank",icon:"🏦",name:"ATM Zone — Sunny Beach",desc:"Multiple ATMs near main street. Use Wise/Revolut card to avoid fees.",addr:"Main Street, Sunny Beach",english:true,lat:42.6960,lng:27.7107,city:"sunny_beach"},
  {id:47,cat:"hood",icon:"🌴",name:"Sunny Beach North",desc:"Quieter, more residential end of the resort. Better value than South.",addr:"North End, Sunny Beach",english:true,lat:42.7000,lng:27.7090,city:"sunny_beach"},
  {id:48,cat:"hood",icon:"🏖️",name:"Sunny Beach South",desc:"Most lively part of the resort. Restaurants, clubs, beach bars.",addr:"South End, Sunny Beach",english:true,lat:42.6920,lng:27.7120,city:"sunny_beach"},

  // ── NESSEBAR ──────────────────────────────────────────────────
  {id:49,cat:"hood",icon:"🏛️",name:"Nessebar Old Town (UNESCO)",desc:"Ancient city on a peninsula. UNESCO World Heritage. One of Bulgaria's gems.",addr:"Old Town, Nessebar",english:true,lat:42.6597,lng:27.7355,city:"nessebar"},
  {id:50,cat:"health",icon:"🏥",name:"Medical Center Nessebar",desc:"Year-round medical center serving Nessebar and surroundings.",addr:"Nessebar Port Area",phone:"+359 554 46 500",english:true,lat:42.6600,lng:27.7340,city:"nessebar"},
  {id:51,cat:"hood",icon:"⚓",name:"Nessebar New Town",desc:"Modern residential area next to the old town. Quieter, more local life.",addr:"New Nessebar",english:false,lat:42.6620,lng:27.7300,city:"nessebar"},

  // ── GOLDEN SANDS ──────────────────────────────────────────────
  {id:52,cat:"health",icon:"🏥",name:"Medical Center Golden Sands",desc:"Summer tourist medical center. English-speaking. Open June-September.",addr:"Golden Sands Resort, Varna",phone:"+359 52 389 100",english:true,lat:43.2817,lng:28.0395,city:"golden_sands"},
  {id:53,cat:"bank",icon:"🏦",name:"ATMs Golden Sands Resort",desc:"Multiple ATMs throughout the resort. Best to use Revolut/Wise to avoid fees.",addr:"Main Alley, Golden Sands",english:true,lat:43.2810,lng:28.0400,city:"golden_sands"},
  {id:54,cat:"hood",icon:"🌟",name:"Golden Sands Beach",desc:"One of Bulgaria's best beaches. 4km of fine sand. Very popular with EU tourists.",addr:"Golden Sands, Varna",english:true,lat:43.2817,lng:28.0400,city:"golden_sands"},

  // ── RUSE ──────────────────────────────────────────────────────
  {id:55,cat:"health",icon:"🏥",name:"UMBAL Ruse Hospital",desc:"Main university hospital for Ruse. Emergency department 24/7.",addr:"2 Nezavisimost St, Ruse",phone:"+359 82 888 300",english:false,lat:43.8480,lng:25.9570,city:"ruse"},
  {id:56,cat:"bank",icon:"🏦",name:"DSK Bank — Ruse Center",desc:"Main Ruse branch. Good for expats working in the Danube region.",addr:"6 Svoboda Square, Ruse",phone:"+359 82 825 050",english:false,lat:43.8490,lng:25.9530,city:"ruse"},
  {id:57,cat:"legal",icon:"⚖️",name:"Migration Directorate Ruse",desc:"Residence registration for Ruse region. Near the Danube and Romanian border.",addr:"12 Konstantin Fotinov St, Ruse",phone:"+359 82 822 120",english:false,lat:43.8485,lng:25.9515,city:"ruse"},
  {id:58,cat:"hood",icon:"🌉",name:"Ruse City Center (Freedom Square)",desc:"Beautiful Baroque architecture. Called 'Little Vienna'. Great cafes, river views.",addr:"Svoboda Square, Ruse",english:true,lat:43.8485,lng:25.9533,city:"ruse"},
  {id:59,cat:"hood",icon:"🚢",name:"Ruse Danube Riverfront",desc:"Scenic Danube promenade. Border city to Romania. Growing expat community.",addr:"Riverside, Ruse",english:true,lat:43.8500,lng:25.9540,city:"ruse"},

  // ── SLIVEN ─────────────────────────────────────────────────────
  {id:60,cat:"health",icon:"🏥",name:"MBAL Sliven Hospital",desc:"Main hospital for Sliven region. Emergency services 24/7.",addr:"1 Hristo Botev Blvd, Sliven",phone:"+359 44 622 260",english:false,lat:42.6780,lng:26.3150,city:"sliven"},
  {id:61,cat:"bank",icon:"🏦",name:"DSK Bank — Sliven",desc:"Main branch. Standard expat banking services.",addr:"2 Tsar Osvoboditel Sq, Sliven",phone:"+359 44 620 100",english:false,lat:42.6833,lng:26.3167,city:"sliven"},
  {id:62,cat:"legal",icon:"⚖️",name:"Migration Directorate Sliven",desc:"Residence registration for Sliven region.",addr:"2 Gen. Skobelev Blvd, Sliven",phone:"+359 44 628 100",english:false,lat:42.6850,lng:26.3200,city:"sliven"},
  {id:63,cat:"hood",icon:"🏔️",name:"Sliven Center",desc:"City beneath the Balkan Mountains. Known for Karandila Peak and textile history. Affordable living.",addr:"Center, Sliven",english:false,lat:42.6833,lng:26.3167,city:"sliven"},

  // ── SHUMEN ─────────────────────────────────────────────────────
  {id:64,cat:"health",icon:"🏥",name:"MBAL Shumen Hospital",desc:"Main hospital for Shumen region. Full emergency and specialist services.",addr:"20 Bulgaria Blvd, Shumen",phone:"+359 54 860 300",english:false,lat:43.2700,lng:26.9200,city:"shumen"},
  {id:65,cat:"bank",icon:"🏦",name:"DSK Bank — Shumen",desc:"Main Shumen branch. Good for expats in Northeast Bulgaria.",addr:"4 Slavyanski Sq, Shumen",phone:"+359 54 800 200",english:false,lat:43.2708,lng:26.9194,city:"shumen"},
  {id:66,cat:"legal",icon:"⚖️",name:"Migration Directorate Shumen",desc:"Residence registration for Shumen region.",addr:"25 Tsar Osvoboditel Blvd, Shumen",phone:"+359 54 830 445",english:false,lat:43.2720,lng:26.9210,city:"shumen"},
  {id:67,cat:"hood",icon:"🏰",name:"Shumen Fortress Area",desc:"Historic city with impressive medieval fortress. Affordable housing. Growing university town.",addr:"Shumen Fortress, Shumen",english:false,lat:43.2708,lng:26.9194,city:"shumen"},

  // ── YAMBOL ─────────────────────────────────────────────────────
  {id:68,cat:"health",icon:"🏥",name:"MBAL Yambol Hospital",desc:"Main hospital for Yambol region. Emergency department available.",addr:"1 Panayot Hitov Blvd, Yambol",phone:"+359 46 685 200",english:false,lat:42.4810,lng:26.5050,city:"yambol"},
  {id:69,cat:"bank",icon:"🏦",name:"DSK Bank — Yambol",desc:"Main Yambol branch for expats.",addr:"7 Georgi Rakovski St, Yambol",phone:"+359 46 660 100",english:false,lat:42.4833,lng:26.5000,city:"yambol"},
  {id:70,cat:"legal",icon:"⚖️",name:"Migration Directorate Yambol",desc:"Residence registration and permits for Yambol region.",addr:"3 Nikolaevska St, Yambol",phone:"+359 46 664 090",english:false,lat:42.4840,lng:26.5015,city:"yambol"},
  {id:71,cat:"hood",icon:"🌾",name:"Yambol Center",desc:"Pleasant Thracian plain city. Very affordable. Good transport links to Sofia, Burgas, Plovdiv.",addr:"Center, Yambol",english:false,lat:42.4833,lng:26.5000,city:"yambol"},

  // ── MONTANA ────────────────────────────────────────────────────
  {id:72,cat:"health",icon:"🏥",name:"MBAL Montana Hospital",desc:"Main hospital for Montana region. Northwest Bulgaria medical centre.",addr:"79 3rd March St, Montana",phone:"+359 96 396 600",english:false,lat:43.4080,lng:23.2260,city:"montana"},
  {id:73,cat:"bank",icon:"🏦",name:"DSK Bank — Montana",desc:"Main branch. Full banking services for expats in Northwest Bulgaria.",addr:"1 Independence Sq, Montana",phone:"+359 96 300 200",english:false,lat:43.4083,lng:23.2250,city:"montana"},
  {id:74,cat:"legal",icon:"⚖️",name:"Migration Directorate Montana",desc:"Residence registration for Montana region (Northwest Bulgaria).",addr:"2 Kiril i Metodii St, Montana",phone:"+359 96 396 811",english:false,lat:43.4090,lng:23.2240,city:"montana"},
  {id:75,cat:"hood",icon:"🌲",name:"Montana Center",desc:"Gateway to Northwest Bulgaria. Near Vratsa Gorge and Belogradchik Rocks. Very affordable living.",addr:"Center, Montana",english:false,lat:43.4083,lng:23.2250,city:"montana"},

  // ── VELINGRAD ──────────────────────────────────────────────────
  {id:76,cat:"health",icon:"🏥",name:"Velingrad Medical Center",desc:"Year-round medical center. Thermal spa town — good balneotherapy services.",addr:"1 Han Presian St, Velingrad",phone:"+359 359 52 301",english:false,lat:42.0270,lng:23.9910,city:"velingrad"},
  {id:77,cat:"health",icon:"♨️",name:"Spa & Wellness Center Velingrad",desc:"World-renowned mineral springs. Many private spa-health clinics welcome foreigners.",addr:"Spa Area, Velingrad",phone:"+359 359 52 400",english:true,lat:42.0250,lng:23.9944,city:"velingrad"},
  {id:78,cat:"bank",icon:"🏦",name:"DSK Bank — Velingrad",desc:"Main branch. Good for retirees and long-term wellness tourists.",addr:"3 Han Asparuh St, Velingrad",phone:"+359 359 52 200",english:false,lat:42.0255,lng:23.9950,city:"velingrad"},
  {id:79,cat:"hood",icon:"🌿",name:"Velingrad Thermal District",desc:"Healing mineral water capital of Bulgaria. Popular with health tourism expats. Many long-term rentals.",addr:"Thermal District, Velingrad",english:true,lat:42.0250,lng:23.9944,city:"velingrad"},
  {id:80,cat:"hood",icon:"🏡",name:"Velingrad Kamenitsa Area",desc:"Quieter residential area near the spa springs. Affordable long-term rentals. Green and peaceful.",addr:"Kamenitsa, Velingrad",english:false,lat:42.0200,lng:23.9900,city:"velingrad"},

  // ── SAINT VLAS (SVETI VLAS) ────────────────────────────────────
  {id:81,cat:"health",icon:"🏥",name:"Medical Center Saint Vlas",desc:"Summer medical clinic. English-speaking during tourist season (June–Sept).",addr:"Sveti Vlas Resort, Nessebar Municipality",phone:"+359 554 68 200",english:true,lat:42.7206,lng:27.7711,city:"sveti_vlas"},
  {id:82,cat:"bank",icon:"🏦",name:"ATMs — Saint Vlas Marina",desc:"ATMs at the marina and main promenade. Use Revolut/Wise to avoid conversion fees.",addr:"Marina, Sveti Vlas",english:true,lat:42.7210,lng:27.7720,city:"sveti_vlas"},
  {id:83,cat:"hood",icon:"⛵",name:"Sveti Vlas Marina",desc:"Upscale coastal resort. Yacht marina. More peaceful than Sunny Beach. Popular with British and Dutch expats.",addr:"Marina, Sveti Vlas",english:true,lat:42.7200,lng:27.7720,city:"sveti_vlas"},
  {id:84,cat:"hood",icon:"🌊",name:"Sveti Vlas Beach",desc:"Beautiful Blue Flag beach. Less crowded than Sunny Beach. Good for families.",addr:"Beach, Sveti Vlas",english:true,lat:42.7190,lng:27.7700,city:"sveti_vlas"},

  // ── POMORIE ────────────────────────────────────────────────────
  {id:85,cat:"health",icon:"🏥",name:"Medical Center Pomorie",desc:"Year-round medical center. Known for salt therapy and mud treatments for health tourists.",addr:"1 Solna St, Pomorie",phone:"+359 596 22 280",english:false,lat:42.5580,lng:27.6410,city:"pomorie"},
  {id:86,cat:"health",icon:"🧂",name:"Pomorie Mud Therapy Center",desc:"Famous therapeutic mud lake. Health tourism destination. Many European health visitors.",addr:"Salt Lake Area, Pomorie",phone:"+359 596 24 500",english:true,lat:42.5560,lng:27.6380,city:"pomorie"},
  {id:87,cat:"bank",icon:"🏦",name:"DSK Bank — Pomorie",desc:"Main branch. Good for seasonal and long-term coastal expats.",addr:"4 Solna St, Pomorie",phone:"+359 596 22 100",english:false,lat:42.5594,lng:27.6428,city:"pomorie"},
  {id:88,cat:"hood",icon:"🧂",name:"Pomorie Old Town Peninsula",desc:"Picturesque old town on a peninsula. Famous salt lake. Quieter alternative to Sunny Beach. Year-round community.",addr:"Old Town, Pomorie",english:true,lat:42.5594,lng:27.6428,city:"pomorie"},
  {id:89,cat:"hood",icon:"🌅",name:"Pomorie Beach Area",desc:"Long sandy beach. Salt flats and flamingos nearby. Popular with expats seeking quiet coastal life.",addr:"Beach Area, Pomorie",english:true,lat:42.5610,lng:27.6450,city:"pomorie"},

  // ══ CAR RENTALS ══════════════════════════════════════════════

  // ── Sofia Car Rentals ──────────────────────────────────────────
  {id:90,cat:"car",icon:"🚗",name:"Europcar — Sofia Airport",desc:"Largest car rental at Sofia Airport. Wide fleet from economy to SUV. Open 24/7. Book online for best price.",addr:"Sofia Airport, Terminal 2",phone:"+359 2 945 9200",english:true,lat:42.6952,lng:23.4314,city:"sofia",url:"https://www.europcar.bg"},
  {id:91,cat:"car",icon:"🚗",name:"Hertz — Sofia Airport",desc:"International brand. Reliable fleet. Good insurance options. Airport shuttle to rental desk.",addr:"Sofia Airport, Terminal 1",phone:"+359 2 945 9222",english:true,lat:42.6948,lng:23.4308,city:"sofia",url:"https://www.hertz.bg"},
  {id:92,cat:"car",icon:"🚗",name:"Sixt — Sofia City Center",desc:"Premium cars including BMW, Mercedes. Downtown pickup convenient for city expats.",addr:"4 Vitosha Blvd, Sofia",phone:"+359 2 946 2220",english:true,lat:42.6944,lng:23.3197,city:"sofia",url:"https://www.sixt.bg"},
  {id:93,cat:"car",icon:"🚗",name:"Avis — Sofia",desc:"Well-known international rental. Good loyalty program. English service.",addr:"5 Arsenalski Blvd, Sofia",phone:"+359 2 927 0088",english:true,lat:42.6820,lng:23.3180,city:"sofia",url:"https://www.avis.bg"},
  {id:94,cat:"car",icon:"🚗",name:"Green Motion — Sofia",desc:"Eco-friendly fleet. Competitive rates. Good for longer rentals. Electric vehicles available.",addr:"Sofia Airport, Terminal 2",phone:"+359 88 800 4444",english:true,lat:42.6955,lng:23.4320,city:"sofia",url:"https://www.greenmotion.com"},

  // ── Varna Car Rentals ──────────────────────────────────────────
  {id:95,cat:"car",icon:"🚗",name:"Europcar — Varna Airport",desc:"At Varna Airport arrivals. Best option for Black Sea road trips. Wide fleet.",addr:"Varna Airport, Aksakovo",phone:"+359 52 500 222",english:true,lat:43.2321,lng:27.8254,city:"varna",url:"https://www.europcar.bg"},
  {id:96,cat:"car",icon:"🚗",name:"Hertz — Varna Center",desc:"City center pickup. Good for exploring Varna, Golden Sands and coastal towns.",addr:"4 Slivnitsa Blvd, Varna",phone:"+359 52 500 333",english:true,lat:43.2141,lng:27.9150,city:"varna",url:"https://www.hertz.bg"},
  {id:97,cat:"car",icon:"🚗",name:"Budget — Varna",desc:"Affordable rates. Good for budget-conscious expats. Economy and compact cars.",addr:"Varna Airport",phone:"+359 52 500 444",english:true,lat:43.2325,lng:27.8260,city:"varna",url:"https://www.budget.bg"},

  // ── Plovdiv Car Rentals ────────────────────────────────────────
  {id:98,cat:"car",icon:"🚗",name:"Europcar — Plovdiv Airport",desc:"At Plovdiv Airport. Good base for exploring the Rhodope Mountains and Thrace.",addr:"Plovdiv Airport, Krumovo",phone:"+359 32 960 200",english:true,lat:42.0678,lng:24.8500,city:"plovdiv",url:"https://www.europcar.bg"},
  {id:99,cat:"car",icon:"🚗",name:"Sixt — Plovdiv Center",desc:"Central Plovdiv pickup. Great for day trips to Bachkovo Monastery, Asenovgrad.",addr:"22 Maria Luisa Blvd, Plovdiv",phone:"+359 32 960 211",english:true,lat:42.1430,lng:24.7490,city:"plovdiv",url:"https://www.sixt.bg"},

  // ── Burgas Car Rentals ─────────────────────────────────────────
  {id:100,cat:"car",icon:"🚗",name:"Europcar — Burgas Airport",desc:"At Burgas Airport. Perfect for exploring the southern Black Sea coast.",addr:"Burgas Airport, Sarafovo",phone:"+359 56 870 200",english:true,lat:42.5699,lng:27.5151,city:"burgas",url:"https://www.europcar.bg"},
  {id:101,cat:"car",icon:"🚗",name:"Hertz — Burgas City",desc:"City center location. Good rates in low season. English service.",addr:"24 Aleksandrovska St, Burgas",phone:"+359 56 870 211",english:true,lat:42.5048,lng:27.4626,city:"burgas",url:"https://www.hertz.bg"},

  // ── Sunny Beach / Nessebar Car Rentals ────────────────────────
  {id:102,cat:"car",icon:"🚗",name:"Sunny Beach Car Rental Hub",desc:"Multiple rental desks in resort. Rates drop significantly after August. Explore Nessebar, Sozopol, Pomorie.",addr:"Main Street, Sunny Beach",phone:"+359 554 42 200",english:true,lat:42.6960,lng:27.7110,city:"sunny_beach",url:"https://www.europcar.bg"},
  {id:103,cat:"car",icon:"🚗",name:"Nessebar Rent a Car",desc:"Local company near Nessebar. Good rates. Can deliver to your hotel.",addr:"New Nessebar, near bus station",phone:"+359 554 46 200",english:true,lat:42.6620,lng:27.7300,city:"nessebar",url:""},

  // ── Saint Vlas Car Rental ──────────────────────────────────────
  {id:104,cat:"car",icon:"🚗",name:"Saint Vlas Rent a Car",desc:"Small local rental. Scooters and small cars. Good for day trips along the coast.",addr:"Marina area, Sveti Vlas",phone:"+359 554 68 300",english:true,lat:43.7210,lng:27.7715,city:"sveti_vlas",url:""},

  // ── Golden Sands Car Rental ────────────────────────────────────
  {id:105,cat:"car",icon:"🚗",name:"Golden Sands Rent a Car",desc:"Located in the resort. Easy access to Varna Airport and northern coast.",addr:"Hotel area, Golden Sands",phone:"+359 52 389 200",english:true,lat:43.2815,lng:28.0405,city:"golden_sands",url:""},

  // ── Ruse Car Rental ────────────────────────────────────────────
  {id:106,cat:"car",icon:"🚗",name:"Europcar — Ruse",desc:"Ruse city center. Great for border crossing to Romania. Day trips to Ivanovo Rock Monastery.",addr:"2 Svoboda Square, Ruse",phone:"+359 82 821 200",english:true,lat:43.8490,lng:25.9535,city:"ruse",url:"https://www.europcar.bg"},

  // ── Velingrad Car Rental ───────────────────────────────────────
  {id:107,cat:"car",icon:"🚗",name:"Velingrad Car Rental",desc:"Local company. Good for Rhodope Mountain exploration. Ski season available.",addr:"3 Svoboda St, Velingrad",phone:"+359 359 54 100",english:false,lat:42.0255,lng:23.9945,city:"velingrad",url:""},

  // ══ JOBS & WORK OPPORTUNITIES ═════════════════════════════════

  // ── Sofia Jobs ────────────────────────────────────────────────
  {id:108,cat:"jobs",icon:"👔",name:"Sutherland Global — Sofia",desc:"Major BPO company. Hires English speakers for customer support roles. No Bulgarian required.",addr:"Business Park Sofia, Mladost",phone:"+359 2 970 4000",english:true,lat:42.6644,lng:23.3797,city:"sofia"},
  {id:109,cat:"jobs",icon:"👔",name:"Concentrix Sofia",desc:"Large BPO center. Multilingual roles — English, French, German, Dutch. Good for expats.",addr:"Business Park Sofia, Mladost",phone:"+359 2 976 5600",english:true,lat:42.6641,lng:23.3790,city:"sofia"},
  {id:110,cat:"jobs",icon:"👔",name:"Software University Sofia",desc:"Hiring English-speaking programming teachers and teaching assistants. IT education sector.",addr:"2 Aleko Borimechkata St, Sofia",phone:"+359 2 437 9370",english:true,lat:42.6938,lng:23.3417,city:"sofia"},
  {id:111,cat:"jobs",icon:"👔",name:"JobTiger — Sofia Recruitment",desc:"Top Bulgarian recruitment agency. English-speaking roles in IT, finance, BPO. Register your CV.",addr:"3 Hristo Belchev St, Sofia",phone:"+359 2 400 6000",english:true,lat:42.6980,lng:23.3270,city:"sofia"},
  {id:112,cat:"jobs",icon:"👔",name:"HP Inc — Sofia Tech Park",desc:"HP has a major centre in Sofia. IT and finance roles for English speakers. Good salaries.",addr:"Sofia Tech Park, Mladost",phone:"+359 2 976 5000",english:true,lat:42.6585,lng:23.3832,city:"sofia"},
  {id:113,cat:"jobs",icon:"👔",name:"Teach English in Sofia",desc:"TEFL/TESOL teaching opportunities. Several private language schools hire native English speakers year-round.",addr:"Center, Sofia",english:true,lat:42.6977,lng:23.3250,city:"sofia"},
  {id:114,cat:"jobs",icon:"👔",name:"Freelance Hub Sofia",desc:"Network of freelancers and remote workers. Events, connections, clients. Join the Expats in Sofia Facebook group.",addr:"Puzl CoWorKing, Sofia",phone:"+359 2 491 7400",english:true,lat:42.6978,lng:23.3204,city:"sofia"},

  // ── Plovdiv Jobs ───────────────────────────────────────────────
  {id:115,cat:"jobs",icon:"👔",name:"Sensata Technologies Plovdiv",desc:"Global tech manufacturer. Engineering and operations roles. English-language workplace.",addr:"Trakia Industrial Zone, Plovdiv",phone:"+359 32 960 500",english:true,lat:42.1100,lng:24.8000,city:"plovdiv"},
  {id:116,cat:"jobs",icon:"👔",name:"Teach English — Plovdiv",desc:"Growing demand for English teachers. Several language academies. Competitive rates for native speakers.",addr:"Center, Plovdiv",english:true,lat:42.1430,lng:24.7480,city:"plovdiv"},
  {id:117,cat:"jobs",icon:"👔",name:"JobTiger Plovdiv Office",desc:"Recruitment agency covering Plovdiv region. IT, manufacturing, BPO opportunities.",addr:"2 Tsar Boris III Obedinitel Blvd, Plovdiv",phone:"+359 32 999 100",english:true,lat:42.1390,lng:24.7510,city:"plovdiv"},
  {id:118,cat:"jobs",icon:"👔",name:"Telus International Plovdiv",desc:"Major BPO. English-language customer support roles. Pays above local average.",addr:"Plovdiv Business Park",phone:"+359 32 888 200",english:true,lat:42.1200,lng:24.7800,city:"plovdiv"},

  // ── Varna Jobs ─────────────────────────────────────────────────
  {id:119,cat:"jobs",icon:"👔",name:"Progress Software Varna",desc:"US software company with large Varna office. Software engineering roles. English workplace.",addr:"4 Musala St, Varna",phone:"+359 52 680 000",english:true,lat:43.2141,lng:27.9160,city:"varna"},
  {id:120,cat:"jobs",icon:"👔",name:"Tourism Jobs Varna",desc:"Hotels, resorts and restaurants hire seasonal and year-round English speakers. Best season: May–October.",addr:"Sea Garden area, Varna",english:true,lat:43.2139,lng:27.9242,city:"varna"},
  {id:121,cat:"jobs",icon:"👔",name:"Teach English Varna",desc:"Language schools actively hire native English speakers. Year-round positions available.",addr:"Center, Varna",english:true,lat:43.2141,lng:27.9147,city:"varna"},

  // ── Burgas Jobs ────────────────────────────────────────────────
  {id:122,cat:"jobs",icon:"👔",name:"Tourism & Hospitality — Burgas",desc:"Hotels, restaurants, tour operators hiring English speakers. Seasonal (May–Oct) and permanent roles.",addr:"Sea Garden, Burgas",english:true,lat:42.5000,lng:27.4700,city:"burgas"},
  {id:123,cat:"jobs",icon:"👔",name:"Teach English — Burgas",desc:"Language centres and private schools hiring English teachers. Competitive local rates.",addr:"Center, Burgas",english:true,lat:42.5048,lng:27.4626,city:"burgas"},

  // ── Sunny Beach / Coastal Jobs ─────────────────────────────────
  {id:124,cat:"jobs",icon:"👔",name:"Resort Jobs — Sunny Beach",desc:"Massive seasonal employment: hotels, bars, animation, water sports, restaurants. May–September. Many EU workers.",addr:"Main Street, Sunny Beach",english:true,lat:42.6960,lng:27.7107,city:"sunny_beach"},
  {id:125,cat:"jobs",icon:"👔",name:"Water Sports Instructor Jobs",desc:"Hire English-speaking instructors for jet ski, diving, windsurfing. Season May–October. Free accommodation often included.",addr:"Beach area, Sunny Beach",english:true,lat:42.6965,lng:27.7115,city:"sunny_beach"},

  // ── Golden Sands Jobs ──────────────────────────────────────────
  {id:126,cat:"jobs",icon:"👔",name:"Hotel Jobs — Golden Sands",desc:"Large 4-5 star hotels hire English speakers for reception, animation, food & beverage. Season: May–October.",addr:"Hotel zone, Golden Sands",english:true,lat:43.2817,lng:28.0395,city:"golden_sands"},

  // ── Velingrad Jobs ─────────────────────────────────────────────
  {id:127,cat:"jobs",icon:"👔",name:"Spa & Wellness Jobs — Velingrad",desc:"Health tourism growing fast. Spa hotels hire English-speaking therapists, receptionists. Year-round positions.",addr:"Spa District, Velingrad",english:true,lat:42.0250,lng:23.9944,city:"velingrad"},

  // ── Ruse Jobs ──────────────────────────────────────────────────
  {id:128,cat:"jobs",icon:"👔",name:"Danube Logistics & Trade Jobs",desc:"Ruse is a major trade hub with Romania. Logistics and transport companies need English speakers.",addr:"Industrial Zone, Ruse",english:true,lat:43.8485,lng:25.9533,city:"ruse"},
  {id:129,cat:"jobs",icon:"👔",name:"Teach English — Ruse",desc:"Strong demand for English teachers. University town. Above-average pay for the region.",addr:"Center, Ruse",english:true,lat:43.8485,lng:25.9533,city:"ruse"},

  // ── Remote Work (all cities) ───────────────────────────────────

  // ══ ART & MUSEUMS ════════════════════════════════════════════════
  {id:131,cat:"art",icon:"🎨",name:"National Gallery — Sofia",desc:"Bulgaria's most important art collection. Stunning building in the Royal Palace. Must-see for culture lovers.",addr:"19 Tsar Osvoboditel Blvd, Sofia",phone:"+359 2 980 0093",english:true,lat:42.6966,lng:23.3310,city:"sofia"},
  {id:132,cat:"art",icon:"🏛️",name:"National Historical Museum",desc:"Largest museum in Bulgaria. Thracian gold, medieval artifacts. Fascinating for all expats.",addr:"16 Vitoshko Lale St, Sofia",phone:"+359 2 955 4280",english:true,lat:42.6474,lng:23.2754,city:"sofia"},
  {id:133,cat:"art",icon:"🎭",name:"National Theatre Ivan Vazov",desc:"Stunning neo-baroque building. Opera, ballet, drama in Bulgarian. Tickets from €5.",addr:"5 Dyakon Ignatiy St, Sofia",phone:"+359 2 811 9219",english:false,lat:42.6958,lng:23.3280,city:"sofia"},
  {id:134,cat:"art",icon:"🏛️",name:"Sofia History Museum",desc:"Housed in a magnificent old mineral baths building. Sofia's history from ancient to modern.",addr:"1 Banski Square, Sofia",phone:"+359 2 989 0000",english:true,lat:42.6971,lng:23.3222,city:"sofia"},
  {id:135,cat:"art",icon:"🎨",name:"Red House — Sofia Art Centre",desc:"Independent contemporary art centre. Exhibitions, performances, events. Expat favourite.",addr:"15 Lyuben Karavelov St, Sofia",phone:"+359 2 988 8188",english:true,lat:42.6901,lng:23.3281,city:"sofia"},
  {id:136,cat:"art",icon:"🏛️",name:"Plovdiv Regional Museum",desc:"Roman, Thracian and Bulgarian antiquities. Great English labelling. In the heart of Old Town.",addr:"1 Saedinenie Square, Plovdiv",phone:"+359 32 624 339",english:true,lat:42.1447,lng:24.7503,city:"plovdiv"},
  {id:137,cat:"art",icon:"🎨",name:"Kapana Art Galleries — Plovdiv",desc:"Cluster of independent galleries in the Kapana creative district. Walk in, always free.",addr:"Kapana District, Plovdiv",english:true,lat:42.1415,lng:24.7455,city:"plovdiv"},
  {id:138,cat:"art",icon:"🏛️",name:"Varna Archaeological Museum",desc:"One of the richest prehistoric gold collections in the world. World-famous Varna Gold.",addr:"41 Maria Luisa Blvd, Varna",phone:"+359 52 681 030",english:true,lat:42.2183,lng:27.9192,city:"varna"},
  {id:139,cat:"art",icon:"🎨",name:"Boris Georgiev City Art Gallery",desc:"Important permanent collection of Bulgarian art. Beautiful garden setting.",addr:"1 Lyuben Karavelov St, Varna",phone:"+359 52 612 215",english:false,lat:42.2154,lng:27.9175,city:"varna"},
  {id:140,cat:"art",icon:"🏛️",name:"Regional Museum of History Burgas",desc:"Fascinating collection covering Burgas region from prehistoric to modern. Free on Sundays.",addr:"21 Aleko Bogoridi St, Burgas",phone:"+359 56 842 345",english:false,lat:42.5050,lng:27.4630,city:"burgas"},

  // ══ DINING ═══════════════════════════════════════════════════════
  {id:141,cat:"dining",icon:"🍽️",name:"Made In Home — Sofia",desc:"Best traditional Bulgarian food in Sofia. Cosy atmosphere. English menu. Book in advance!",addr:"30A Angel Kanchev St, Sofia",phone:"+359 2 951 5050",english:true,lat:42.6932,lng:23.3279,city:"sofia"},
  {id:142,cat:"dining",icon:"🍷",name:"Hadjidraganovite Izbi",desc:"Underground wine cellar restaurant. Authentic Bulgarian cuisine. Romantic atmosphere. Expat favourite.",addr:"29 Asen St, Sofia",phone:"+359 2 952 1327",english:true,lat:42.6994,lng:23.3234,city:"sofia"},
  {id:143,cat:"dining",icon:"🥘",name:"Manastirska Magernitsa",desc:"Traditional monastery-style food. Garden terrace. Best Bulgarian banitsa in the city.",addr:"67 Han Asparuh St, Sofia",phone:"+359 2 980 3083",english:true,lat:42.6904,lng:23.3290,city:"sofia"},
  {id:144,cat:"dining",icon:"🍝",name:"Sense Restaurant — Sofia",desc:"Modern Bulgarian cuisine with a twist. Rooftop view. Perfect for a special evening.",addr:"12 Boris Sarafov St, Sofia",phone:"+359 2 942 9999",english:true,lat:42.6944,lng:23.3221,city:"sofia"},
  {id:145,cat:"dining",icon:"🍽️",name:"Pavaj — Plovdiv Old Town",desc:"Best restaurant in Plovdiv. Set in a beautiful old house in Stari Grad. Book in advance.",addr:"6 Kiril Nektariev St, Plovdiv",phone:"+359 32 632 229",english:true,lat:42.1445,lng:24.7510,city:"plovdiv"},
  {id:146,cat:"dining",icon:"🍷",name:"Hemingway Bar & Restaurant",desc:"Elegant bar-restaurant in Plovdiv center. Great cocktails, international food, English staff.",addr:"21 Knyaz Aleksandar I St, Plovdiv",phone:"+359 32 626 006",english:true,lat:42.1430,lng:24.7487,city:"plovdiv"},
  {id:147,cat:"dining",icon:"🦞",name:"Di Vino Restaurant — Varna",desc:"Best seafood and wine restaurant in Varna. Sea views, fresh Black Sea fish daily.",addr:"10 Kraybrezhna Alley, Varna",phone:"+359 52 611 800",english:true,lat:42.2125,lng:27.9210,city:"varna"},
  {id:148,cat:"dining",icon:"🍽️",name:"Panorama Restaurant Varna",desc:"Spectacular sea view restaurant. Bulgarian and European cuisine. Romantic sunsets.",addr:"31 Slivnitsa Blvd, Varna",phone:"+359 52 687 000",english:true,lat:42.2141,lng:27.9200,city:"varna"},
  {id:149,cat:"dining",icon:"🌊",name:"Windmill Restaurant — Golden Sands",desc:"Traditional Bulgarian fish restaurant. Right on the beach. Fresh catch daily.",addr:"Golden Sands Resort, Varna",phone:"+359 52 389 500",english:true,lat:43.2820,lng:28.0400,city:"golden_sands"},
  {id:150,cat:"dining",icon:"🍽️",name:"Stariyat Chardak — Nessebar",desc:"Traditional Bulgarian restaurant in the old town. Live folk music evenings. Very charming.",addr:"22 Mesembria St, Nessebar",phone:"+359 554 42 160",english:true,lat:42.6597,lng:27.7360,city:"nessebar"},

  // ══ NIGHTLIFE & PARTY ════════════════════════════════════════════
  {id:151,cat:"party",icon:"🎵",name:"Jazzter Club — Sofia",desc:"Best jazz bar in Sofia. Live music Thursday-Saturday. International artists. Great cocktails.",addr:"1B Positano St, Sofia",phone:"+359 88 950 0070",english:true,lat:42.6951,lng:23.3269,city:"sofia"},
  {id:152,cat:"party",icon:"🎉",name:"Yalta Club — Sofia",desc:"Sofia's most famous nightclub. Electronic music, international DJs. Dress code applies.",addr:"20 Tsar Boris III Blvd, Sofia",phone:"+359 2 953 0690",english:true,lat:42.6831,lng:23.3099,city:"sofia"},
  {id:153,cat:"party",icon:"🍺",name:"One More Bar — Sofia",desc:"Legendary expat bar in Sofia. Craft beers, friendly crowd, always busy. Great English service.",addr:"17 Lavele St, Sofia",phone:"+359 2 988 4765",english:true,lat:42.6963,lng:23.3281,city:"sofia"},
  {id:154,cat:"party",icon:"🎸",name:"Hambara Live Club — Sofia",desc:"Best live music venue in Sofia. Rock, blues, jazz — quality acts every night.",addr:"10 Stefan Karadzha St, Sofia",phone:"+359 2 981 4648",english:true,lat:42.6978,lng:23.3282,city:"sofia"},
  {id:155,cat:"party",icon:"🎶",name:"Club Exit — Varna",desc:"Premier club on the Black Sea coast. Top DJs, summer season May-October. Open air.",addr:"Primorski Park, Varna",phone:"+359 52 500 789",english:true,lat:42.2130,lng:27.9240,city:"varna"},
  {id:156,cat:"party",icon:"🌙",name:"Barcode Beach Bar — Sunny Beach",desc:"Most popular beach bar in Sunny Beach. Cocktails, DJ, right on the sand.",addr:"Beach zone, Sunny Beach",english:true,lat:42.6965,lng:27.7120,city:"sunny_beach"},
  {id:157,cat:"party",icon:"🎉",name:"Sands Club — Sunny Beach",desc:"One of Europe's biggest open-air nightclubs. International DJs. Season May-September.",addr:"South End, Sunny Beach",english:true,lat:42.6920,lng:27.7125,city:"sunny_beach"},
  {id:158,cat:"party",icon:"🍷",name:"Kapana Bar District — Plovdiv",desc:"Dozens of bars and cafes in the Kapana creative district. The heart of Plovdiv nightlife.",addr:"Kapana, Plovdiv",english:true,lat:42.1410,lng:24.7455,city:"plovdiv"},
  {id:159,cat:"party",icon:"🎵",name:"Club Lazur — Burgas",desc:"Main nightclub in Burgas. Electronic and pop music. Popular with locals and tourists.",addr:"Seaside Park, Burgas",phone:"+359 56 878 000",english:true,lat:42.4995,lng:27.4710,city:"burgas"},

  // ══ SUMMER ACTIVITIES ════════════════════════════════════════════
  {id:160,cat:"summer",icon:"🏄",name:"Golden Sands Water Sports",desc:"Jet ski, parasailing, windsurfing, banana boat. Instruction available. English-speaking staff.",addr:"Beach, Golden Sands",phone:"+359 52 389 600",english:true,lat:43.2815,lng:28.0395,city:"golden_sands"},
  {id:161,cat:"summer",icon:"🤿",name:"Black Sea Dive Centre — Varna",desc:"PADI certified diving school. Explore Black Sea wrecks and marine life. Beginner to advanced.",addr:"Primorski Park, Varna",phone:"+359 88 720 3344",english:true,lat:43.2139,lng:27.9250,city:"varna"},
  {id:162,cat:"summer",icon:"⛵",name:"Sailing Tours — Varna Marina",desc:"Day and sunset sailing trips on the Black Sea. Private and group options. Skipper provided.",addr:"Varna Marina",phone:"+359 52 612 500",english:true,lat:43.2090,lng:27.9130,city:"varna"},
  {id:163,cat:"summer",icon:"🏖️",name:"Arkutino Beach — South Coast",desc:"Pristine unspoilt beach near Ropotamo nature reserve. No crowds. Wild and beautiful.",addr:"Arkutino, Sozopol area",english:true,lat:42.3410,lng:27.7050,city:"burgas"},
  {id:164,cat:"summer",icon:"🚵",name:"Vitosha Mountain Trails — Sofia",desc:"Hiking and mountain biking 15 minutes from Sofia center. Beautiful views, forests, peaks.",addr:"Vitosha Nature Park, Sofia",english:true,lat:42.5936,lng:23.2984,city:"sofia"},
  {id:165,cat:"summer",icon:"🌊",name:"Sozopol Old Town Beach",desc:"Beautiful historic town with stunning beaches. Ancient Greek ruins. Quieter than Sunny Beach.",addr:"Sozopol, Burgas region",english:true,lat:42.4166,lng:27.6968,city:"burgas"},
  {id:166,cat:"summer",icon:"🏕️",name:"Rila Lakes Hiking",desc:"Seven Rila Lakes — one of Bulgaria's most spectacular hikes. Chairlift available. Day trip from Sofia.",addr:"Rila Mountains, near Samokov",english:true,lat:42.1833,lng:23.3167,city:"sofia"},
  {id:167,cat:"summer",icon:"🚣",name:"Kayaking — Arda River",desc:"White water kayaking and rafting in the Rhodope Mountains. Guided tours. Beginners welcome.",addr:"Kardzhali, Rhodope Mountains",phone:"+359 88 830 4400",english:true,lat:41.6389,lng:25.3781,city:"plovdiv"},

  // ══ WINTER ACTIVITIES ════════════════════════════════════════════
  {id:168,cat:"winter",icon:"⛷️",name:"Bansko Ski Resort",desc:"Bulgaria's premier ski resort. 75km of pistes, modern gondola, ski season Dec-April. Excellent value vs Alps.",addr:"Bansko, Pirin Mountains",phone:"+359 749 88691",english:true,lat:41.8305,lng:23.4906,city:"sofia"},
  {id:169,cat:"winter",icon:"⛷️",name:"Borovets Ski Resort",desc:"Oldest ski resort in Bulgaria. Close to Sofia (73km). Good for beginners and families. Budget-friendly.",addr:"Borovets, Rila Mountains",phone:"+359 7508 2383",english:true,lat:42.2630,lng:23.5966,city:"sofia"},
  {id:170,cat:"winter",icon:"⛷️",name:"Pamporovo Ski Resort",desc:"South Bulgaria's main ski resort. Great for beginners and children. Sunny and warm ski climate.",addr:"Pamporovo, Rhodope Mountains",phone:"+359 3021 8686",english:true,lat:41.6450,lng:24.6833,city:"plovdiv"},
  {id:171,cat:"winter",icon:"🏔️",name:"Vitosha Winter Trails — Sofia",desc:"Snowshoeing and winter hiking on Sofia's mountain. Ski lifts operate. 30 min from city center.",addr:"Vitosha Nature Park, Sofia",english:true,lat:42.5936,lng:23.2984,city:"sofia"},
  {id:172,cat:"winter",icon:"⛷️",name:"Velingrad Ski & Spa",desc:"Combine skiing with thermal spa treatments. Small but charming slopes + world-class mineral waters.",addr:"Velingrad ski area",english:true,lat:42.0350,lng:23.9980,city:"velingrad"},
  {id:173,cat:"winter",icon:"🛷",name:"Bansko Old Town Winter Walk",desc:"Magical cobblestone old town in winter. Traditional mehanas (taverns) with fireplaces. Bansko cheese and wine.",addr:"Old Town, Bansko",english:true,lat:41.8337,lng:23.4883,city:"sofia"},
  {id:174,cat:"winter",icon:"❄️",name:"Plovdiv Winter Festival",desc:"Christmas market and winter events in the pedestrian zone. Ice skating rink. Great atmosphere.",addr:"Knyaz Aleksandar I St, Plovdiv",english:true,lat:42.1430,lng:24.7490,city:"plovdiv"},

  // ══ HOTELS ═══════════════════════════════════════════════════════
  {id:175,cat:"hotel",icon:"🏨",name:"Grand Hotel Millennium Sofia",desc:"5-star luxury in the heart of Sofia. Rooftop bar, spa, pool. Best address for business travelers.",addr:"89B Vitosha Blvd, Sofia",phone:"+359 2 981 6121",english:true,lat:42.6864,lng:23.3189,city:"sofia"},
  {id:176,cat:"hotel",icon:"🏨",name:"Sofia Hotel Balkan (Sheraton)",desc:"Historic 5-star in the center. Opposite Alexander Nevsky Cathedral. Stunning building.",addr:"5 Sveta Nedelya Square, Sofia",phone:"+359 2 981 6541",english:true,lat:42.6971,lng:23.3226,city:"sofia"},
  {id:177,cat:"hotel",icon:"🏡",name:"Sense Hotel Sofia",desc:"Boutique design hotel. Rooftop pool and restaurant. Modern, stylish. Very popular with expats.",addr:"12 Boris Sarafov St, Sofia",phone:"+359 2 942 9900",english:true,lat:42.6944,lng:23.3215,city:"sofia"},
  {id:178,cat:"hotel",icon:"🏨",name:"Trimontium Princess — Plovdiv",desc:"Best 5-star hotel in Plovdiv. Walking distance to Old Town. Great spa and rooftop views.",addr:"2 Kapitan Raicho St, Plovdiv",phone:"+359 32 605 000",english:true,lat:42.1390,lng:24.7480,city:"plovdiv"},
  {id:179,cat:"hotel",icon:"🏨",name:"Grand Hotel Musala Palace — Varna",desc:"Historic luxury hotel in Varna center. Elegant rooms, excellent restaurant.",addr:"3 Musala St, Varna",phone:"+359 52 664 100",english:true,lat:42.2141,lng:27.9148,city:"varna"},
  {id:180,cat:"hotel",icon:"🌊",name:"International Hotel Casino Varna",desc:"Beachfront 5-star. Casino, spa, pools. Best sea view in Varna. Golden Sands area.",addr:"Golden Sands, Varna",phone:"+359 52 388 000",english:true,lat:43.2817,lng:28.0390,city:"varna"},
  {id:181,cat:"hotel",icon:"🏔️",name:"Kempinski Hotel Grand Arena Bansko",desc:"Only 5-star ski-in ski-out hotel in Bulgaria. Luxury mountain resort. World-class spa.",addr:"96 Pirin St, Bansko",phone:"+359 749 88888",english:true,lat:41.8291,lng:23.4882,city:"sofia"},
  {id:182,cat:"hotel",icon:"🌿",name:"Villa Yolanda — Velingrad",desc:"Boutique spa hotel. Direct access to natural mineral pools. Peaceful, romantic setting.",addr:"3 Yavorov St, Velingrad",phone:"+359 359 56 200",english:true,lat:42.0255,lng:23.9940,city:"velingrad"},
  {id:183,cat:"hotel",icon:"🌊",name:"Marina Grand Beach — Golden Sands",desc:"Large beachfront resort. All-inclusive option. Good for families. Right on the sand.",addr:"Golden Sands Resort",phone:"+359 52 389 300",english:true,lat:43.2820,lng:28.0398,city:"golden_sands"},

  // ══ CULTURAL SITES ════════════════════════════════════════════════
  {id:184,cat:"culture",icon:"⛪",name:"Alexander Nevsky Cathedral",desc:"Sofia's iconic Orthodox cathedral. Free entry. One of the largest Orthodox churches in the world.",addr:"Aleksander Nevsky Square, Sofia",english:true,lat:42.6959,lng:23.3318,city:"sofia"},
  {id:185,cat:"culture",icon:"🏛️",name:"Boyana Church (UNESCO)",desc:"UNESCO World Heritage 12th century frescoes. Considered the finest medieval paintings in Europe.",addr:"Boyana, Sofia",phone:"+359 2 959 0939",english:true,lat:42.6327,lng:23.2613,city:"sofia"},
  {id:186,cat:"culture",icon:"🏛️",name:"Rila Monastery (UNESCO)",desc:"Bulgaria's most sacred site. Stunning architecture in the Rila Mountains. Easy 2h day trip from Sofia.",addr:"Rila Monastery, Kyustendil",phone:"+359 7054 2208",english:true,lat:42.1330,lng:23.3411,city:"sofia"},
  {id:187,cat:"culture",icon:"🏟️",name:"Plovdiv Roman Amphitheatre",desc:"Remarkably preserved 2nd century Roman theatre. Still used for concerts and events today.",addr:"Dzhumaya Square, Plovdiv",english:true,lat:42.1453,lng:24.7487,city:"plovdiv"},
  {id:188,cat:"culture",icon:"🕌",name:"Dzhumaya Mosque — Plovdiv",desc:"14th century Ottoman mosque still in use. Remarkable history. Free to visit outside prayer times.",addr:"Dzhumaya Square, Plovdiv",english:true,lat:42.1447,lng:24.7483,city:"plovdiv"},
  {id:189,cat:"culture",icon:"🏛️",name:"Nessebar UNESCO Churches",desc:"Ancient city packed with Byzantine churches. UNESCO World Heritage. Walking the peninsula is magical.",addr:"Old Town, Nessebar",english:true,lat:42.6597,lng:27.7355,city:"nessebar"},
  {id:190,cat:"culture",icon:"🏰",name:"Tsarevets Fortress — Veliko Tarnovo",desc:"Magnificent medieval fortress. Sound and light show evenings. Former Bulgarian capital.",addr:"Tsarevets, Veliko Tarnovo",phone:"+359 62 638 841",english:true,lat:43.0845,lng:25.6453,city:"ruse"},
  {id:191,cat:"culture",icon:"🏛️",name:"Thracian Tomb of Kazanlak (UNESCO)",desc:"Beautifully preserved Thracian royal tomb from 4th century BC. UNESCO listed. Near Rose Valley.",addr:"Kazanlak, Stara Zagora region",english:true,lat:42.6154,lng:25.3986,city:"stara_zagora"},
  {id:192,cat:"culture",icon:"🕍",name:"Sofia Synagogue",desc:"Third largest synagogue in Europe. Stunning Moorish architecture. Small museum inside.",addr:"16 Ekzarh Yosif St, Sofia",phone:"+359 2 983 1273",english:true,lat:42.6973,lng:23.3237,city:"sofia"},
  {id:193,cat:"culture",icon:"🛕",name:"Banya Bashi Mosque — Sofia",desc:"16th century mosque in the heart of Sofia. Right next to mineral springs. Unique city landmark.",addr:"1 Banski Square, Sofia",english:true,lat:42.6974,lng:23.3218,city:"sofia"},

  // ══ FESTIVALS & TRADITIONAL EVENTS ═══════════════════════════════
  {id:194,cat:"fest",icon:"🌹",name:"Rose Festival — Kazanlak",desc:"Bulgaria's most famous festival. June. Rose picking, parades, folk costumes. Rose Valley is magical in bloom.",addr:"Kazanlak, Rose Valley",english:true,lat:42.6154,lng:25.3986,city:"stara_zagora"},
  {id:195,cat:"fest",icon:"🎭",name:"Kukeri Fire Festival — Pernik",desc:"Ancient Thracian tradition. January. Men in terrifying monster costumes to scare away evil spirits. Unmissable.",addr:"Pernik, near Sofia",english:true,lat:42.6037,lng:23.0363,city:"sofia"},
  {id:196,cat:"fest",icon:"🎵",name:"Sofia Jazz Festival",desc:"Annual international jazz festival. October-November. Top international and Bulgarian artists. Multiple venues.",addr:"National Palace of Culture, Sofia",phone:"+359 2 916 6300",english:true,lat:42.6842,lng:23.3190,city:"sofia"},
  {id:197,cat:"fest",icon:"🎬",name:"Sofia International Film Festival",desc:"March. Bulgaria's premier film event. International films with English subtitles. Very popular with expats.",addr:"Cinema House, Sofia",phone:"+359 2 986 8969",english:true,lat:42.6950,lng:23.3290,city:"sofia"},
  {id:198,cat:"fest",icon:"🏺",name:"Kapana Fest — Plovdiv",desc:"Creative festival in Plovdiv's arts district. June and September. Crafts, music, food, street art. Free entry.",addr:"Kapana, Plovdiv",english:true,lat:42.1415,lng:24.7455,city:"plovdiv"},
  {id:199,cat:"fest",icon:"🎻",name:"Koprivshtitsa Folk Festival",desc:"Held every 5 years. Most important Bulgarian folk music and dance gathering. Truly unforgettable cultural experience.",addr:"Koprivshtitsa, Sofia region",english:true,lat:42.6372,lng:24.3439,city:"sofia"},
  {id:200,cat:"fest",icon:"🔥",name:"Nestinarstvo Fire Dancing — Bulgarevo",desc:"Ancient ritual. June 3rd. Barefoot fire dancing on burning embers. UNESCO Intangible Heritage. Near Varna.",addr:"Bulgarevo village, Kavarna",english:true,lat:43.4869,lng:28.3208,city:"varna"},
  {id:201,cat:"fest",icon:"🌊",name:"Spirit of Burgas Festival",desc:"Bulgaria's biggest music festival. August. International pop, rock, electronic artists on Black Sea beach.",addr:"Burgas Beach",phone:"+359 56 870 500",english:true,lat:42.4960,lng:27.4780,city:"burgas"},
  {id:202,cat:"fest",icon:"🍷",name:"Wine & Spirits Festival — Sofia",desc:"November. Bulgarian wines, rakiya and spirits. 200+ producers. Held at NDK. Very popular with expats.",addr:"National Palace of Culture, Sofia",english:true,lat:42.6842,lng:23.3190,city:"sofia"},
  {id:203,cat:"fest",icon:"❄️",name:"Surva International Festival — Pernik",desc:"Last weekend of January. Biggest Kukeri/masquerade festival in the Balkans. Spectacular costumes.",addr:"Pernik Arena, Pernik",english:true,lat:42.6037,lng:23.0363,city:"sofia"},

  // ── MORE HOTELS ──────────────────────────────────────────────
  {id:204,cat:"hotel",icon:"🏨",name:"Novotel Sofia",desc:"4-star international chain. Central location, pool, good business facilities. Consistent quality.",addr:"115 Tsarigradsko Shosse, Sofia",phone:"+359 2 489 9111",english:true,lat:42.6693,lng:23.3703,city:"sofia"},
  {id:205,cat:"hotel",icon:"🏡",name:"Art Hotel Sofia",desc:"Boutique design hotel in the center. Individually styled rooms. Excellent breakfast. Popular with expats.",addr:"44 William Gladstone St, Sofia",phone:"+359 2 980 6000",english:true,lat:42.6969,lng:23.3293,city:"sofia"},
  {id:206,cat:"hotel",icon:"🌿",name:"Hill Hotel Sofia",desc:"Peaceful hotel on the edge of Vitosha. Best for nature lovers. Great views, free parking.",addr:"Vladaisko Shosse, Sofia",phone:"+359 2 960 2000",english:true,lat:42.6290,lng:23.2880,city:"sofia"},
  {id:207,cat:"hotel",icon:"🏨",name:"Best Western Premier Plovdiv",desc:"4-star in Plovdiv center. Walking distance to Old Town. Good spa and pool.",addr:"12 Rositsa St, Plovdiv",phone:"+359 32 934 234",english:true,lat:42.1420,lng:24.7470,city:"plovdiv"},
  {id:208,cat:"hotel",icon:"🏡",name:"Hotel Old House — Plovdiv",desc:"Charming boutique hotel in a renovated Renaissance house in the Old Town. Unique and atmospheric.",addr:"21 Kiril Nektariev St, Plovdiv",phone:"+359 32 625 500",english:true,lat:42.1448,lng:24.7510,city:"plovdiv"},
  {id:209,cat:"hotel",icon:"🌊",name:"Hotel Aqua — Varna",desc:"Modern 4-star near the sea garden. Rooftop pool. Great value for the area.",addr:"5 Slaveykov Sq, Varna",phone:"+359 52 688 800",english:true,lat:42.2141,lng:27.9165,city:"varna"},
  {id:210,cat:"hotel",icon:"🏨",name:"Melia Grand Hermitage — Golden Sands",desc:"5-star luxury resort. Private beach, multiple pools, excellent spa. Most prestigious address on the coast.",addr:"Golden Sands Resort",phone:"+359 52 394 300",english:true,lat:43.2825,lng:28.0388,city:"golden_sands"},
  {id:211,cat:"hotel",icon:"🌴",name:"Riu Helios Bay — Sunny Beach",desc:"Large all-inclusive resort. Family-friendly. Beachfront. Good entertainment programme.",addr:"North Sunny Beach",phone:"+359 554 66 000",english:true,lat:42.7010,lng:27.7080,city:"sunny_beach"},
  {id:212,cat:"hotel",icon:"🌊",name:"Hotel Nessebar Bay",desc:"Beautiful boutique hotel overlooking the sea. Perfect base to explore Nessebar Old Town.",addr:"New Nessebar, seafront",phone:"+359 554 42 500",english:true,lat:42.6630,lng:27.7310,city:"nessebar"},
  {id:213,cat:"hotel",icon:"⚓",name:"Bulgaria Hotel Burgas",desc:"Central 4-star in Burgas. Good restaurant, sea views from upper floors. Year-round operation.",addr:"21 Aleksandrovska St, Burgas",phone:"+359 56 842 820",english:true,lat:42.5048,lng:27.4635,city:"burgas"},
  {id:214,cat:"hotel",icon:"🌉",name:"Riga Hotel Ruse",desc:"Classic hotel in central Ruse. Danube views. Great breakfast. Close to all attractions.",addr:"22 Svoboda Square, Ruse",phone:"+359 82 822 671",english:true,lat:42.8487,lng:25.9535,city:"ruse"},
  {id:215,cat:"hotel",icon:"♨️",name:"Olymp Spa Hotel — Velingrad",desc:"4-star spa hotel with mineral pools. Thermal pools, sauna, massages included. Year-round.",addr:"25 Han Presian St, Velingrad",phone:"+359 359 56 388",english:true,lat:42.0260,lng:23.9950,city:"velingrad"},
  {id:216,cat:"hotel",icon:"🏔️",name:"Hotel Banderitsa — Bansko",desc:"Authentic ski hotel in Bansko Old Town. Ski storage, warming fireplace, traditional food.",addr:"4 Banderitsa St, Bansko",phone:"+359 749 88300",english:true,lat:41.8337,lng:23.4885,city:"sofia"},

  // ── MORE CULTURE ───────────────────────────────────────────────
  {id:217,cat:"culture",icon:"🏛️",name:"Ancient Serdica — Sofia",desc:"Roman ruins right under Sofia's streets. Walk through 4th century Rome beneath a modern hotel lobby. Free viewing.",addr:"Largo, Sofia Center",english:true,lat:42.6971,lng:23.3224,city:"sofia"},
  {id:218,cat:"culture",icon:"🕌",name:"Ethnographic Museum Sofia",desc:"Beautiful Royal Palace building. Traditional Bulgarian costumes, crafts and way of life. Essential visit.",addr:"1 Alexander Batenberg Square, Sofia",phone:"+359 2 987 4191",english:true,lat:42.6963,lng:23.3317,city:"sofia"},
  {id:219,cat:"culture",icon:"🏛️",name:"Bachkovo Monastery",desc:"Bulgaria's second most important monastery. 11th century. Stunning frescoes. Beautiful mountain setting near Plovdiv.",addr:"Bachkovo village, Plovdiv region",phone:"+359 3327 2270",english:true,lat:41.9439,lng:24.8578,city:"plovdiv"},
  {id:220,cat:"culture",icon:"🗿",name:"Madara Horseman (UNESCO)",desc:"8th century rock relief carved 23m up a cliff. UNESCO World Heritage. Near Shumen. Extraordinary.",addr:"Madara village, Shumen region",english:true,lat:43.2736,lng:27.1172,city:"shumen"},
  {id:221,cat:"culture",icon:"🏛️",name:"Roman Thermae — Varna",desc:"Largest Roman baths complex in Bulgaria. 2nd-3rd century. Remarkably well preserved. Very atmospheric.",addr:"8 San Stefano St, Varna",phone:"+359 52 600 059",english:true,lat:42.2190,lng:27.9183,city:"varna"},
  {id:222,cat:"culture",icon:"🏰",name:"Belogradchik Fortress",desc:"Dramatic medieval fortress built into spectacular red rock formations. Utterly unique landscape in Northwest Bulgaria.",addr:"Belogradchik, Vidin region",phone:"+359 936 53411",english:true,lat:43.6227,lng:22.6894,city:"montana"},
  {id:223,cat:"culture",icon:"🏛️",name:"Ivanovo Rock Churches (UNESCO)",desc:"Medieval rock-hewn churches in a gorge near Ruse. 14th century frescoes. UNESCO listed. Spectacular setting.",addr:"Ivanovo village, Ruse region",english:true,lat:43.6975,lng:26.0231,city:"ruse"},
  {id:224,cat:"culture",icon:"🏡",name:"Koprivshtitsa Village",desc:"Perfectly preserved Bulgarian Renaissance town. 19th century houses, cobblestones, revolution history. 2h from Sofia.",addr:"Koprivshtitsa, Sofia region",english:true,lat:42.6372,lng:24.3439,city:"sofia"},
  {id:225,cat:"culture",icon:"🕍",name:"National Revival Museum — Plovdiv",desc:"Finest examples of Bulgarian Renaissance architecture. Beautiful courtyard. Rich cultural history.",addr:"2 Dr. Chomakov St, Plovdiv",phone:"+359 32 626 192",english:true,lat:42.1448,lng:24.7508,city:"plovdiv"},
  {id:226,cat:"culture",icon:"🏛️",name:"Thracian Tomb Sveshtari (UNESCO)",desc:"Remarkable Thracian royal tomb from 3rd century BC. Exquisite caryatid figures. UNESCO listed. Near Shumen.",addr:"Sveshtari village, Razgrad region",english:true,lat:43.7014,lng:26.5889,city:"shumen"},
  {id:227,cat:"culture",icon:"⛪",name:"Rila Monastery Museum",desc:"Exceptional collection inside Rila Monastery. Icons, manuscripts, historic artefacts spanning 10 centuries.",addr:"Rila Monastery, Kyustendil",phone:"+359 7054 2208",english:true,lat:42.1330,lng:23.3411,city:"sofia"},
  {id:228,cat:"culture",icon:"🎭",name:"Old Plovdiv House Museums",desc:"Several restored 19th century mansions open as museums. Hindliyan House, Balabanov House — walking the history.",addr:"Old Town, Plovdiv",english:true,lat:42.1445,lng:24.7510,city:"plovdiv"},

  {id:130,cat:"jobs",icon:"🌍",name:"Remote Work — Anywhere in Bulgaria",desc:"10% flat tax makes Bulgaria one of the best countries for remote workers. Register an EOOD and work for any client worldwide.",addr:"Anywhere in Bulgaria",english:true,lat:42.6977,lng:23.3219,city:"sofia"},

  // ══ ART & GALLERIES ═══════════════════════════════════════════
  {id:131,cat:"art",icon:"🎨",name:"National Gallery of Art — Sofia",desc:"Bulgaria's most important art museum. Permanent collection of Bulgarian fine art from the 19th century to present. Free Sundays.",addr:"1 19th February St, Sofia",phone:"+359 2 980 0093",english:true,lat:42.6950,lng:23.3280,city:"sofia"},
  {id:132,cat:"art",icon:"🖼️",name:"Sofia City Art Gallery",desc:"Contemporary Bulgarian and international art. Changing exhibitions. Stunning building in the city center.",addr:"1 Gen. Gurko St, Sofia",phone:"+359 2 987 2181",english:true,lat:42.6974,lng:23.3221,city:"sofia"},
  {id:133,cat:"art",icon:"🎨",name:"ICA — Sofia (Contemporary Art)",desc:"Institute of Contemporary Art. Cutting-edge exhibitions, installations and events. English-language openings.",addr:"4 Shipka St, Sofia",phone:"+359 2 944 1752",english:true,lat:42.6913,lng:23.3383,city:"sofia"},
  {id:134,cat:"art",icon:"🎨",name:"Kapana Art District — Plovdiv",desc:"Plovdiv's creative quarter. Dozens of galleries, studios and street art. Free to explore. Most vibrant art scene in Bulgaria.",addr:"Kapana, Plovdiv",english:true,lat:42.1410,lng:24.7450,city:"plovdiv"},
  {id:135,cat:"art",icon:"🖼️",name:"Art Zone Plovdiv",desc:"Multi-gallery complex in the Old Town. International and Bulgarian contemporary art.",addr:"Old Town, Plovdiv",phone:"+359 32 620 150",english:true,lat:42.1440,lng:24.7510,city:"plovdiv"},
  {id:136,cat:"art",icon:"🎨",name:"Boris Georgiev Gallery — Varna",desc:"Main art gallery of Varna. Impressive collection of fine art. Beautiful sea garden location.",addr:"4 Luybomir Miletich St, Varna",phone:"+359 52 612 551",english:true,lat:43.2139,lng:27.9240,city:"varna"},
  {id:137,cat:"art",icon:"🏺",name:"Ancient Thrace Museum — Stara Zagora",desc:"Unique museum displaying ancient Thracian art, gold treasures and Roman mosaics.",addr:"127 Tsar Simeon Veliki Blvd, Stara Zagora",phone:"+359 42 623 533",english:true,lat:42.4280,lng:25.6350,city:"stara_zagora"},

  // ══ DINING ════════════════════════════════════════════════════
  {id:138,cat:"dining",icon:"🍽️",name:"Hadjidraganov's Houses — Sofia",desc:"Most famous traditional Bulgarian restaurant. Stunning old-Sofia atmosphere. Try the shopska salad and grilled meats. Book in advance!",addr:"34 Kozloduy St, Sofia",phone:"+359 2 931 3511",english:true,lat:42.6960,lng:23.3370,city:"sofia"},
  {id:139,cat:"dining",icon:"🍽️",name:"Made in Home — Sofia",desc:"Cozy homestyle Bulgarian food. Great lunch spot. Very popular with expats. Fresh, seasonal menu.",addr:"30A Pozitano St, Sofia",phone:"+359 2 851 5555",english:true,lat:42.6971,lng:23.3290,city:"sofia"},
  {id:140,cat:"dining",icon:"🍽️",name:"Uno Enoteca — Sofia",desc:"Best wine bar and restaurant in Sofia. Italian-Bulgarian fusion. 400+ wines. Romantic atmosphere.",addr:"18 Rakovski St, Sofia",phone:"+359 88 890 0101",english:true,lat:42.6980,lng:23.3320,city:"sofia"},
  {id:141,cat:"dining",icon:"🍽️",name:"Pavaj Restaurant — Plovdiv",desc:"Traditional Bulgarian cuisine in the Old Town. Terrace with stunning views. Live folk music on weekends.",addr:"Old Town, Plovdiv",phone:"+359 32 260 880",english:true,lat:42.1445,lng:24.7515,city:"plovdiv"},
  {id:142,cat:"dining",icon:"🦞",name:"Morski Club Neptune — Varna",desc:"Best seafood restaurant in Varna. Fresh Black Sea fish and shellfish. Right on the beach.",addr:"Sea Garden, Varna",phone:"+359 52 612 400",english:true,lat:42.2100,lng:27.9245,city:"varna"},
  {id:143,cat:"dining",icon:"🍽️",name:"Old Nessebar Tavern",desc:"Traditional Bulgarian mehana in the ancient city. Grilled specialties and local wines. Stunning sea views.",addr:"Old Town, Nessebar",phone:"+359 554 46 123",english:true,lat:42.6597,lng:27.7355,city:"nessebar"},
  {id:144,cat:"dining",icon:"🍽️",name:"Han Hadji Nikoli — Plovdiv",desc:"18th century caravanserai turned restaurant. Authentic Bulgarian recipes. One of the most beautiful dining spaces in Bulgaria.",addr:"Old Town, Plovdiv",phone:"+359 32 260 325",english:true,lat:42.1438,lng:24.7508,city:"plovdiv"},

  // ══ PARTY & CLUBS ════════════════════════════════════════════
  {id:145,cat:"party",icon:"🎉",name:"Yalta Club — Sofia",desc:"The most famous club in Sofia. Underground, great sound system, international DJs. Open Thursday–Saturday.",addr:"21 Tsar Osvoboditel Blvd, Sofia",phone:"+359 88 820 2030",english:true,lat:42.6980,lng:23.3268,city:"sofia"},
  {id:146,cat:"party",icon:"🎉",name:"One More Bar — Sofia",desc:"Popular cocktail bar and club. Lively atmosphere. Good music mix. Expat favourite.",addr:"66 Vitosha Blvd, Sofia",phone:"+359 88 999 1212",english:true,lat:42.6918,lng:23.3193,city:"sofia"},
  {id:147,cat:"party",icon:"🏖️",name:"Cacao Beach Club — Sunny Beach",desc:"Biggest beach party venue in Bulgaria. International DJs, foam parties. Open May–September. 5,000+ capacity.",addr:"Sunny Beach North, Nessebar",phone:"+359 554 42 300",english:true,lat:42.7000,lng:27.7090,city:"sunny_beach"},
  {id:148,cat:"party",icon:"🎉",name:"Arena Club — Sunny Beach",desc:"Iconic Sunny Beach club. Electronic music, international DJs. The place to be in summer.",addr:"Sunny Beach, Nessebar",phone:"+359 554 42 200",english:true,lat:42.6970,lng:27.7110,city:"sunny_beach"},
  {id:149,cat:"party",icon:"🎉",name:"Exit Club — Varna",desc:"Best club in Varna. Two floors, indoor/outdoor. International and local DJs. Young energetic crowd.",addr:"9 Knyaz Boris I Blvd, Varna",phone:"+359 52 612 900",english:true,lat:42.2140,lng:27.9150,city:"varna"},
  {id:150,cat:"party",icon:"🎉",name:"Copacabana Beach Bar — Varna",desc:"Famous open-air beach bar. Live music, cocktails, stunning sea backdrop. Summer classic.",addr:"Northern Beach, Varna",phone:"+359 52 388 100",english:true,lat:43.2110,lng:27.9230,city:"varna"},

  // ══ FESTIVALS ════════════════════════════════════════════════
  {id:151,cat:"festival",icon:"🎪",name:"Sofia International Film Festival",desc:"Largest film festival in Southeast Europe. March annually. 200+ films from 60 countries. Many events in English.",addr:"Dom na Kinoto, Sofia",phone:"+359 2 986 9669",english:true,lat:42.6968,lng:23.3247,city:"sofia"},
  {id:152,cat:"festival",icon:"🎵",name:"Varna Summer International Music Festival",desc:"Prestigious classical music festival. June–July. World-class performers. Open-air amphitheatre concerts.",addr:"Sea Garden, Varna",phone:"+359 52 612 833",english:true,lat:42.2139,lng:27.9242,city:"varna"},
  {id:153,cat:"festival",icon:"🎪",name:"Opera Open Festival — Plovdiv",desc:"Opera and ballet under the stars in the Roman Amphitheatre. June–July. Spectacular setting. International artists.",addr:"Roman Amphitheatre, Plovdiv",phone:"+359 32 627 654",english:true,lat:42.1440,lng:24.7505,city:"plovdiv"},
  {id:154,cat:"festival",icon:"🌹",name:"Rose Festival — Kazanlak (June)",desc:"Celebrates Bulgaria's famous rose oil. Rose-picking ceremony, parades, folk music. First week of June. Unique experience.",addr:"Kazanlak, Rose Valley",phone:"+359 431 62 846",english:true,lat:42.6192,lng:25.3981,city:"stara_zagora"},
  {id:155,cat:"festival",icon:"🎵",name:"Hills of Rock — Plovdiv",desc:"Bulgaria's biggest rock festival. International headliners. July. Plovdiv Stadium. Camping available.",addr:"Plovdiv Stadium",phone:"+359 32 999 800",english:true,lat:42.1350,lng:24.7500,city:"plovdiv"},
  {id:156,cat:"festival",icon:"🎵",name:"A to Jazz Festival — Sofia",desc:"Premier jazz festival in Bulgaria. October. Multiple city venues. International and local jazz artists.",addr:"Various venues, Sofia",english:true,lat:42.6977,lng:23.3219,city:"sofia"},

  // ══ SUMMER ACTIVITIES ═════════════════════════════════════════
  {id:157,cat:"summer",icon:"🏄",name:"Action Aquapark — Golden Sands",desc:"Largest water park in Bulgaria. 30+ slides, lazy river, wave pool. Open June–September. Great for families.",addr:"Golden Sands Resort, Varna",phone:"+359 52 389 500",english:true,lat:43.2820,lng:28.0410,city:"golden_sands"},
  {id:158,cat:"summer",icon:"🤿",name:"Diving Center — Nessebar",desc:"PADI certified diving school. Discover the Black Sea underwater world. Courses for beginners to advanced.",addr:"Nessebar Port",phone:"+359 554 46 200",english:true,lat:42.6590,lng:27.7340,city:"nessebar"},
  {id:159,cat:"summer",icon:"🏇",name:"Horseback Riding — Sunny Beach",desc:"Beach and countryside horse riding. 1–3 hour excursions. Beautiful Black Sea landscapes. For all levels.",addr:"Sunny Beach South",phone:"+359 88 900 5500",english:true,lat:42.6920,lng:27.7120,city:"sunny_beach"},
  {id:160,cat:"summer",icon:"⛵",name:"Sailing & Boat Tours — Varna",desc:"Day and sunset sailing trips along the Black Sea coast. Visit sea caves and hidden beaches. 4–8 hours.",addr:"Varna Port",phone:"+359 52 612 700",english:true,lat:42.2141,lng:27.9190,city:"varna"},
  {id:161,cat:"summer",icon:"🧗",name:"Rock Climbing — Vratsa Gorge",desc:"Best rock climbing destination in Bulgaria. 500+ routes for all levels. 3 hours from Sofia. Stunning Balkan scenery.",addr:"Vratsa Gorge, Vratsa",phone:"+359 92 662 533",english:true,lat:43.2013,lng:23.5534,city:"sofia"},
  {id:162,cat:"summer",icon:"🚵",name:"Mountain Biking — Vitosha (Sofia)",desc:"Trails for all levels just 15 min from Sofia city center. Bike rentals available. Stunning mountain views.",addr:"Vitosha Mountain, Sofia",english:true,lat:42.5790,lng:23.2813,city:"sofia"},
  {id:163,cat:"summer",icon:"🏖️",name:"Sozopol Beach & Old Town",desc:"Most charming coastal town in Bulgaria. Ancient stone houses, beautiful beaches, great seafood. Must visit.",addr:"Sozopol, Burgas region",english:true,lat:42.4167,lng:27.6981,city:"burgas"},

  // ══ WINTER ACTIVITIES ═════════════════════════════════════════
  {id:164,cat:"winter",icon:"⛷️",name:"Bansko Ski Resort",desc:"Bulgaria's premier ski resort. 75km of pistes, modern gondola, international ski schools. 1,000m–2,600m altitude.",addr:"Bansko, Pirin Mountains",phone:"+359 749 88580",english:true,lat:41.8433,lng:23.5006,city:"sofia"},
  {id:165,cat:"winter",icon:"⛷️",name:"Borovets Ski Resort",desc:"Oldest ski resort in the Balkans. Good for beginners and families. 1.5 hours from Sofia. Very affordable.",addr:"Borovets, Rila Mountains",phone:"+359 7502 3211",english:true,lat:42.2671,lng:23.5967,city:"sofia"},
  {id:166,cat:"winter",icon:"🎿",name:"Pamporovo Ski Resort",desc:"Family-friendly resort in the Rhodopes. Best for beginners and intermediate skiers. Good prices.",addr:"Pamporovo, Rhodope Mountains",phone:"+359 3021 8220",english:true,lat:41.6523,lng:24.7196,city:"plovdiv"},
  {id:167,cat:"winter",icon:"⛷️",name:"Vitosha Ski Area — Sofia",desc:"Ski slope 15 minutes from Sofia city centre. Small but convenient. Night skiing available.",addr:"Vitosha Mountain, Aleko Area",english:true,lat:42.5600,lng:23.2750,city:"sofia"},
  {id:168,cat:"winter",icon:"♨️",name:"Thermal Spa Winter Retreat — Velingrad",desc:"Best winter escape. Outdoor thermal pools in the snow. Most hotels have spa packages. Magical experience.",addr:"Spa District, Velingrad",phone:"+359 359 52 500",english:true,lat:42.0250,lng:23.9944,city:"velingrad"},
  {id:169,cat:"winter",icon:"🛷",name:"Ice Skating — Sofia",desc:"Winter ice rink in the National Palace of Culture complex. Open December–February. Skate rental available.",addr:"NDK, Sofia",phone:"+359 2 916 6369",english:true,lat:42.6878,lng:23.3193,city:"sofia"},

  // ══ HOTELS ═══════════════════════════════════════════════════
  {id:170,cat:"hotel",icon:"🏨",name:"Kempinski Hotel Zografski — Sofia",desc:"5-star. Sofia's most prestigious hotel. Central location, spa, rooftop terrace. Business and luxury travel.",addr:"100 James Bourchier Blvd, Sofia",phone:"+359 2 969 2222",english:true,lat:42.6844,lng:23.3153,city:"sofia"},
  {id:171,cat:"hotel",icon:"🏨",name:"InterContinental Sofia",desc:"5-star. Stunning views over Sofia. Pool, spa, multiple restaurants. Walking distance to everything.",addr:"4 Narodno Sabranie Sq, Sofia",phone:"+359 2 933 5555",english:true,lat:42.6967,lng:23.3300,city:"sofia"},
  {id:172,cat:"hotel",icon:"🏩",name:"Grand Hotel Sofia",desc:"4-star boutique. Elegant central hotel. Piano bar, brasserie, great service. Expat favourite.",addr:"1 Gurko St, Sofia",phone:"+359 2 811 0800",english:true,lat:42.6974,lng:23.3226,city:"sofia"},
  {id:173,cat:"hotel",icon:"🏨",name:"Grand Hotel Varna — Golden Sands",desc:"5-star resort. Directly on the beach. Pools, spa, private beach, multiple restaurants.",addr:"Golden Sands Resort, Varna",phone:"+359 52 389 111",english:true,lat:43.2820,lng:28.0395,city:"golden_sands"},
  {id:174,cat:"hotel",icon:"🏨",name:"Novotel Plovdiv",desc:"4-star. Best hotel in Plovdiv. Outdoor pool, spa. Walking distance to Old Town. Conference facilities.",addr:"2 Zlatyu Boyadjiev St, Plovdiv",phone:"+359 32 934 444",english:true,lat:42.1530,lng:24.7603,city:"plovdiv"},
  {id:175,cat:"hotel",icon:"🏩",name:"Hotel Lion — Bansko",desc:"Boutique ski hotel in Bansko. Spa, indoor pool, ski-in access. Great mountain views.",addr:"8 Gotse Delchev St, Bansko",phone:"+359 749 88888",english:true,lat:41.8400,lng:23.4900,city:"sofia"},
  {id:176,cat:"hotel",icon:"🏨",name:"Melia Grand Hermitage — Golden Sands",desc:"5-star luxury all-inclusive. One of the finest beach resorts in Bulgaria. Direct beach access.",addr:"Golden Sands Resort",phone:"+359 52 389 200",english:true,lat:43.2815,lng:28.0400,city:"golden_sands"},

  // ══ CULTURAL SITES ════════════════════════════════════════════
  {id:177,cat:"cultural",icon:"⛪",name:"Alexander Nevsky Cathedral — Sofia",desc:"Bulgaria's most iconic landmark. Neo-Byzantine masterpiece. Free entry. Crypt museum has superb icon collection.",addr:"Alexander Nevsky Sq, Sofia",english:true,lat:42.6959,lng:23.3320,city:"sofia"},
  {id:178,cat:"cultural",icon:"🏛️",name:"National History Museum — Sofia",desc:"Largest museum in Bulgaria. Thracian gold treasures, medieval art, 700,000+ artifacts. Must-see.",addr:"16 Vitoshko Lale St, Sofia",phone:"+359 2 955 4280",english:true,lat:42.6447,lng:23.2906,city:"sofia"},
  {id:179,cat:"cultural",icon:"⛪",name:"Boyana Church — Sofia (UNESCO)",desc:"UNESCO World Heritage Site. 13th century medieval frescoes of extraordinary beauty. Small but unforgettable.",addr:"1 Boyansko Ezero St, Sofia",phone:"+359 2 959 0939",english:true,lat:42.6406,lng:23.2669,city:"sofia"},
  {id:180,cat:"cultural",icon:"🏟️",name:"Roman Amphitheatre — Plovdiv",desc:"Ancient Roman theatre still used today for concerts and opera. 2,000 years old. Free to view, ticketed shows.",addr:"Old Town, Plovdiv",english:true,lat:42.1440,lng:24.7510,city:"plovdiv"},
  {id:181,cat:"cultural",icon:"🏛️",name:"Rila Monastery (UNESCO)",desc:"The spiritual heart of Bulgaria. Stunning mountain location, extraordinary frescoes. Day trip from Sofia (2 hrs).",addr:"Rila Monastery, Rila Mountain",english:true,lat:42.1325,lng:23.3408,city:"sofia"},
  {id:182,cat:"cultural",icon:"🏺",name:"Varna Archaeological Museum",desc:"One of the finest archaeological museums in Southeast Europe. Home to the world's oldest gold treasure (6,500 years old!).",addr:"41 Maria Luisa Blvd, Varna",phone:"+359 52 681 030",english:true,lat:42.2141,lng:27.9150,city:"varna"},
  {id:183,cat:"cultural",icon:"🏛️",name:"Ancient Nessebar (UNESCO)",desc:"3,000 years of history on a tiny peninsula. Byzantine churches, Roman ruins, medieval town walls. Free entry.",addr:"Old Town, Nessebar",english:true,lat:42.6597,lng:27.7355,city:"nessebar"},

  // ══ TRADITIONAL FESTIVALS ══════════════════════════════════════
  {id:184,cat:"tradfest",icon:"🎭",name:"Kukeri Festival — Pernik (January)",desc:"Ancient pagan ritual to scare away evil spirits. Men in incredible monster costumes. Most spectacular folklore event in Bulgaria. Near Sofia.",addr:"Pernik, near Sofia",english:true,lat:42.6000,lng:23.0330,city:"sofia"},
  {id:185,cat:"tradfest",icon:"🌹",name:"Rose Picking Festival — Kazanlak (June)",desc:"Wake at dawn to pick roses in the valley. Ancient tradition, folk costumes, music. Unique Bulgarian experience.",addr:"Kazanlak, Rose Valley",english:true,lat:42.6192,lng:25.3981,city:"stara_zagora"},
  {id:186,cat:"tradfest",icon:"🎭",name:"National Folklore Festival — Koprivshtitsa",desc:"Held every 5 years (next: 2025). Thousands of performers in traditional costume from every region. Extraordinary event.",addr:"Koprivshtitsa (2h from Sofia)",english:true,lat:42.6348,lng:24.3428,city:"sofia"},
  {id:187,cat:"tradfest",icon:"🎶",name:"Nestinari Fire Dancing — June",desc:"Ancient ritual where barefoot dancers walk on hot embers to folk music and icons. Held in Bulgari and Strandja villages.",addr:"Strandja Mountain villages",english:true,lat:42.1700,lng:27.6500,city:"burgas"},
  {id:188,cat:"tradfest",icon:"🎭",name:"National Costume Festival — Zheravna",desc:"Beautiful 18th century village. Traditional costumes, crafts, music. Summer and autumn events.",addr:"Zheravna Village, Sliven region",english:true,lat:42.8200,lng:26.3000,city:"sliven"},
  {id:189,cat:"tradfest",icon:"🎵",name:"Rozhen Folklore Festival",desc:"Largest Bulgarian folklore gathering in the Rhodope Mountains. Magnificent mountain setting. Bagpipes, traditional dance.",addr:"Rozhen, Rhodopes",english:true,lat:41.7000,lng:24.5000,city:"plovdiv"},

  // ══ WINE TOURISM ══════════════════════════════════════════════
  {id:190,cat:"wine",icon:"🍷",name:"Melnik Wine Town",desc:"Bulgaria's smallest town and biggest wine secret. Ancient wine cellars carved in rock. Broadleaf grape — unique to Bulgaria. Day trip from Sofia (3 hrs).",addr:"Melnik, Blagoevgrad region",english:true,lat:41.5208,lng:23.3942,city:"sofia"},
  {id:191,cat:"wine",icon:"🍷",name:"Villa Yustina Winery — Plovdiv",desc:"Boutique winery 30 min from Plovdiv. Tours and tastings. Thracian Lowlands wines. Excellent Mavrud and Rubin varietals.",addr:"Starosel, near Plovdiv",phone:"+359 32 960 900",english:true,lat:42.3500,lng:24.4500,city:"plovdiv"},
  {id:192,cat:"wine",icon:"🍷",name:"Midalidare Estate — Plovdiv",desc:"Award-winning winery. Wine tourism packages: tours, tastings, vineyard walks, accommodation. Beautiful property.",addr:"Mogilovo village, near Plovdiv",phone:"+359 32 643 200",english:true,lat:42.2500,lng:24.9000,city:"plovdiv"},
  {id:193,cat:"wine",icon:"🍷",name:"Edoardo Miroglio Winery — Elenovo",desc:"Italian-owned winery making world-class Bulgarian wines. Tours, tastings, restaurant. Most scenic winery in Bulgaria.",addr:"Elenovo village, Nova Zagora",phone:"+359 457 30400",english:true,lat:42.4200,lng:26.0500,city:"stara_zagora"},
  {id:194,cat:"wine",icon:"🍷",name:"Struma Valley Wine Route",desc:"Driving route through Bulgaria's warmest wine region. Shiroka Melnishka grape unique to the world. Multiple wineries.",addr:"Struma Valley, Southwest Bulgaria",english:true,lat:41.5208,lng:23.3942,city:"sofia"},
  {id:195,cat:"wine",icon:"🍷",name:"Black Sea Wine — Pomorie",desc:"Unique coastal wine tradition. Local wineries produce Dimyat white wine from grapes grown near the sea. Distinct salty character.",addr:"Pomorie Wine Cellar",phone:"+359 596 22 300",english:true,lat:42.5594,lng:27.6428,city:"pomorie"},

  // ══ DISCOTHEQUES ══════════════════════════════════════════════
  {id:196,cat:"disco",icon:"🪩",name:"Mask Club — Sofia",desc:"Long-running Sofia disco. Commercial and house music. Busy weekends. Popular with expats and locals alike.",addr:"7 Hristo Belchev St, Sofia",phone:"+359 88 900 7777",english:true,lat:42.6978,lng:23.3278,city:"sofia"},
  {id:197,cat:"disco",icon:"🪩",name:"Library Club — Sofia",desc:"Unique Sofia club inside a converted building. Eclectic music policy. Art installations. Intellectual crowd.",addr:"2 Vassil Levski Blvd, Sofia",phone:"+359 88 822 2020",english:true,lat:42.6990,lng:23.3312,city:"sofia"},
  {id:198,cat:"disco",icon:"🪩",name:"Sinatra Club — Sofia",desc:"Classic Sofia disco. Good mix of 80s, 90s and current hits. Mature crowd. Popular with expats over 35.",addr:"Sofia Center",phone:"+359 88 811 1199",english:true,lat:42.6962,lng:23.3240,city:"sofia"},
  {id:199,cat:"disco",icon:"🪩",name:"Premier Club — Varna",desc:"Most popular disco in Varna. House and commercial music. Indoor/outdoor sections. Summer nights are legendary.",addr:"Sea Garden, Varna",phone:"+359 52 612 850",english:true,lat:42.2139,lng:27.9238,city:"varna"},
  {id:200,cat:"disco",icon:"🪩",name:"Lazur Disco Club — Sunny Beach",desc:"Classic Sunny Beach disco. Multiple floors, variety of music. Open every night May–October.",addr:"Sunny Beach, Nessebar",phone:"+359 554 42 350",english:true,lat:42.6960,lng:27.7100,city:"sunny_beach"},

  // ══ PIANO BARS ════════════════════════════════════════════════
  {id:201,cat:"piano",icon:"🎹",name:"Piano Bar — Grand Hotel Sofia",desc:"Elegant piano bar in Sofia's prestigious Grand Hotel. Live piano nightly. Excellent cocktails and wine selection. Sophisticated atmosphere.",addr:"1 Gurko St, Sofia",phone:"+359 2 811 0800",english:true,lat:42.6974,lng:23.3226,city:"sofia"},
  {id:202,cat:"piano",icon:"🎹",name:"Brasserie Piano Bar — Sofia",desc:"French-style brasserie with live piano evenings. Good food and cocktails. Romantic setting. Popular with expat professionals.",addr:"Sofia Center",phone:"+359 88 900 2020",english:true,lat:42.6971,lng:23.3252,city:"sofia"},
  {id:203,cat:"piano",icon:"🎹",name:"Art Club Music — Sofia",desc:"Live jazz and piano most evenings. Intimate atmosphere. Great wine list. Cultural events and gallery exhibitions.",addr:"5 Shipka St, Sofia",phone:"+359 2 943 9696",english:true,lat:42.6913,lng:23.3390,city:"sofia"},
  {id:204,cat:"piano",icon:"🎹",name:"Marmalad Piano Restaurant — Plovdiv",desc:"Romantic piano bar and restaurant in Plovdiv. Live pianist Friday–Saturday evenings. Old Town location.",addr:"Old Town, Plovdiv",phone:"+359 32 631 778",english:true,lat:42.1445,lng:24.7508,city:"plovdiv"},
  {id:205,cat:"piano",icon:"🎹",name:"Jazz & Piano Bar — Varna",desc:"The best live music bar in Varna. Regular jazz piano evenings. Good cocktails. Sea Garden location.",addr:"Sea Garden area, Varna",phone:"+359 52 612 660",english:true,lat:42.2141,lng:27.9244,city:"varna"},
  {id:206,cat:"piano",icon:"🎹",name:"Grand Piano Lounge — Bansko",desc:"Cozy ski resort piano bar. Live music, fireplace, premium whisky and cognac. Perfect after skiing.",addr:"Bansko Resort Center",phone:"+359 749 88321",english:true,lat:41.8433,lng:23.4900,city:"sofia"},
]

const MAP_CITIES=[
  {id:"sofia",       label:"Sofia",        icon:"🏛️", lat:42.6977, lng:23.3219, zoom:13},
  {id:"varna",       label:"Varna",        icon:"🌊", lat:43.2141, lng:27.9147, zoom:13},
  {id:"plovdiv",     label:"Plovdiv",      icon:"🏺", lat:42.1354, lng:24.7453, zoom:13},
  {id:"burgas",      label:"Burgas",       icon:"⚓", lat:42.5048, lng:27.4626, zoom:13},
  {id:"stara_zagora",label:"Stara Zagora", icon:"🌳", lat:42.4278, lng:25.6344, zoom:13},
  {id:"sunny_beach", label:"Sunny Beach",  icon:"🏖️", lat:42.6960, lng:27.7107, zoom:14},
  {id:"nessebar",    label:"Nessebar",     icon:"🏛️", lat:42.6597, lng:27.7355, zoom:14},
  {id:"golden_sands",label:"Golden Sands", icon:"✨", lat:43.2817, lng:28.0395, zoom:14},
  {id:"ruse",        label:"Ruse",         icon:"🌉", lat:43.8485, lng:25.9533, zoom:13},
  {id:"sliven",      label:"Sliven",       icon:"🏔️", lat:42.6833, lng:26.3167, zoom:13},
  {id:"shumen",      label:"Shumen",       icon:"🏰", lat:43.2708, lng:26.9194, zoom:13},
  {id:"yambol",      label:"Yambol",       icon:"🌾", lat:42.4833, lng:26.5000, zoom:13},
  {id:"montana",     label:"Montana",      icon:"🌲", lat:43.4083, lng:23.2250, zoom:13},
  {id:"velingrad",   label:"Velingrad",    icon:"♨️", lat:42.0250, lng:23.9944, zoom:13},
  {id:"sveti_vlas",  label:"Saint Vlas",   icon:"⛵", lat:42.7206, lng:27.7711, zoom:14},
  {id:"pomorie",     label:"Pomorie",      icon:"🧂", lat:42.5594, lng:27.6428, zoom:14},
]

const MAP_CATS=[
  {id:"all",     label:"All",              icon:"🗺️", color:"#1e5e3f"},
  {id:"health",  label:"Healthcare",       icon:"🏥", color:"#16a34a"},
  {id:"bank",    label:"Banking",          icon:"🏦", color:"#1d4ed8"},
  {id:"legal",   label:"Legal",            icon:"⚖️", color:"#7c3aed"},
  {id:"work",    label:"Coworking",        icon:"💼", color:"#b8792a"},
  {id:"car",     label:"Car Rental",       icon:"🚗", color:"#dc2626"},
  {id:"jobs",    label:"Work & Jobs",      icon:"👔", color:"#0891b2"},
  {id:"art",     label:"Art & Galleries",  icon:"🎨", color:"#7c3aed"},
  {id:"dining",  label:"Dining",           icon:"🍽️", color:"#b45309"},
  {id:"party",   label:"Party & Clubs",    icon:"🎉", color:"#dc2626"},
  {id:"festival",label:"Festivals",        icon:"🎪", color:"#059669"},
  {id:"summer",  label:"Summer Activities",icon:"🏄", color:"#0891b2"},
  {id:"winter",  label:"Winter Activities",icon:"⛷️", color:"#1d4ed8"},
  {id:"hotel",   label:"Hotels",           icon:"🏨", color:"#6b7280"},
  {id:"cultural",label:"Cultural Sites",   icon:"🏛️", color:"#92400e"},
  {id:"tradfest",label:"Traditional Fests",icon:"🎭", color:"#065f46"},
  {id:"wine",    label:"Wine Tourism",     icon:"🍷", color:"#7c2d12"},
  {id:"disco",   label:"Discotheques",     icon:"🪩", color:"#9333ea"},
  {id:"piano",   label:"Piano Bars",       icon:"🎹", color:"#1f2937"},
  {id:"hood",    label:"Neighbourhoods",   icon:"🏠", color:"#db2777"},
]

// ── MapPage ───────────────────────────────────────────────────────
function MapPage({user,setView,subscription,openCheckout}){
  const mapRef=useRef(null)
  const mapInst=useRef(null)
  const markersRef=useRef([])
  const [city,setCity]=useState("sofia")
  const [filter,setFilter]=useState("all")
  const [selected,setSelected]=useState(null)
  const [loaded,setLoaded]=useState(false)
  const FREE_LIMIT=3
  // Subscription tier access
  const tier = (subscription&&subscription.plan) || "free"
  const isBasic   = tier==="basic"   || tier==="premium"
  const isPremium = tier==="premium"
  // Car rental + jobs = Premium only
  const PREMIUM_CATS = ["car","jobs"]
  // Coworking = Basic+
  const BASIC_CATS   = ["work","dining","party","hotel","summer","winter","art","culture","fest"]

  const canSeeCategory = (cat) => {
    if(PREMIUM_CATS.includes(cat)) return isPremium
    if(BASIC_CATS.includes(cat))   return isBasic
    return true // health, bank, legal, hood always visible
  }

  useEffect(()=>{
    if(!document.getElementById("leaflet-css")){
      const l=document.createElement("link")
      l.id="leaflet-css";l.rel="stylesheet"
      l.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(l)
    }
    if(!window.L){
      const s=document.createElement("script")
      s.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      s.onload=()=>setLoaded(true)
      document.head.appendChild(s)
    } else setLoaded(true)
    return()=>{ if(mapInst.current){mapInst.current.remove();mapInst.current=null} }
  },[])

  useEffect(()=>{
    if(!loaded||!mapRef.current||mapInst.current)return
    const L=window.L
    const map=L.map(mapRef.current,{zoomControl:true}).setView([42.6977,23.3219],13)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map)
    mapInst.current=map
    updateMarkers()
  },[loaded])

  const updateMarkers=()=>{
    const L=window.L
    if(!L||!mapInst.current)return
    markersRef.current.forEach(m=>m.remove())
    markersRef.current=[]
    const allForCity=(filter==="all"?MAP_LOCATIONS:MAP_LOCATIONS.filter(l=>l.cat===filter)).filter(l=>l.city===city||!l.city)
    const visible = allForCity.filter(l => {
      if(!user) return true // will be sliced below
      return canSeeCategory(l.cat)
    })
    const toShow = !user
      ? visible.filter(l=>!PREMIUM_CATS.includes(l.cat)&&!BASIC_CATS.includes(l.cat)).slice(0,FREE_LIMIT)
      : visible
    const catCol=(MAP_CATS.find(c=>c.id===filter)&&MAP_CATS.find(c=>c.id===filter).color)||"#1e5e3f"
    toShow.forEach(loc=>{
      const icon=L.divIcon({
        html:`<div style="width:36px;height:36px;background:${catCol};border:2.5px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.25);cursor:pointer">${loc.icon}</div>`,
        className:"",iconSize:[36,36],iconAnchor:[18,18]
      })
      const marker=L.marker([loc.lat,loc.lng],{icon})
        .addTo(mapInst.current)
        .on("click",()=>setSelected(loc))
      markersRef.current.push(marker)
    })
  }

  useEffect(()=>{
    if(loaded&&mapInst.current){
      const c=MAP_CITIES.find(ci=>ci.id===city)
      if(c)mapInst.current.setView([c.lat,c.lng],c.zoom,{animate:true})
      setSelected(null)
    }
  },[city,loaded])

  useEffect(()=>{ if(loaded)updateMarkers() },[filter,city,loaded,user])

  const allCityLocs=(filter==="all"?MAP_LOCATIONS:MAP_LOCATIONS.filter(l=>l.cat===filter)).filter(l=>l.city===city||!l.city)
  const visible = allCityLocs.filter(l => !user ? (!PREMIUM_CATS.includes(l.cat)&&!BASIC_CATS.includes(l.cat)) : canSeeCategory(l.cat))
  const sidebarList = !user ? visible.slice(0,FREE_LIMIT) : visible

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:"28px 20px 36px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(22px,4vw,36px)",fontWeight:400,margin:"0 0 6px"}}>📍 BGexpats Map</h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:15,margin:0,fontWeight:300}}>Find hospitals, banks, legal offices, coworking and best neighbourhoods in Sofia</p>
        </div>
      </div>

      {/* City selector */}
      <div style={{background:C.primaryDark,padding:"10px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:6}}>
          {MAP_CITIES.map(c=>(
            <button key={c.id} onClick={()=>{setCity(c.id);setFilter("all")}}
              style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${city===c.id?"#f0c060":"rgba(255,255,255,0.15)"}`,background:city===c.id?"rgba(240,192,96,0.2)":"rgba(255,255,255,0.06)",color:city===c.id?"#f0c060":"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:12,fontWeight:city===c.id?700:400,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"12px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:8}}>
          {MAP_CATS.map(cat=>{
            const locked = (PREMIUM_CATS.includes(cat.id)&&!isPremium)||(BASIC_CATS.includes(cat.id)&&!isBasic)
            return(
              <button key={cat.id} onClick={()=>{
                if(locked){setFilter(cat.id);setSelected(null)}
                else{setFilter(cat.id);setSelected(null)}
              }}
                style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${filter===cat.id?cat.color:C.border}`,background:filter===cat.id?`${cat.color}15`:"transparent",color:filter===cat.id?cat.color:locked?C.muted:C.text,cursor:"pointer",fontSize:13,fontWeight:filter===cat.id?700:400,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s",opacity:locked?0.65:1,display:"flex",alignItems:"center",gap:5}}>
                {cat.icon} {cat.label}
                {locked&&<span style={{fontSize:10,background:PREMIUM_CATS.includes(cat.id)?"#f0c060":"var(--bg-accent)",color:PREMIUM_CATS.includes(cat.id)?"#1a3a20":"var(--text-accent)",padding:"1px 5px",borderRadius:6,fontWeight:700}}>{PREMIUM_CATS.includes(cat.id)?"PRO":"BASIC"}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Map + Sidebar */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px 20px",display:"grid",gridTemplateColumns:"320px 1fr",gap:16,alignItems:"start"}}>

        {/* Sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>

          {/* Tiered gate banners */}
          {!user&&(
            <div style={{background:C.primary,borderRadius:14,padding:"14px 16px",textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:6}}>🔒</div>
              <p style={{color:"#fff",fontSize:13,fontWeight:600,margin:"0 0 4px"}}>Showing {FREE_LIMIT} of {allCityLocs.length} locations</p>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:12,margin:"0 0 10px"}}>Sign in free for healthcare, banking, legal and neighbourhood pins</p>
              <button onClick={()=>setView("login")} style={{background:"#fff",border:"none",color:C.primary,padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,width:"100%"}}>Sign up free →</button>
            </div>
          )}
          {user&&!isBasic&&(filter==="work")&&(
            <div style={{background:"var(--bg-accent)",border:"1px solid var(--border-accent)",borderRadius:14,padding:"14px 16px",textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:6}}>💼</div>
              <p style={{color:"var(--text-accent)",fontSize:13,fontWeight:600,margin:"0 0 4px"}}>Coworking — Basic subscribers only</p>
              <p style={{color:"var(--text-secondary)",fontSize:12,margin:"0 0 10px"}}>Upgrade to Basic (€3.99/month) to see all coworking spaces</p>
              <button onClick={()=>openCheckout&&openCheckout("basic")} style={{background:"var(--text-accent)",border:"none",color:"#fff",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,width:"100%"}}>Upgrade to Basic →</button>
            </div>
          )}
          {user&&!isPremium&&(PREMIUM_CATS.includes(filter))&&(
            <div style={{background:"#1a0f00",border:"1px solid #f0c06040",borderRadius:14,padding:"14px 16px",textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:6}}>{filter==="car"?"🚗":"👔"}</div>
              <p style={{color:"#f0c060",fontSize:13,fontWeight:700,margin:"0 0 4px"}}>{filter==="car"?"Car Rental":"Jobs & Work"} — Premium only</p>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:12,margin:"0 0 10px"}}>
                {filter==="car"?"18 rental locations across Bulgaria — book instantly":"23 job opportunities across Bulgaria — only resource in English"}
              </p>
              <button onClick={()=>openCheckout&&openCheckout("premium")} style={{background:"linear-gradient(135deg,#f0c060,#e8a020)",border:"none",color:"#1a3a20",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,width:"100%"}}>Upgrade to Premium →</button>
            </div>
          )}

          {/* Selected location detail */}
          {selected&&(
            <div style={{background:C.surface,border:`2px solid ${(MAP_CATS.find(c=>c.id===selected.cat)&&MAP_CATS.find(c=>c.id===selected.cat).color)||C.primary}`,borderRadius:14,padding:"16px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{fontSize:20}}>{selected.icon}</div>
                <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,padding:0,lineHeight:1}}>×</button>
              </div>
              <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:4}}>{selected.name}</div>
              <p style={{fontSize:13,color:C.muted,margin:"0 0 12px",lineHeight:1.55}}>{selected.desc}</p>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <div style={{fontSize:12,color:C.text,display:"flex",gap:6}}><span>📍</span><span>{selected.addr}</span></div>
                {selected.phone&&<div style={{fontSize:12,color:C.text,display:"flex",gap:6}}><span>📞</span><a href={`tel:${selected.phone}`} style={{color:C.primary,textDecoration:"none",fontWeight:600}}>{selected.phone}</a></div>}
                {selected.english&&<div style={{fontSize:12,color:"#16a34a",display:"flex",gap:6,fontWeight:600}}><span>🇬🇧</span><span>English spoken</span></div>}
              </div>
              <div style={{display:"flex",gap:8,marginTop:12}}>
                <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`} target="_blank" rel="noopener noreferrer"
                  style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,background:"#4285F4",color:"#fff",borderRadius:8,padding:"9px",fontSize:12,fontWeight:600,textDecoration:"none"}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  Google Maps
                </a>
                {selected.url&&(
                  <a href={selected.url} target="_blank" rel="noopener noreferrer"
                    style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,background:selected.cat==="car"?"#dc2626":selected.cat==="jobs"?"#0891b2":C.primary,color:"#fff",borderRadius:8,padding:"9px",fontSize:12,fontWeight:600,textDecoration:"none"}}>
                    {selected.cat==="car"?"🚗 Book now":"👔 Apply / Info"}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Location list */}
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`,fontSize:12,fontWeight:600,color:C.muted,letterSpacing:"0.04em"}}>
              {(MAP_CITIES.find(c=>c.id===city)&&MAP_CITIES.find(c=>c.id===city).icon)} {(MAP_CITIES.find(c=>c.id===city)&&MAP_CITIES.find(c=>c.id===city).label).toUpperCase()} — {visible.length} {!user?"(free preview)":isPremium?"(premium)":isBasic?"(basic)":"(free)"}
            </div>
            <div style={{maxHeight:360,overflowY:"auto"}}>
              {sidebarList.map(loc=>(
                <button key={loc.id} onClick={()=>{setSelected(loc);mapInst.current&&mapInst.current.setView([loc.lat,loc.lng],15)}}
                  style={{width:"100%",background:(selected&&selected.id)===loc.id?C.primaryLight:"transparent",border:"none",borderBottom:`1px solid ${C.border}`,padding:"11px 14px",cursor:"pointer",textAlign:"left",display:"flex",gap:10,alignItems:"flex-start",transition:"background 0.15s"}}>
                  <span style={{fontSize:16,flexShrink:0}}>{loc.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{loc.name}</div>
                    <div style={{fontSize:11,color:C.muted}}>{loc.addr}</div>
                    {loc.english&&<div style={{fontSize:10,color:"#16a34a",marginTop:2,fontWeight:600}}>🇬🇧 English spoken</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`,boxShadow:"0 4px 20px rgba(0,0,0,0.08)",position:"sticky",top:80}}>
          <div ref={mapRef} style={{height:"calc(100vh - 220px)",minHeight:500,width:"100%",background:"#e8f0eb"}}/>
          {!loaded&&(
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#e8f0eb",borderRadius:16}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:8,animation:"spin 1s linear infinite",display:"inline-block"}}>🗺️</div>
                <div style={{fontSize:13,color:C.muted}}>Loading map...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


// ── Pricing data ─────────────────────────────────────────────────
const PLANS = {
  free:    { name:"Free",    monthly:0,    yearly:0,    yearlyTotal:0 },
  basic:   { name:"Basic",   monthly:3.99, yearly:2.66, yearlyTotal:31.90 },
  premium: { name:"Premium", monthly:6.49, yearly:4.33, yearlyTotal:51.90 },
}

// ── Pricing Page ─────────────────────────────────────────────────
function PricingPage({user,setView,lang,openCheckout=()=>{}}){
  const [billing,setBilling]=useState("monthly")
  const labels={en:{monthly:"Monthly",yearly:"Yearly",save:"Save 33%",mo:"/month",yr:"/year",getfree:"Get started free",getbasic:"Start Basic",getpremium:"Go Premium",popular:"Most popular",billed:"billed annually",permonth:"/month"},fr:{monthly:"Mensuel",yearly:"Annuel",save:"33% d'économie",mo:"/mois",yr:"/an",getfree:"Commencer gratuitement",getbasic:"Choisir Basic",getpremium:"Choisir Premium",popular:"Le plus populaire",billed:"facturé annuellement",permonth:"/mois"},es:{monthly:"Mensual",yearly:"Anual",save:"Ahorra 33%",mo:"/mes",yr:"/año",getfree:"Empezar gratis",getbasic:"Elegir Basic",getpremium:"Elegir Premium",popular:"El más popular",billed:"facturado anualmente",permonth:"/mes"},de:{monthly:"Monatlich",yearly:"Jährlich",save:"33% sparen",mo:"/Monat",yr:"/Jahr",getfree:"Kostenlos starten",getbasic:"Basic wählen",getpremium:"Premium wählen",popular:"Am beliebtesten",billed:"jährlich abgerechnet",permonth:"/Monat"},nl:{monthly:"Maandelijks",yearly:"Jaarlijks",save:"33% besparen",mo:"/maand",yr:"/jaar",getfree:"Gratis beginnen",getbasic:"Basic kiezen",getpremium:"Premium kiezen",popular:"Meest populair",billed:"jaarlijks gefactureerd",permonth:"/maand"},ru:{monthly:"Ежемесячно",yearly:"Ежегодно",save:"Скидка 33%",mo:"/месяц",yr:"/год",getfree:"Начать бесплатно",getbasic:"Выбрать Basic",getpremium:"Выбрать Premium",popular:"Самый популярный",billed:"оплата ежегодно",permonth:"/месяц"},uk:{monthly:"Щомісячно",yearly:"Щорічно",save:"Знижка 33%",mo:"/місяць",yr:"/рік",getfree:"Почати безкоштовно",getbasic:"Вибрати Basic",getpremium:"Вибрати Premium",popular:"Найпопулярніший",billed:"оплата щорічно",permonth:"/місяць"},tr:{monthly:"Aylık",yearly:"Yıllık",save:"33% tasarruf",mo:"/ay",yr:"/yıl",getfree:"Ücretsiz başla",getbasic:"Basic seç",getpremium:"Premium seç",popular:"En popüler",billed:"yıllık faturalandırılır",permonth:"/ay"},bg:{monthly:"Месечно",yearly:"Годишно",save:"33% отстъпка",mo:"/месец",yr:"/година",getfree:"Започни безплатно",getbasic:"Избери Basic",getpremium:"Избери Premium",popular:"Най-популярен",billed:"таксувано годишно",permonth:"/месец"}}
  const L=labels[lang]||labels.en

  const tiers=[
    {
      id:"free",color:C.surface,border:C.border,nameColor:C.text,subColor:C.muted,btnBg:C.page,btnColor:C.text,btnBorder:C.border,
      features:[
        {ok:true,text:"Basic articles (legal, housing, tax)"},
        {ok:true,text:"5 AI chat questions per day"},
        {ok:true,text:"Quick facts & emergency info"},
        {ok:true,text:"8 languages"},
        {ok:false,text:"Community — post, like, reply"},
        {ok:false,text:"All tools & calculators"},
        {ok:false,text:"Premium guides & templates"},
      ]
    },
    {
      id:"basic",popular:true,color:C.surface,border:C.primary,nameColor:C.text,subColor:C.muted,btnBg:C.primary,btnColor:"#fff",btnBorder:C.primary,
      features:[
        {ok:true,text:"Everything in Free"},
        {ok:true,text:"Full community access"},
        {ok:true,text:"Unlimited AI chat"},
        {ok:true,text:"4 planning tools (Budget, Relocation, Neighbourhood Match, Language Coach)"},
        {ok:true,text:"All map categories (dining, culture, hotels & more)"},
        {ok:true,text:"Weekly newsletter"},
        {ok:false,text:"Premium tools, guides & templates"},
      ]
    },
    {
      id:"premium",color:C.primary,border:C.primaryDark,nameColor:"#fff",subColor:"rgba(255,255,255,0.6)",btnBg:"#f0c060",btnColor:"#1a3a20",btnBorder:"#f0c060",
      features:[
        {ok:true,text:"Everything in Basic",gold:true},
        {ok:true,text:"3 pro tools: Document Generator, Property ROI, Deadline Tracker",gold:true},
        {ok:true,text:"Premium legal & tax guides",gold:true},
        {ok:true,text:"Downloadable PDF templates",gold:true},
        {ok:true,text:"Vetted services directory",gold:true},
        {ok:true,text:"Priority AI — deeper answers",gold:true},
        {ok:true,text:"Verified member badge",gold:true},
        {ok:true,text:"Early access to new features",gold:true},
      ]
    }
  ]

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:"44px 20px 56px",textAlign:"center"}}>
        <h1 className="serif" style={{color:"#fff",fontSize:"clamp(28px,5vw,44px)",fontWeight:400,margin:"0 0 10px"}}>Simple, honest pricing</h1>
        <p style={{color:"rgba(255,255,255,0.75)",fontSize:16,margin:"0 0 28px",fontWeight:300}}>Join thousands of expats navigating life in Bulgaria</p>
        <div style={{display:"inline-flex",background:"rgba(255,255,255,0.12)",borderRadius:30,padding:4,gap:4}}>
          {["monthly","yearly"].map(b=>(
            <button key={b} onClick={()=>setBilling(b)}
              style={{background:billing===b?"#fff":"transparent",border:"none",color:billing===b?C.primary:"rgba(255,255,255,0.8)",padding:"8px 20px",borderRadius:26,cursor:"pointer",fontSize:14,fontWeight:billing===b?600:400,transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}}>
              {b==="monthly"?L.monthly:L.yearly}
              {b==="yearly"&&<span style={{background:"#f0c060",color:"#1a3a20",fontSize:10,padding:"1px 7px",borderRadius:8,fontWeight:700}}>{L.save}</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"-32px auto 48px",padding:"0 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
          {tiers.map(tier=>{
            const plan=PLANS[tier.id]
            const price=billing==="monthly"?plan.monthly:plan.yearly
            const period=billing==="monthly"?L.mo:L.yr
            return(
              <div key={tier.id} style={{background:tier.color,border:`${tier.popular?"2.5px":"1px"} solid ${tier.border}`,borderRadius:20,padding:"28px 24px",position:"relative",boxShadow:tier.popular?"0 8px 32px rgba(30,94,63,0.18)":"0 2px 8px rgba(0,0,0,0.06)"}}>
                {tier.popular&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:C.primary,color:"#fff",fontSize:11,padding:"3px 14px",borderRadius:12,fontWeight:600,whiteSpace:"nowrap"}}>{L.popular}</div>}
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:15,fontWeight:600,color:tier.nameColor,marginBottom:14}}>{plan.name}</div>
                  {price===0?(
                    <div style={{fontSize:32,fontWeight:700,color:tier.nameColor}}>€0</div>
                  ):(
                    <>
                      <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                        <span style={{fontSize:32,fontWeight:700,color:tier.nameColor}}>€{price.toFixed(2)}</span>
                        <span style={{fontSize:13,color:tier.subColor}}>{period}</span>
                      </div>
                      {billing==="yearly"&&plan.yearly>0&&(
                        <div style={{fontSize:12,color:tier.subColor,marginTop:4}}>
                          €{plan.yearlyTotal}/year — {L.billed}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div style={{marginBottom:20}}>
                  {tier.features.map((f,i)=>(
                    <div key={i} style={{display:"flex",gap:8,padding:"5px 0",fontSize:13}}>
                      <span style={{flexShrink:0,fontSize:14,color:f.ok?(tier.id==="premium"?"#f0c060":"#22c55e"):"rgba(150,150,150,0.6)"}}>{f.ok?"✓":"○"}</span>
                      <span style={{color:f.ok?tier.nameColor:(tier.id==="premium"?"rgba(255,255,255,0.35)":C.muted)}}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={()=>tier.id==="free"?setView("home"):openCheckout(tier.id,billing)}
                  style={{width:"100%",background:tier.btnBg,border:`1.5px solid ${tier.btnBorder}`,color:tier.btnColor,padding:"12px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600,transition:"opacity 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.opacity="0.88"}}
                  onMouseLeave={e=>{e.currentTarget.style.opacity="1"}}>
                  {tier.id==="free"?L.getfree:tier.id==="basic"?L.getbasic:L.getpremium}
                </button>
              </div>
            )
          })}
        </div>
        <p style={{textAlign:"center",fontSize:13,color:C.muted,marginTop:20}}>
          All plans include 8 languages. Cancel anytime. Secure payment via Stripe.
        </p>
      </div>
    </div>
  )
}

export default function App(){
  const [view,setView]=useState("home")
  const [installPrompt,setInstallPrompt]=useState(null)
  const [showInstall,setShowInstall]=useState(false)

  useEffect(()=>{
    const handler=e=>{e.preventDefault();setInstallPrompt(e);setShowInstall(true)}
    window.addEventListener('beforeinstallprompt',handler)
    return()=>window.removeEventListener('beforeinstallprompt',handler)
  },[])

  const installApp=async()=>{
    if(!installPrompt)return
    installPrompt.prompt()
    const{outcome}=await installPrompt.userChoice
    if(outcome==='accepted'){setShowInstall(false);setInstallPrompt(null)}
  }
  const [lang,setLang]=useState("en")
  const [cache,setCache]=useState({})
  const [user,setUser]=useState(null)
  const [liveEvents,setLiveEvents]=useState([])
  const [subscription,setSubscription]=useState(null)
  const [checkoutPlan,setCheckoutPlan]=useState("basic")
  const [billing,setBilling]=useState("monthly")
  const trackEvent=(type,label="",country="BG")=>setLiveEvents(p=>[...p,{type,label,country,ts:Date.now()}])
  const [posts,setPosts]=useState(()=>loadPosts()||INIT_POSTS)
  const [postMedia,setPostMedia]=useState(null) // {type:"image"|"video", src:base64}
  const [mediaLoading,setMediaLoading]=useState(false)
  const [reviews,setReviews]=useState(INIT_REVIEWS)
  const t=T[lang]||T.en

  useEffect(()=>{
    // Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID from analytics.google.com
    if(GA_ID&&GA_ID!=="G-XXXXXXXXXX"){
      const s=document.createElement("script")
      s.async=true
      s.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID
      document.head.appendChild(s)
      window.dataLayer=window.dataLayer||[]
      window.gtag=function(){window.dataLayer.push(arguments)}
      window.gtag("js",new Date())
      window.gtag("config",GA_ID,{send_page_view:false})
    } else {
      window.gtag=window.gtag||function(){}
    }
    // Handle Stripe payment return
    try{
      const p=new URLSearchParams(window.location.search)
      if(p.get("success")==="1"){
        setSubscription({plan:p.get("plan")||"basic",billing:p.get("billing")||"monthly"})
        window.history.replaceState({},"",window.location.pathname)
      }
    }catch(e){}
  },[])

  // ── SEO: Dynamic title + meta per page ──────────────────────────
  const PAGE_SEO = {
    home:      {title:"BGexpats — Expat Guide to Bulgaria",desc:"The #1 English-language resource for expats in Bulgaria. Visa guides, healthcare, banking, interactive map, AI assistant and more."},
    legal:     {title:"Legal & Residency in Bulgaria — BGexpats",desc:"Visa D, EU residence, driving licence exchange, apostilles and retirement guides for expats in Bulgaria."},
    healthcare:{title:"Healthcare in Bulgaria — BGexpats",desc:"How to register with a doctor, use the NHIF, find English-speaking hospitals and international schools in Bulgaria."},
    banking:   {title:"Banking & Tax in Bulgaria — BGexpats",desc:"Open a bank account, understand Bulgarian taxes, EOOD company setup and financial planning for expats."},
    tourism:   {title:"Tourism & Travel in Bulgaria — BGexpats",desc:"Best places to visit, transport, beaches, mountains and travel tips for tourists in Bulgaria."},
    housing:   {title:"Housing in Bulgaria — BGexpats",desc:"Find an apartment, buy property, understand utilities and moving logistics in Bulgaria."},
    business:  {title:"Business Setup in Bulgaria — BGexpats",desc:"Register an EOOD company, understand Bulgarian tax, work legally as a freelancer or entrepreneur."},
    tools:     {title:"Expat Tools — BGexpats",desc:"Free tools: tax calculator, visa checker, cost of living comparison for 11 Bulgarian cities, currency converter."},
    map:       {title:"Expat Map of Bulgaria — BGexpats",desc:"Interactive map of hospitals, banks, coworking spaces, restaurants, hotels and car rentals across 16 Bulgarian cities."},
    community: {title:"Expat Community — BGexpats",desc:"Connect with expats and locals in Bulgaria. Share experiences, ask questions, get real advice."},
    connect:   {title:"Meet Expats in Bulgaria — BGexpats",desc:"Connect with Bulgarians and expats for friendship, romance and networking across Bulgaria."},
    apps:      {title:"Best Apps for Expats in Bulgaria — BGexpats",desc:"50 essential apps: Bolt, Wolt, Lidl Plus, DSK Bank, Speedy and more for life in Bulgaria."},
    chat:      {title:"AI Assistant — BGexpats",desc:"Ask anything about life in Bulgaria. Visa questions, tax advice, where to live — answered instantly in 8 languages."},
    pricing:   {title:"BGexpats Premium — Unlock All Features",desc:"Upgrade to BGexpats Basic or Premium for the full map, all tools, document tracker and more. From €3.99/month."},
  }
  useEffect(()=>{
    const seo=PAGE_SEO[view]||PAGE_SEO.home
    document.title=seo.title
    const metaDesc=document.querySelector('meta[name="description"]')
    if(metaDesc)metaDesc.setAttribute('content',seo.desc)
    const ogTitle=document.querySelector('meta[property="og:title"]')
    if(ogTitle)ogTitle.setAttribute('content',seo.title)
    const ogDesc=document.querySelector('meta[property="og:description"]')
    if(ogDesc)ogDesc.setAttribute('content',seo.desc)
    gtrack("page_view",{page_title:seo.title})
    trackEvent("view",view)
  },[view])

  const openCheckout=(plan,b)=>{
    setCheckoutPlan(plan)
    if(b)setBilling(b)
    setView("checkout")
    gtrack("begin_checkout",{plan,billing:b||billing})
  }

  const isCat=CATEGORIES.some(c=>c.id===view)

  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:C.page,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body,button,input,textarea,select{font-family:'Inter',system-ui,sans-serif}
        h1,h2,h3,.serif{font-family:'DM Serif Display',Georgia,serif}
        button:focus-visible{outline:2px solid ${C.accent};outline-offset:2px}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes gradShift{0%,100%{opacity:1}50%{opacity:0.85}}
        @keyframes floatUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}
        @keyframes fadeIn{0%{opacity:0}100%{opacity:1}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
        .reveal{opacity:0;transform:translateY(36px);transition:opacity 0.75s cubic-bezier(.16,1,.3,1),transform 0.75s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-delay-1{transition-delay:0.1s}
        .reveal-delay-2{transition-delay:0.2s}
        .reveal-delay-3{transition-delay:0.3s}
        .reveal-delay-4{transition-delay:0.4s}
        .hover-lift{transition:transform 0.25s cubic-bezier(.16,1,.3,1),box-shadow 0.25s ease}
        .hover-lift:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.14)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px}
        ::selection{background:${C.primaryLight};color:${C.primary}}
      `}</style>
      <LangBanner lang={lang} setLang={setLang}/>
      {showInstall&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#1e5e3f",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,zIndex:9999,boxShadow:"0 -4px 20px rgba(0,0,0,0.2)"}}>
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🌹</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Install BGexpats</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)"}}>Add to home screen — works offline</div>
          </div>
          <button onClick={installApp} style={{background:"#f0c060",border:"none",color:"#1a3a20",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,flexShrink:0}}>Install</button>
          <button onClick={()=>setShowInstall(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:20,padding:"0 4px",flexShrink:0}}>×</button>
        </div>
      )}
      <Nav view={view} setView={setView} lang={lang} t={t} user={user} setUser={setUser} subscription={subscription} openCheckout={openCheckout}/>
      {view==="login"?(
        <LoginPage setUser={setUser} setView={setView}/>
      ):view==="checkout"?(
        <CheckoutPage plan={checkoutPlan} billing={billing} setBilling={setBilling} setView={setView} user={user} setSubscription={setSubscription}/>
      ):view==="apps"?(
        <AppsPage/>
      ):view==="connect"?(
        <ConnectPage user={user} setView={setView} subscription={subscription}/>
      ):view==="tracker"?(
        <DeadlineTracker user={user} subscription={subscription} setView={setView}/>
      ):view==="advertise"?(
        <AdvertisePage setView={setView} lang={lang}/>
      ):view==="analytics"?(
        <AnalyticsPage liveEvents={liveEvents} user={user}/>
      ):view==="map"?(
        <MapPage user={user} setView={setView} subscription={subscription} openCheckout={openCheckout}/>
      ):view==="tools"?(
        <ToolsPage user={user} setView={setView} trackEvent={trackEvent} subscription={subscription}/>
      ):view==="pricing"?(
        <PricingPage user={user} setView={setView} lang={lang} openCheckout={openCheckout}/>
      ):view==="community"?(
        <CommunityPage user={user} setView={setView} posts={posts} setPosts={setPosts}/>
      ):view==="chat"?(
        <ChatPage lang={lang} t={t}/>
      ):isCat?(
        <CategoryPage catId={view} setView={setView} lang={lang} t={t} cache={cache} setCache={setCache} user={user} reviews={reviews} setReviews={setReviews}/>
      ):(
        <>
          <Hero setView={setView} t={t} lang={lang}/>
          <CategoryGrid setView={setView} t={t} lang={lang}/>
          <PhotoGallery setView={setView} lang={lang}/>
          <QuickFacts t={t}/>
          <AiCta setView={setView} t={t}/>
          <Footer lang={lang}/>
        </>
      )}
    </div>
  )
}

// ── Stripe & GA4 config ───────────────────────────────────────────

const AI_ENDPOINT =
  (typeof window !== "undefined" && window.location && window.location.hostname === "localhost")
    ? "https://api.anthropic.com/v1/messages"
    : "/api/chat"

let AI_USAGE = {} // { "YYYY-MM-DD": count } — free-tier daily AI question count

const GA_ID = "G-XXXXXXXXXX" // ← Replace with your GA4 Measurement ID

// ⚠️ PRICING REMINDER — set these EXACT amounts in Stripe:
//   basic_monthly   → €3.99  / month
//   basic_yearly    → €31.90 / year
//   premium_monthly → €6.49  / month
//   premium_yearly  → €51.90 / year
const STRIPE_LINKS = {
  basic_monthly:   "https://buy.stripe.com/REPLACE_BASIC_MONTHLY",
  basic_yearly:    "https://buy.stripe.com/REPLACE_BASIC_YEARLY",
  premium_monthly: "https://buy.stripe.com/REPLACE_PREMIUM_MONTHLY",
  premium_yearly:  "https://buy.stripe.com/REPLACE_PREMIUM_YEARLY",
}

// ── Crypto payment links (Coinbase Commerce or NOWPayments) ───────
// Create payment links at commerce.coinbase.com or nowpayments.io
// Set success URL to: https://bgexpats.com?success=1&plan=PLAN&billing=BILLING
const CRYPTO_LINKS = {
  basic_monthly:   "https://commerce.coinbase.com/checkout/REPLACE_BASIC_MONTHLY",
  basic_yearly:    "https://commerce.coinbase.com/checkout/REPLACE_BASIC_YEARLY",
  premium_monthly: "https://commerce.coinbase.com/checkout/REPLACE_PREMIUM_MONTHLY",
  premium_yearly:  "https://commerce.coinbase.com/checkout/REPLACE_PREMIUM_YEARLY",
}

const BTC_COLOR = "#F7931A"
const BTC_DARK  = "#1a1a2e"
const BTC_CARD  = "#16213e"

const USDC_COLOR = "#2775CA"
const CRYPTO_COINS = [
  {symbol:"BTC",  name:"Bitcoin", color:BTC_COLOR,  icon:"₿", note:"Most popular"},
  {symbol:"USDC", name:"USD Coin",color:USDC_COLOR, icon:"◎", note:"Stable — always $1"},
]

const gtrack = (event, params={}) => {
  if(typeof window!=="undefined"&&window.gtag) window.gtag("event", event, params)
}

// ── Checkout Page ─────────────────────────────────────────────────
function CheckoutPage({plan,billing,setBilling,setView,user,setSubscription}){
  const [payMethod,setPayMethod]=useState("stripe") // "stripe" | "crypto"
  const [cryptoStep,setCryptoStep]=useState("select") // "select" | "address" | "confirm"
  const [selectedCoin,setSelectedCoin]=useState("BTC")
  const p = PLANS[plan]||PLANS.basic
  const isYearly = billing==="yearly"
  const price = isYearly ? p.yearlyTotal : p.monthly
  const perMonth = isYearly ? p.yearly : p.monthly
  const linkKey = `${plan}_${billing}`
  const stripeUrl = STRIPE_LINKS[linkKey]||"#"

  const handlePay = () => {
    gtrack("begin_checkout",{plan,billing,value:price,currency:"EUR"})
    if(stripeUrl==="https://buy.stripe.com/REPLACE_"+linkKey.toUpperCase()||stripeUrl==="#"){
      alert("⚠️ Set up your Stripe Payment Links!\n\nGo to dashboard.stripe.com → Payment Links → Create link\nThen paste the URL into STRIPE_LINKS in the code.")
      return
    }
    window.open(stripeUrl,"_blank")
  }

  const features = {
    basic:[
      "Full community — post, like & reply",
      "Unlimited AI chat questions",
      "All 7 interactive tools",
      "All guides in 8 languages",
      "Weekly expat newsletter",
      "Leave reviews & ratings",
    ],
    premium:[
      "Everything in Basic",
      "Premium legal & tax guides",
      "Downloadable PDF templates",
      "Vetted service directory",
      "Priority AI — deeper answers",
      "Verified member badge",
      "Early access to new features",
    ],
  }

  return(
    <div style={{minHeight:"100vh",background:C.page,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px"}}>
      <div style={{width:"100%",maxWidth:500}}>
        
        {/* Back */}
        <button onClick={()=>setView("pricing")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginBottom:20,display:"flex",alignItems:"center",gap:5}}>
          ← Back to plans
        </button>

        <div style={{background:C.surface,borderRadius:22,border:`1px solid ${C.border}`,overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,0.1)"}}>

          {/* Plan header */}
          <div style={{background:plan==="premium"?`linear-gradient(135deg,${C.primary},#2a7a52)`:`linear-gradient(135deg,#1850a0,#2563eb)`,padding:"28px 28px 24px"}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>
              Subscribing to
            </div>
            <div style={{fontSize:24,fontWeight:700,color:"#fff",marginBottom:14}}>{p.name} plan</div>
            
            {/* Billing toggle */}
            <div style={{display:"inline-flex",background:"rgba(0,0,0,0.2)",borderRadius:24,padding:3,gap:2}}>
              {["monthly","yearly"].map(b=>(
                <button key={b} onClick={()=>setBilling(b)}
                  style={{background:billing===b?"#fff":"transparent",border:"none",color:billing===b?(plan==="premium"?C.primary:"#1850a0"):"rgba(255,255,255,0.8)",padding:"6px 16px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:billing===b?600:400,transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}}>
                  {b==="monthly"?"Monthly":"Yearly"}
                  {b==="yearly"&&<span style={{background:"#f0c060",color:"#1a3a20",fontSize:9,padding:"1px 6px",borderRadius:6,fontWeight:700}}>-33%</span>}
                </button>
              ))}
            </div>

            {/* Price — always show monthly rate */}
            <div style={{marginTop:18,display:"flex",alignItems:"baseline",gap:6}}>
              <span style={{fontSize:40,fontWeight:800,color:"#fff",letterSpacing:"-1px"}}>€{isYearly?p.yearly.toFixed(2):p.monthly.toFixed(2)}</span>
              <span style={{fontSize:14,color:"rgba(255,255,255,0.7)"}}>/month</span>
            </div>
            {isYearly&&(
              <div style={{fontSize:13,color:"rgba(255,255,255,0.65)",marginTop:3}}>
                Billed annually at <strong style={{color:"#f0c060"}}>€{p.yearlyTotal}/year</strong> — saves €{(p.monthly*12-p.yearlyTotal).toFixed(2)}
              </div>
            )}
          </div>

          {/* Features */}
          <div style={{padding:"22px 28px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:12}}>What you get</div>
            {(features[plan]||[]).map((f,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"6px 0",fontSize:13,color:C.text}}>
                <span style={{color:"#22c55e",fontSize:14,flexShrink:0}}>✓</span>{f}
              </div>
            ))}
          </div>

          {/* Payment section */}
          <div style={{padding:"22px 28px"}}>

            {/* User check */}
            {!user?(
              <div style={{background:"#fff9f0",border:"1px solid #f0d9b0",borderRadius:10,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#8a5a1a"}}>
                ⚠️ Please <button onClick={()=>setView("login")} style={{background:"none",border:"none",color:C.accent,fontWeight:600,cursor:"pointer",padding:0,fontSize:13,textDecoration:"underline"}}>sign in or create a free account</button> first.
              </div>
            ):(
              <div style={{background:C.primaryLight,border:`1px solid ${C.primary}30`,borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:13,color:C.primary}}>
                Subscribing as: <strong>{user.name}</strong>
              </div>
            )}

            {/* Payment method selector */}
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {[["stripe","💳 Card"],["crypto","₿ Bitcoin & Crypto"]].map(([k,l])=>(
                <button key={k} onClick={()=>{setPayMethod(k);setCryptoStep("select")}}
                  style={{flex:1,padding:"10px",borderRadius:10,border:`2px solid ${payMethod===k?(k==="crypto"?BTC_COLOR:"#635BFF"):C.border}`,background:payMethod===k?(k==="crypto"?"#1a0f00":"#f0efff"):"transparent",color:payMethod===k?(k==="crypto"?BTC_COLOR:"#635BFF"):C.muted,cursor:"pointer",fontSize:13,fontWeight:payMethod===k?700:400,transition:"all 0.2s"}}>
                  {l}
                </button>
              ))}
            </div>

            {/* Stripe section */}
            {payMethod==="stripe"&&(
              <div>
                <button onClick={user?handlePay:()=>setView("login")}
                  style={{width:"100%",background:"#635BFF",border:"none",color:"#fff",padding:"15px",borderRadius:12,cursor:"pointer",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:12,boxShadow:"0 4px 18px rgba(99,91,255,0.35)",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#524BEE"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#635BFF"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="white"/></svg>
                  Pay with Card — {isYearly?`€${p.yearlyTotal} billed annually`:`€${p.monthly.toFixed(2)}/month`}
                </button>
                <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:12}}>
                  {[["🔒","SSL secure"],["✓","Stripe"],["↩️","Cancel anytime"]].map(([i,l])=>(
                    <div key={l} style={{display:"flex",alignItems:"center",gap:3,fontSize:11,color:C.muted}}><span>{i}</span><span>{l}</span></div>
                  ))}
                </div>
                <p style={{fontSize:11,color:C.muted,textAlign:"center",margin:0,lineHeight:1.6}}>
                  Redirected to Stripe's secure checkout. Subscription activates immediately after payment.
                </p>
              </div>
            )}

            {/* Crypto section */}
            {payMethod==="crypto"&&(
              <div>
                {cryptoStep==="select"&&(
                  <div>
                    <div style={{background:BTC_DARK,borderRadius:14,padding:"18px",marginBottom:14}}>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:12,letterSpacing:"0.05em",textTransform:"uppercase"}}>Select cryptocurrency</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                        {CRYPTO_COINS.map(coin=>(
                          <button key={coin.symbol} onClick={()=>setSelectedCoin(coin.symbol)}
                            style={{background:selectedCoin===coin.symbol?`${coin.color}22`:"rgba(255,255,255,0.05)",border:`1.5px solid ${selectedCoin===coin.symbol?coin.color:"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"}}>
                            <span style={{fontSize:20,color:coin.color,fontWeight:700}}>{coin.icon}</span>
                            <div style={{textAlign:"left"}}>
                              <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{coin.symbol}</div>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{coin.note}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div style={{background:"rgba(247,147,26,0.1)",border:"1px solid rgba(247,147,26,0.2)",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
                        <div style={{fontSize:12,color:BTC_COLOR,marginBottom:2,fontWeight:600}}>₿ Why pay with crypto?</div>
                        <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>
                          {selectedCoin==="BTC"?"Anonymous · Decentralised · No bank needed · Perfect for digital nomads":"Stable price (always $1) · No volatility · Fast · Great for recurring payments"}
                        </div>
                      </div>
                      <button onClick={()=>{
                          gtrack("begin_checkout",{plan,billing,method:"crypto",coin:selectedCoin})
                          const key=`${plan}_${billing}`
                          const url=CRYPTO_LINKS[key]
                          if(url.includes("REPLACE")){alert("Please set up your crypto payment links in the code first.");return}
                          window.open(url,"_blank")
                        }}
                        style={{width:"100%",background:`linear-gradient(135deg,${BTC_COLOR},#e8820a)`,border:"none",color:"#fff",padding:"14px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 18px rgba(247,147,26,0.35)",transition:"all 0.2s"}}>
                        <span style={{fontSize:18}}>₿</span>
                        {selectedCoin==="USDC"?`Pay with USDC — ${ (price*1.08).toFixed(2) } USDC`:`Pay with BTC — €${price} equivalent`}
                      </button>
                    </div>
                    <div style={{background:"#0d1117",borderRadius:10,padding:"12px 14px"}}>
                      <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.7)",marginBottom:8}}>⚡ How it works</div>
                      {[
                        ["1","Click the button above"],
                        ["2","You see the exact crypto amount to send (auto-converted from €)"],
                        ["3","Send from any wallet — Coinbase, Exodus, Ledger, MetaMask"],
                        ["4",selectedCoin==="BTC"?"Subscription activates once confirmed (usually 1–10 min)":"Subscription activates instantly — USDC settles in seconds"],
                      ].map(([n,t])=>(
                        <div key={n} style={{display:"flex",gap:10,padding:"4px 0",fontSize:12,color:"rgba(255,255,255,0.55)"}}>
                          <span style={{color:BTC_COLOR,fontWeight:700,flexShrink:0}}>{n}.</span><span>{t}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:12}}>
                      {[["🔒","Encrypted"],["⚡","Lightning fast"],["🌍","Worldwide"]].map(([i,l])=>(
                        <div key={l} style={{display:"flex",alignItems:"center",gap:3,fontSize:11,color:C.muted}}><span>{i}</span><span>{l}</span></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Switch plan */}
        <p style={{textAlign:"center",fontSize:13,color:C.muted,marginTop:16}}>
          Wrong plan?{" "}
          <button onClick={()=>setView("pricing")} style={{background:"none",border:"none",color:C.primary,cursor:"pointer",fontWeight:600,fontSize:13}}>
            See all plans →
          </button>
        </p>
      </div>
    </div>
  )
}

// ── Claude API helper ─────────────────────────────────────────────
const callClaude = async (system, prompt) => {
  const r = await fetch(typeof AI_ENDPOINT !== "undefined" ? AI_ENDPOINT : "https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system,messages:[{role:"user",content:prompt}]})
  })
  const d = await r.json()
  return ((d.content&&d.content[0]&&d.content[0].text)||'') || "Error generating response."
}

// ── Premium gate wrapper ──────────────────────────────────────────
function PremiumGate({subscription,setView,children,tool}){
  const isPremium = (subscription&&subscription.plan)==="premium"
  if(isPremium) return children
  return(
    <div style={{textAlign:"center",padding:"40px 20px"}}>
      <div style={{fontSize:48,marginBottom:12}}>👑</div>
      <h3 style={{fontSize:20,fontWeight:700,color:C.text,margin:"0 0 8px"}}>{tool} is Premium only</h3>
      <p style={{color:C.muted,fontSize:14,margin:"0 0 20px",lineHeight:1.6}}>Upgrade to Premium (€6.49/month) to unlock all 7 advanced tools</p>
      <button onClick={()=>setView("pricing")} style={{background:"linear-gradient(135deg,#f0c060,#e8a020)",border:"none",color:"#1a3a20",padding:"13px 32px",borderRadius:12,cursor:"pointer",fontSize:15,fontWeight:700}}>
        Upgrade to Premium →
      </button>
    </div>
  )
}

// ══ 1. AI DOCUMENT GENERATOR ═════════════════════════════════════
const DOC_GEN_TYPES = [
  {id:"rental",label:"Rental Contract",icon:"🏠",fields:[
    {k:"landlord",l:"Landlord full name",p:"Ivan Petrov"},
    {k:"tenant",l:"Tenant full name",p:"James Smith"},
    {k:"address",l:"Property address",p:"15 Vitosha Blvd, Sofia 1000"},
    {k:"rent",l:"Monthly rent (€)",p:"900"},
    {k:"deposit",l:"Deposit amount (€)",p:"1800"},
    {k:"duration",l:"Contract duration",p:"12 months"},
    {k:"start",l:"Start date",p:"01/09/2025"},
  ]},
  {id:"eood",label:"EOOD Company Statutes",icon:"🏢",fields:[
    {k:"company",l:"Company name",p:"My Business EOOD"},
    {k:"founder",l:"Founder full name",p:"James Smith"},
    {k:"address",l:"Registered address",p:"15 Vitosha Blvd, Sofia 1000"},
    {k:"capital",l:"Share capital (€)",p:"2"},
    {k:"activity",l:"Main business activity",p:"Software development and IT consulting"},
  ]},
  {id:"employment",label:"Employment Contract",icon:"💼",fields:[
    {k:"employer",l:"Employer company",p:"Tech Company EOOD"},
    {k:"employee",l:"Employee full name",p:"Maria Ivanova"},
    {k:"position",l:"Job title",p:"Marketing Manager"},
    {k:"salary",l:"Monthly gross salary (€)",p:"3500"},
    {k:"start",l:"Start date",p:"01/09/2025"},
    {k:"hours",l:"Working hours/week",p:"40"},
  ]},
  {id:"invoice",label:"Invoice Template",icon:"🧾",fields:[
    {k:"from",l:"Your company name",p:"My Company EOOD"},
    {k:"client",l:"Client company",p:"Client Ltd"},
    {k:"service",l:"Service description",p:"Web development services — August 2025"},
    {k:"amount",l:"Amount (€)",p:"2500"},
    {k:"date",l:"Invoice date",p:"01/09/2025"},
    {k:"due",l:"Payment due (days)",p:"14"},
  ]},
  {id:"nda",label:"Non-Disclosure Agreement",icon:"🔒",fields:[
    {k:"party1",l:"Party 1 name/company",p:"My Company EOOD"},
    {k:"party2",l:"Party 2 name/company",p:"Partner Company Ltd"},
    {k:"purpose",l:"Purpose of NDA",p:"Discussion of potential business collaboration"},
    {k:"duration",l:"NDA duration (years)",p:"3"},
    {k:"date",l:"Date",p:"01/09/2025"},
  ]},
]

function DocGenerator({subscription,setView}){
  const [type,setType]=useState("rental")
  const [fields,setFields]=useState({})
  const [out,setOut]=useState("")
  const [loading,setLoading]=useState(false)
  const doc=DOC_GEN_TYPES.find(d=>d.id===type)

  const generate=async()=>{
    setLoading(true);setOut("")
    const filled=doc.fields.map(f=>`${f.l}: ${fields[f.k]||f.p}`).join("\n")
    const text=await callClaude(
      "You are a Bulgarian legal document specialist. Generate professional legal documents for use in Bulgaria. Always write the document in English with a Bulgarian translation section below. Use proper legal language. Format clearly with sections and article numbers.",
      `Generate a ${doc.label} for Bulgaria with these details:\n${filled}\n\nProvide:\n1. ENGLISH VERSION (full document)\n2. BULGARIAN VERSION (пълен превод)\n3. KEY NOTES for the parties\n\nMake it legally professional and appropriate for Bulgaria.`
    )
    setOut(text);setLoading(false)
  }

  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Document Generator">
      <div>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {DOC_GEN_TYPES.map(d=><button key={d.id} onClick={()=>{setType(d.id);setOut("")}} style={{padding:"7px 12px",borderRadius:10,border:`1.5px solid ${type===d.id?C.primary:C.border}`,background:type===d.id?C.primaryLight:"transparent",color:type===d.id?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:type===d.id?700:400,display:"flex",alignItems:"center",gap:5}}>{d.icon} {d.label}</button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {doc.fields.map(f=>(
            <div key={f.k}>
              <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:3}}>{f.l}</label>
              <input value={fields[f.k]||""} onChange={e=>setFields(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",fontSize:13,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
            </div>
          ))}
        </div>
        <button onClick={generate} disabled={loading} style={{background:loading?"#ccc":C.primary,border:"none",color:"#fff",padding:"11px 24px",borderRadius:10,cursor:loading?"default":"pointer",fontSize:14,fontWeight:600,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
          {loading?<><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span> Generating...</>:"📄 Generate Document"}
        </button>
        {out&&(
          <div style={{background:C.page,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",maxHeight:400,overflowY:"auto"}}>
            <pre style={{fontSize:12,color:C.text,whiteSpace:"pre-wrap",margin:0,lineHeight:1.7,fontFamily:"Inter,system-ui,sans-serif"}}>{out}</pre>
            <button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText(out)} style={{marginTop:12,background:C.primary,border:"none",color:"#fff",padding:"7px 16px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600}}>📋 Copy document</button>
          </div>
        )}
      </div>
    </PremiumGate>
  )
}

// ══ 2. SMART RELOCATION PLANNER ══════════════════════════════════
function RelocationPlanner({subscription,setView}){
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState({})
  const [plan,setPlan]=useState("")
  const [loading,setLoading]=useState(false)
  const qs=[
    {k:"nationality",q:"Your nationality",opts:["EU/EEA citizen","Non-EU citizen (North America, Australia, etc.)","Non-EU citizen (Asia, Africa, Middle East)"]},
    {k:"family",q:"Who is moving?",opts:["Just me (solo)","Me and my partner","Family with children","Retired couple"]},
    {k:"work",q:"Your work situation",opts:["Remote worker / freelancer","Starting an EOOD company","Working for a Bulgarian employer","Retired / financial independence","Student"]},
    {k:"budget",q:"Your monthly budget in Bulgaria",opts:["Under €1,000/month","€1,000 – €1,500/month","€1,500 – €2,500/month","Over €2,500/month"]},
    {k:"city",q:"Target city",opts:["Sofia (capital, urban)","Plovdiv (cultural, charming)","Varna (coastal, beach)","Burgas (quieter coast)","Bansko (mountain, ski)","Not sure yet"]},
    {k:"when",q:"When are you planning to move?",opts:["In the next 1–3 months","In 3–6 months","In 6–12 months","Just exploring for now"]},
    {k:"priority",q:"Your top priority in Bulgaria",opts:["Low cost of living","Career & business","Weather & outdoors","Cultural experiences","Expat community","Privacy & quiet life"]},
    {k:"bulgarian",q:"Do you speak Bulgarian?",opts:["Yes, I speak some Bulgarian","A few words only","No Bulgarian at all"]},
  ]
  const answer=(k,v)=>{
    const n={...ans,[k]:v}
    setAns(n)
    if(step<qs.length-1)setStep(step+1)
    else generatePlan(n)
  }
  const generatePlan=async(answers)=>{
    setStep(qs.length);setLoading(true)
    const summary=Object.entries(answers).map(([k,v])=>`${k}: ${v}`).join("\n")
    const text=await callClaude(
      "You are an expert relocation consultant specialising in helping people move to Bulgaria. Create detailed, practical, personalised relocation plans. Be specific about Bulgarian requirements, timelines and costs. Format with clear phases using emoji headers.",
      `Create a personalised relocation plan for someone moving to Bulgaria with this profile:\n${summary}\n\nProvide a detailed week-by-week action plan covering:\n📅 3 MONTHS BEFORE MOVING (key preparation steps)\n📅 1 MONTH BEFORE (final preparations)\n🏁 FIRST WEEK IN BULGARIA (immediate priorities)\n🌱 FIRST MONTH (settling in)\n✅ FIRST 3 MONTHS (establishing life)\n\nInclude specific Bulgarian requirements for their nationality, estimated costs in EUR, and insider tips. Be very practical and specific.`
    )
    setPlan(text);setLoading(false)
  }
  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Relocation Planner">
      <div>
        {step<qs.length&&(
          <div>
            <div style={{display:"flex",gap:3,marginBottom:16}}>
              {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<step?C.primary:i===step?"#86efac":C.border}}/>)}
            </div>
            <p style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 12px"}}>Step {step+1} of {qs.length}: {qs[step].q}</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {qs[step].opts.map(o=>(
                <button key={o} onClick={()=>answer(qs[step].k,o)}
                  style={{background:C.page,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:C.text,transition:"all 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.background=C.primaryLight}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.page}}>
                  {o}
                </button>
              ))}
            </div>
            {step>0&&<button onClick={()=>setStep(step-1)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginTop:10}}>← Back</button>}
          </div>
        )}
        {step===qs.length&&(
          <div>
            {loading?(
              <div style={{textAlign:"center",padding:"40px"}}>
                <div style={{fontSize:32,marginBottom:12,animation:"spin 2s linear infinite",display:"inline-block"}}>🗺️</div>
                <p style={{color:C.muted,fontSize:14}}>Building your personalised relocation plan...</p>
              </div>
            ):plan?(
              <div>
                <div style={{background:C.primaryLight,border:`1px solid ${C.primary}30`,borderRadius:12,padding:"12px 14px",marginBottom:14,fontSize:13,color:C.primary,fontWeight:600}}>
                  ✅ Your personalised plan for moving to Bulgaria is ready
                </div>
                <div style={{background:C.page,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",maxHeight:450,overflowY:"auto"}}>
                  <pre style={{fontSize:13,color:C.text,whiteSpace:"pre-wrap",margin:0,lineHeight:1.8,fontFamily:"Inter,system-ui,sans-serif"}}>{plan}</pre>
                </div>
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText(plan)} style={{background:C.primary,border:"none",color:"#fff",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600}}>📋 Copy plan</button>
                  <button onClick={()=>{setStep(0);setAns({});setPlan("")}} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:12}}>Start over ↺</button>
                </div>
              </div>
            ):null}
          </div>
        )}
      </div>
    </PremiumGate>
  )
}

// ══ 3. PROPERTY ROI CALCULATOR ════════════════════════════════════
function PropertyROI({subscription,setView}){
  const [price,setPrice]=useState(80000)
  const [rent,setRent]=useState(600)
  const [expenses,setExpenses]=useState(80)
  const [buyCost,setBuyCost]=useState(3)
  const [appre,setAppre]=useState(4)
  const [years,setYears]=useState(10)
  const totalInvest=price*(1+buyCost/100)
  const annualRent=(rent-expenses)*12
  const grossYield=((rent*12)/price*100).toFixed(2)
  const netYield=(annualRent/totalInvest*100).toFixed(2)
  const monthlyCashflow=rent-expenses
  const exitValue=price*Math.pow(1+appre/100,years)
  const totalRentIncome=annualRent*years
  const totalProfit=exitValue+totalRentIncome-totalInvest
  const totalROI=(totalProfit/totalInvest*100).toFixed(0)
  const breakEven=(totalInvest/annualRent).toFixed(1)
  const inp=(label,val,set,min,max,step,prefix="€",suffix="")=>(
    <div style={{background:C.page,borderRadius:10,padding:"10px 14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:12,color:C.muted}}>{label}</span>
        <span style={{fontSize:13,fontWeight:600,color:C.primary}}>{prefix}{val.toLocaleString()}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:C.primary}}/>
    </div>
  )
  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Property ROI Calculator">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:12,fontWeight:600,color:C.muted,marginBottom:2}}>PROPERTY DETAILS</div>
          {inp("Purchase price",price,setPrice,20000,500000,5000)}
          {inp("Monthly rental income",rent,setRent,100,5000,50)}
          {inp("Monthly expenses (management, maintenance)",expenses,setExpenses,0,500,10)}
          {inp("Purchase costs (notary + taxes)",buyCost,setBuyCost,1,8,0.5,"","% of price")}
          {inp("Annual price appreciation",appre,setAppre,0,10,0.5,"","% per year")}
          {inp("Years to hold",years,setYears,1,30,1,"","")}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{fontSize:12,fontWeight:600,color:C.muted,marginBottom:2}}>YOUR RESULTS</div>
          <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,borderRadius:14,padding:"16px",color:"#fff",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[["Gross yield",grossYield+"%"],["Net yield",netYield+"%"],["Monthly cashflow","€"+monthlyCashflow],["Break-even",breakEven+" yrs"]].map(([l,v])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:11,opacity:0.7,marginBottom:2}}>{l}</div>
                <div style={{fontSize:20,fontWeight:700}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{background:C.page,borderRadius:12,padding:"14px"}}>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,marginBottom:10}}>10-YEAR PROJECTION</div>
            {[["Total invested","€"+Math.round(totalInvest).toLocaleString()],["Property value at exit","€"+Math.round(exitValue).toLocaleString()],["Total rental income","€"+Math.round(totalRentIncome).toLocaleString()],["Total profit","€"+Math.round(totalProfit).toLocaleString()],["Total ROI",totalROI+"%"]].map(([l,v],i)=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
                <span style={{color:C.muted}}>{l}</span>
                <span style={{fontWeight:i===4?700:600,color:i===4?"#16a34a":C.text,fontSize:i===4?15:13}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{background:"#fef9c3",border:"1px solid #fde68a",borderRadius:10,padding:"10px 12px",fontSize:12,color:"#854d0e"}}>
            💡 Bulgarian property yields 6–9% gross — among the best in the EU. Sofia prices have risen 8–12% annually since 2020.
          </div>
        </div>
      </div>
    </PremiumGate>
  )
}

// ══ 4. DOCUMENT DEADLINE TRACKER ══════════════════════════════════
const DEADLINE_TYPES=["Type D Visa","Temporary Residence Permit","Permanent Residence Permit","NHIF Health Insurance","EOOD Annual Tax Return","EOOD VAT Filing","Driving Licence Exchange","Passport Expiry","Bulgarian ID Card","Road Vignette","Car Insurance","Rental Contract Renewal","Work Permit","Vehicle Registration","Other"]

function DeadlineTrackerTool({subscription,setView}){
  const [items,setItems]=useState(()=>{try{return JSON.parse(localStorage.getItem("bg_deadlines")||"[]")}catch{return[]}})
  const [showAdd,setShowAdd]=useState(false)
  const [form,setForm]=useState({name:"",type:DEADLINE_TYPES[0],date:"",note:""})
  const save=(list)=>{setItems(list);try{localStorage.setItem("bg_deadlines",JSON.stringify(list))}catch{}}
  const add=()=>{
    if(!form.name||!form.date)return
    save([...items,{...form,id:Date.now()}])
    setForm({name:"",type:DEADLINE_TYPES[0],date:"",note:""});setShowAdd(false)
  }
  const del=(id)=>save(items.filter(i=>i.id!==id))
  const getDays=(date)=>Math.ceil((new Date(date)-new Date())/86400000)
  const getColor=(d)=>d<0?"#dc2626":d<=7?"#ea580c":d<=30?"#ca8a04":d<=90?"#2563eb":"#16a34a"
  const getLabel=(d)=>d<0?"OVERDUE":d===0?"TODAY":d<=7?"CRITICAL":d<=30?"DUE SOON":d<=90?"UPCOMING":"OK"
  const sorted=[...items].sort((a,b)=>new Date(a.date)-new Date(b.date))
  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Deadline Tracker">
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:13,color:C.muted}}>{items.length} documents tracked</div>
          <button onClick={()=>setShowAdd(!showAdd)} style={{background:C.primary,border:"none",color:"#fff",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>+ Add document</button>
        </div>
        {showAdd&&(
          <div style={{background:C.page,border:`1px solid ${C.primary}30`,borderRadius:12,padding:"14px",marginBottom:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div>
                <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:3}}>Document name</label>
                <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. My Type D Visa" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,outline:"none",background:C.surface,color:C.text,boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:3}}>Type</label>
                <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,outline:"none",background:C.surface,color:C.text}}>
                  {DEADLINE_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:3}}>Expiry / due date</label>
                <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,outline:"none",background:C.surface,color:C.text,boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:3}}>Note (optional)</label>
                <input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} placeholder="e.g. Need to book appointment" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,outline:"none",background:C.surface,color:C.text,boxSizing:"border-box"}}/>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={add} style={{background:C.primary,border:"none",color:"#fff",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>Save</button>
              <button onClick={()=>setShowAdd(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontSize:13}}>Cancel</button>
            </div>
          </div>
        )}
        {sorted.length===0?(
          <div style={{textAlign:"center",padding:"40px",color:C.muted}}>
            <div style={{fontSize:32,marginBottom:8}}>📅</div>
            <p style={{fontSize:14}}>No documents tracked yet. Add your first deadline above.</p>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {sorted.map(item=>{
              const days=getDays(item.date)
              const col=getColor(days)
              const lbl=getLabel(days)
              return(
                <div key={item.id} style={{background:C.surface,border:`1.5px solid ${col}30`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:4,height:48,borderRadius:2,background:col,flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:14,fontWeight:600,color:C.text}}>{item.name}</span>
                      <span style={{fontSize:10,fontWeight:700,color:col,background:`${col}15`,padding:"1px 7px",borderRadius:6}}>{lbl}</span>
                    </div>
                    <div style={{fontSize:12,color:C.muted}}>{item.type} · {days<0?`${Math.abs(days)} days overdue`:`${days} days remaining`} · {new Date(item.date).toLocaleDateString()}</div>
                    {item.note&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>📝 {item.note}</div>}
                  </div>
                  <button onClick={()=>del(item.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:16,padding:"4px"}}>×</button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PremiumGate>
  )
}

// ══ 5. NEIGHBOURHOOD MATCHER ══════════════════════════════════════
function HoodMatcher({subscription,setView}){
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState({})
  const [result,setResult]=useState(null)
  const [loading,setLoading]=useState(false)
  const qs=[
    {k:"city",q:"Which city are you moving to?",opts:["Sofia","Plovdiv","Varna"]},
    {k:"budget",q:"Monthly rent budget",opts:["Under €600","€600–€900","€900–€1,400","Over €1,400"]},
    {k:"family",q:"Your household",opts:["Solo or couple","Family with young children","Family with teens","Retired couple"]},
    {k:"work",q:"Where will you work?",opts:["100% remote from home","City centre office","Business park / suburbs","I'll commute by car"]},
    {k:"vibe",q:"Which vibe suits you best?",opts:["Quiet and residential","Lively, cafes and restaurants nearby","Nature and green spaces","International / expat community"]},
    {k:"priority",q:"Your biggest priority",opts:["Safety above all","Lowest possible rent","Walking to everything","Great restaurants & bars","Close to public transport"]},
  ]
  const answer=async(k,v)=>{
    const n={...ans,[k]:v}
    setAns(n)
    if(step<qs.length-1){setStep(step+1)}
    else{
      setStep(qs.length);setLoading(true)
      const summary=Object.entries({...n}).map(([k,v])=>`${k}: ${v}`).join("\n")
      const text=await callClaude(
        "You are an expert on Bulgarian neighbourhoods with deep knowledge of Sofia, Plovdiv and Varna. Give very specific, honest and personalised neighbourhood recommendations.",
        `Recommend the best neighbourhood in ${n.city||"Sofia"} for someone with this profile:\n${summary}\n\nProvide:\n🥇 TOP RECOMMENDATION: [neighbourhood name] — why it's perfect for them\n🥈 SECOND CHOICE: [neighbourhood name] — why this also works\n🥉 THIRD OPTION: [neighbourhood name] — budget/lifestyle alternative\n\nFor each include: typical rent range, key pros and cons for their specific situation, 1-2 streets to look at, and one insider tip. Be specific and practical.`
      )
      setResult(text);setLoading(false)
    }
  }
  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Neighbourhood Matcher">
      <div>
        {step<qs.length&&(
          <div>
            <div style={{display:"flex",gap:3,marginBottom:16}}>
              {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<step?C.primary:i===step?"#86efac":C.border}}/>)}
            </div>
            <p style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 12px"}}>Question {step+1} of {qs.length}: {qs[step].q}</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {qs[step].opts.map(o=>(
                <button key={o} onClick={()=>answer(qs[step].k,o)}
                  style={{background:C.page,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:C.text}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.background=C.primaryLight}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.page}}>
                  {o}
                </button>
              ))}
            </div>
            {step>0&&<button onClick={()=>setStep(step-1)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginTop:10}}>← Back</button>}
          </div>
        )}
        {step===qs.length&&(loading?(
          <div style={{textAlign:"center",padding:"40px"}}>
            <div style={{fontSize:32,marginBottom:12,animation:"spin 2s linear infinite",display:"inline-block"}}>🏘️</div>
            <p style={{color:C.muted,fontSize:14}}>Finding your perfect neighbourhood...</p>
          </div>
        ):result&&(
          <div>
            <div style={{background:C.page,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",maxHeight:450,overflowY:"auto",marginBottom:12}}>
              <pre style={{fontSize:13,color:C.text,whiteSpace:"pre-wrap",margin:0,lineHeight:1.8,fontFamily:"Inter,system-ui,sans-serif"}}>{result}</pre>
            </div>
            <button onClick={()=>{setStep(0);setAns({});setResult("")}} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12}}>Start over ↺</button>
          </div>
        ))}
      </div>
    </PremiumGate>
  )
}

// ══ 6. BULGARIAN LANGUAGE COACH ══════════════════════════════════
const LANG_SCENARIOS=[
  {id:"bank",icon:"🏦",label:"At the bank",system:"You are a Bulgarian bank teller. Speak ONLY in Bulgarian. After each response, add 'Translation:' with English translation and 'Pronunciation:' with phonetic guide. Keep sentences short and practical. Help the user open an account, make transfers, and use banking services."},
  {id:"doctor",icon:"🏥",label:"At the doctor",system:"You are a Bulgarian doctor/receptionist. Speak ONLY in Bulgarian first, then provide Translation and Pronunciation. Help with medical appointments, describing symptoms, getting prescriptions. Use simple, clear Bulgarian."},
  {id:"landlord",icon:"🏠",label:"With your landlord",system:"You are a Bulgarian landlord. Speak ONLY in Bulgarian first, then Translation and Pronunciation. Discuss rent, repairs, contracts, utilities, neighbours. Use everyday conversational Bulgarian."},
  {id:"restaurant",icon:"🍽️",label:"At a restaurant",system:"You are a Bulgarian waiter in a traditional mehana. Speak ONLY in Bulgarian first, then Translation and Pronunciation. Help order food, ask about dishes, pay the bill. Be warm and helpful."},
  {id:"shopping",icon:"🛒",label:"At the supermarket",system:"You are a Bulgarian shop assistant. Speak ONLY in Bulgarian first, then Translation and Pronunciation. Help find products, discuss prices, checkout. Use simple everyday Bulgarian."},
  {id:"social",icon:"👋",label:"Meeting Bulgarians",system:"You are a friendly Bulgarian person meeting an expat. Speak ONLY in Bulgarian first, then Translation and Pronunciation. Casual conversation — where they're from, how they like Bulgaria, recommendations. Warm and welcoming."},
]

function LangCoach({subscription,setView}){
  const [scenario,setScenario]=useState("bank")
  const [msgs,setMsgs]=useState([])
  const [input,setInput]=useState("")
  const [loading,setLoading]=useState(false)
  const sc=LANG_SCENARIOS.find(s=>s.id===scenario)
  const inputRef=useRef(null)
  const startConvo=async(sc)=>{
    setMsgs([]);setLoading(true)
    const opening=await callClaude(sc.system,"Start the conversation naturally in your role. Greet me and say something appropriate to start the interaction. Remember: Bulgarian first, then Translation and Pronunciation.")
    setMsgs([{role:"assistant",content:opening}]);setLoading(false)
  }
  const send=async()=>{
    if(!input.trim()||loading)return
    const userMsg={role:"user",content:input}
    const history=[...msgs,userMsg]
    setMsgs(history);setInput("");setLoading(true)
    const context=history.map(m=>`${m.role==="user"?"Student":"You"}: ${m.content}`).join("\n")
    const reply=await callClaude(sc.system,`Conversation so far:\n${context}\n\nContinue naturally in your role. Bulgarian first, then Translation, then Pronunciation. If the student makes a mistake in Bulgarian, gently correct them with a tip.`)
    setMsgs([...history,{role:"assistant",content:reply}]);setLoading(false)
    setTimeout(()=>inputRef.current&&inputRef.current.focus(),100)
  }
  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Language Coach">
      <div>
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {LANG_SCENARIOS.map(s=>(
            <button key={s.id} onClick={()=>{setScenario(s.id);startConvo(s)}}
              style={{padding:"6px 12px",borderRadius:16,border:`1.5px solid ${scenario===s.id?C.primary:C.border}`,background:scenario===s.id?C.primaryLight:"transparent",color:scenario===s.id?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:scenario===s.id?600:400}}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        {msgs.length===0&&!loading&&(
          <div style={{textAlign:"center",padding:"30px"}}>
            <div style={{fontSize:36,marginBottom:10}}>🇧🇬</div>
            <p style={{color:C.muted,fontSize:14,marginBottom:16}}>Choose a scenario above to start practising Bulgarian</p>
            <button onClick={()=>startConvo(sc)} style={{background:C.primary,border:"none",color:"#fff",padding:"10px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>Start conversation →</button>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12,maxHeight:360,overflowY:"auto"}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",gap:10,justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              {m.role==="assistant"&&<div style={{width:32,height:32,borderRadius:"50%",background:C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🇧🇬</div>}
              <div style={{maxWidth:"80%",background:m.role==="user"?C.primary:C.page,border:`1px solid ${m.role==="user"?"transparent":C.border}`,borderRadius:12,padding:"10px 14px"}}>
                <pre style={{fontSize:13,color:m.role==="user"?"#fff":C.text,whiteSpace:"pre-wrap",margin:0,lineHeight:1.7,fontFamily:"Inter,system-ui,sans-serif"}}>{m.content}</pre>
              </div>
            </div>
          ))}
          {loading&&<div style={{textAlign:"center",padding:"10px",color:C.muted,fontSize:13}}>🇧🇬 thinking...</div>}
        </div>
        {msgs.length>0&&(
          <div style={{display:"flex",gap:8}}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type in English or try Bulgarian..." style={{flex:1,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,outline:"none",color:C.text,background:C.page}}/>
            <button onClick={send} disabled={loading} style={{background:C.primary,border:"none",color:"#fff",padding:"10px 18px",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:14}}>Send</button>
          </div>
        )}
      </div>
    </PremiumGate>
  )
}

// ══ 7. PERSONAL BUDGET PLANNER ════════════════════════════════════
const BUDGET_CATS=[
  {k:"rent",l:"Rent / housing",icon:"🏠",type:"expense",typical:900},
  {k:"utilities",l:"Utilities & internet",icon:"💡",type:"expense",typical:100},
  {k:"food",l:"Groceries",icon:"🛒",type:"expense",typical:250},
  {k:"dining",l:"Dining out",icon:"🍽️",type:"expense",typical:150},
  {k:"transport",l:"Transport",icon:"🚌",type:"expense",typical:60},
  {k:"nhif",l:"NHIF (public health)",icon:"🏥",type:"expense",typical:35},
  {k:"health",l:"Private health insurance",icon:"💊",type:"expense",typical:50},
  {k:"accounting",l:"EOOD accountant",icon:"📊",type:"expense",typical:200},
  {k:"entertainment",l:"Entertainment & social",icon:"🎭",type:"expense",typical:150},
  {k:"savings",l:"Savings target",icon:"💰",type:"expense",typical:300},
]
const INCOME_CATS=[
  {k:"salary",l:"Salary / EOOD dividend",icon:"💼"},
  {k:"freelance",l:"Freelance income",icon:"💻"},
  {k:"other",l:"Other income",icon:"💫"},
]

function BudgetPlanner({subscription,setView}){
  const [income,setIncome]=useState({salary:3000,freelance:0,other:0})
  const [expenses,setExpenses]=useState(Object.fromEntries(BUDGET_CATS.map(c=>[c.k,c.typical])))
  const [city,setCity]=useState("sofia")
  const totalIncome=Object.values(income).reduce((s,v)=>s+v,0)
  const totalExpenses=Object.values(expenses).reduce((s,v)=>s+v,0)
  const surplus=totalIncome-totalExpenses
  const savingsRate=totalIncome>0?Math.round(expenses.savings/totalIncome*100):0
  const avgExpat={sofia:1800,plovdiv:1400,varna:1600}
  const avgCity=avgExpat[city]||1800
  return(
    <PremiumGate subscription={subscription} setView={setView} tool="Budget Planner">
      <div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {["sofia","plovdiv","varna"].map(c=><button key={c} onClick={()=>setCity(c)} style={{padding:"5px 14px",borderRadius:16,border:`1.5px solid ${city===c?C.primary:C.border}`,background:city===c?C.primaryLight:"transparent",color:city===c?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:city===c?600:400,textTransform:"capitalize"}}>{c}</button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,marginBottom:8}}>💰 MONTHLY INCOME</div>
            {INCOME_CATS.map(c=>(
              <div key={c.k} style={{background:C.page,borderRadius:8,padding:"8px 12px",marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14}}>{c.icon}</span>
                <span style={{fontSize:12,color:C.text,flex:1}}>{c.l}</span>
                <input type="number" value={income[c.k]} onChange={e=>setIncome(p=>({...p,[c.k]:Number(e.target.value)||0}))} style={{width:80,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",fontSize:13,textAlign:"right",outline:"none",color:C.text,background:C.surface}}/>
              </div>
            ))}
            <div style={{background:C.primaryLight,borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between",marginTop:6}}>
              <span style={{fontSize:13,fontWeight:600,color:C.primary}}>Total income</span>
              <span style={{fontSize:13,fontWeight:700,color:C.primary}}>€{totalIncome.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,marginBottom:8}}>📊 MONTHLY EXPENSES</div>
            {BUDGET_CATS.map(c=>(
              <div key={c.k} style={{background:C.page,borderRadius:8,padding:"8px 12px",marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14}}>{c.icon}</span>
                <span style={{fontSize:12,color:C.text,flex:1}}>{c.l}</span>
                <input type="number" value={expenses[c.k]} onChange={e=>setExpenses(p=>({...p,[c.k]:Number(e.target.value)||0}))} style={{width:80,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",fontSize:13,textAlign:"right",outline:"none",color:C.text,background:C.surface}}/>
              </div>
            ))}
            <div style={{background:surplus<0?"#fef2f2":"#f0fdf4",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between",marginTop:6,border:`1px solid ${surplus<0?"#fecaca":"#bbf7d0"}`}}>
              <span style={{fontSize:13,fontWeight:600,color:surplus<0?"#dc2626":"#16a34a"}}>{surplus<0?"Deficit":"Surplus"}</span>
              <span style={{fontSize:13,fontWeight:700,color:surplus<0?"#dc2626":"#16a34a"}}>€{Math.abs(surplus).toLocaleString()}/mo</span>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:14}}>
          {[
            ["Savings rate",savingsRate+"%",savingsRate>=20?"#16a34a":savingsRate>=10?"#ca8a04":"#dc2626"],
            ["vs avg expat in "+city,"€"+(totalExpenses-avgCity),totalExpenses<=avgCity?"#16a34a":"#dc2626"],
            ["Annual savings","€"+(expenses.savings*12).toLocaleString(),C.primary],
            ["5-yr projection","€"+(expenses.savings*12*5).toLocaleString(),C.primary],
          ].map(([l,v,col])=>(
            <div key={l} style={{background:C.page,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{l}</div>
              <div style={{fontSize:16,fontWeight:700,color:col}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </PremiumGate>
  )
}

// ── Bulgaria Apps Directory ────────────────────────────────────────
const BG_APP_CATS = [
  {id:"all",     label:"All apps",         icon:"📱"},
  {id:"taxi",    label:"Taxi & Rides",     icon:"🚕"},
  {id:"transport",label:"Public Transport",icon:"🚌"},
  {id:"scooter", label:"Scooters & Bikes", icon:"🛴"},
  {id:"food",    label:"Food Delivery",    icon:"🍔"},
  {id:"grocery", label:"Grocery Delivery", icon:"🛒"},
  {id:"savings", label:"Save Money",       icon:"💰"},
  {id:"fitness", label:"Fitness & Wellness",icon:"💪"},
  {id:"health",  label:"Health & Medical", icon:"🏥"},
  {id:"shopping",label:"Online Shopping",  icon:"🛍️"},
  {id:"practical",label:"Must-have Apps",  icon:"⭐"},
]

const BG_APPS = [
  // ── TAXI & RIDES ──────────────────────────────────────────────
  {id:1,cat:"taxi",name:"Bolt",icon:"⚡",color:"#34D186",bg:"#e8faf1",desc:"The #1 ride-hailing app in Bulgaria. Available in Sofia, Plovdiv, Varna, Burgas and more. Cheaper than traditional taxis. English app.",tip:"Usually 30–50% cheaper than street taxis. Schedule rides in advance for airport trips.",ios:"https://apps.apple.com/app/bolt-request-a-ride/id675061903",android:"https://play.google.com/store/apps/details?id=ee.mtakso.client",web:"https://bolt.eu",rating:4.7,free:true,cities:["sofia","plovdiv","varna","burgas"]},
  {id:2,cat:"taxi",name:"Uber",icon:"⬛",color:"#000000",bg:"#f5f5f5",desc:"Available in Sofia. International standard, English app, upfront pricing. Good for airport runs.",tip:"Surge pricing applies during peak hours — Bolt often cheaper. Both accept cards.",ios:"https://apps.apple.com/app/uber/id368677368",android:"https://play.google.com/store/apps/details?id=com.ubercab",web:"https://uber.com",rating:4.6,free:true,cities:["sofia"]},
  {id:3,cat:"taxi",name:"OK Supertrans",icon:"🟡",color:"#f59e0b",bg:"#fffbeb",desc:"Largest traditional taxi company in Sofia. Fixed prices, no surge. Great for late night trips when apps are expensive.",tip:"Call +359 2 973 2121 if app doesn't work. Always cheaper than airport unofficial taxis.",ios:"https://apps.apple.com/bg/app/ok-supertrans/id1234567890",android:"https://play.google.com/store/apps/details?id=bg.oksupertrans",web:"https://www.oktaxi.net",rating:4.2,free:true,cities:["sofia"]},
  {id:4,cat:"taxi",name:"Speed",icon:"🏎️",color:"#dc2626",bg:"#fef2f2",desc:"Popular Sofia taxi app. Good rates, professional drivers. English-language app available.",tip:"Great alternative when Bolt has surge pricing. Drivers usually speak some English.",ios:"https://apps.apple.com/bg/app/speed-taxi/id987654321",android:"https://play.google.com/store/apps/details?id=bg.speed.taxi",web:"https://speedtaxi.bg",rating:4.3,free:true,cities:["sofia"]},

  // ── PUBLIC TRANSPORT ──────────────────────────────────────────
  {id:5,cat:"transport",name:"Sofia Traffic",icon:"🚇",color:"#1d4ed8",bg:"#eff6ff",desc:"Official Sofia public transport app. Metro, bus, tram, trolley routes and real-time arrivals. Essential for daily commuting.",tip:"Buy a 10-trip card for big savings vs single tickets. Monthly cards are even better value.",ios:"https://apps.apple.com/bg/app/sofia-traffic",android:"https://play.google.com/store/apps/details?id=com.sofia.traffic",web:"https://www.sofiatraffic.bg",rating:4.1,free:true,cities:["sofia"]},
  {id:6,cat:"transport",name:"Moovit",icon:"🗺️",color:"#6366f1",bg:"#eef2ff",desc:"Best public transport navigation for Bulgaria. Works in Sofia, Plovdiv, Varna. Shows routes, live arrivals, connections. English language.",tip:"Works offline once you download the city map. Better UI than official apps.",ios:"https://apps.apple.com/app/moovit-transit-navigation/id498477945",android:"https://play.google.com/store/apps/details?id=com.tranzmate",web:"https://moovitapp.com",rating:4.5,free:true,cities:["sofia","plovdiv","varna"]},
  {id:7,cat:"transport",name:"BDZ Online",icon:"🚂",color:"#065f46",bg:"#ecfdf5",desc:"Bulgarian State Railways app. Book train tickets online. Intercity routes: Sofia–Plovdiv, Sofia–Varna, Sofia–Burgas. Much cheaper than bus.",tip:"Book 3+ days in advance for best prices. Scenic Vitosha–Plovdiv route is beautiful.",ios:"https://apps.apple.com/bg/app/bdz",android:"https://play.google.com/store/apps/details?id=bg.bdz.app",web:"https://bdz.bg",rating:3.8,free:true,cities:["all"]},
  {id:8,cat:"transport",name:"FlixBus",icon:"🟢",color:"#22c55e",bg:"#f0fdf4",desc:"Best intercity buses in Bulgaria. Sofia–Plovdiv, Sofia–Varna, Sofia–Burgas and international routes. Book in English.",tip:"Usually 30–40% cheaper than trains. Comfortable, Wi-Fi on board, USB charging.",ios:"https://apps.apple.com/app/flixbus/id1017262512",android:"https://play.google.com/store/apps/details?id=de.flixbus.journey",web:"https://flixbus.bg",rating:4.5,free:true,cities:["all"]},
  {id:9,cat:"transport",name:"Union-Ivkoni",icon:"🚌",color:"#7c3aed",bg:"#f5f3ff",desc:"Largest Bulgarian bus company. Nationwide routes. Book online in Bulgarian or English.",tip:"Good for routes FlixBus doesn't cover. Check their schedule for small town connections.",ios:"",android:"",web:"https://union-ivkoni.com",rating:3.9,free:true,cities:["all"]},

  // ── SCOOTERS & BIKES ──────────────────────────────────────────
  {id:10,cat:"scooter",name:"Tier",icon:"🛴",color:"#4f46e5",bg:"#eef2ff",desc:"Best e-scooter app in Sofia. Hundreds of scooters across the city. Easy to unlock, good battery life. Helmet available.",tip:"Park in designated zones to avoid fines. Morning rides are cheapest — fewer surge rates.",ios:"https://apps.apple.com/app/tier-e-scooter-sharing/id1436140272",android:"https://play.google.com/store/apps/details?id=com.tier.app",web:"https://tier.app",rating:4.4,free:true,cities:["sofia"]},
  {id:11,cat:"scooter",name:"Lime",icon:"🟢",color:"#65a30d",bg:"#f7fee7",desc:"E-scooters and e-bikes across Sofia. Well-maintained fleet. Good for medium distances.",tip:"E-bikes on Lime are worth the extra cost — go further without arriving sweaty!",ios:"https://apps.apple.com/app/lime/id1199780189",android:"https://play.google.com/store/apps/details?id=com.limebike",web:"https://li.me",rating:4.3,free:true,cities:["sofia"]},
  {id:12,cat:"scooter",name:"CityBike Sofia",icon:"🚲",color:"#0891b2",bg:"#ecfeff",desc:"Sofia's public bike-sharing system. 50+ stations, 500+ bikes. Day, week and monthly passes. Great for regular commuters.",tip:"Monthly pass is incredible value at ~€8. Stations are near all metro stops.",ios:"https://apps.apple.com/bg/app/citybike-sofia",android:"https://play.google.com/store/apps/details?id=bg.citybike",web:"https://citybike.bg",rating:4.0,free:false,cities:["sofia"]},

  // ── FOOD DELIVERY ─────────────────────────────────────────────
  {id:13,cat:"food",name:"Wolt",icon:"🔵",color:"#009de0",bg:"#e6f6fd",desc:"The best food delivery app in Bulgaria. 500+ restaurants in Sofia alone. Fast delivery, great variety, real-time tracking. English app.",tip:"Wolt+ subscription (~€5/month) gives free delivery on all orders — worth it if you order 3+ times/month.",ios:"https://apps.apple.com/app/wolt/id943905271",android:"https://play.google.com/store/apps/details?id=com.wolt.android",web:"https://wolt.com/bg",rating:4.8,free:true,cities:["sofia","plovdiv","varna","burgas"]},
  {id:14,cat:"food",name:"Glovo",icon:"🟡",color:"#ffc244",bg:"#fffbeb",desc:"Food, grocery and pharmacy delivery. Good coverage in Sofia and major cities. Often has better restaurant selection for specific cuisines.",tip:"Check Glovo vs Wolt for the same restaurant — prices and delivery fees vary.",ios:"https://apps.apple.com/app/glovo/id951412151",android:"https://play.google.com/store/apps/details?id=com.glovo",web:"https://glovoapp.com/bg",rating:4.5,free:true,cities:["sofia","plovdiv","varna"]},
  {id:15,cat:"food",name:"foodpanda",icon:"🐼",color:"#d70f64",bg:"#fdf2f8",desc:"Food delivery with good coverage across Bulgaria. Useful in cities where Wolt/Glovo have fewer options.",tip:"Good for ordering from smaller local restaurants not on Wolt. Check delivery zones.",ios:"https://apps.apple.com/app/foodpanda/id758103572",android:"https://play.google.com/store/apps/details?id=com.global.foodpanda.android",web:"https://foodpanda.bg",rating:4.1,free:true,cities:["sofia","plovdiv","varna","burgas"]},

  // ── GROCERY DELIVERY ─────────────────────────────────────────
  {id:16,cat:"grocery",name:"Blink",icon:"⚡",color:"#7c3aed",bg:"#f5f3ff",desc:"Fastest grocery delivery in Sofia. 15–30 minute delivery of essentials. Great selection of fresh produce, drinks, snacks.",tip:"Perfect for last-minute needs. Not the cheapest but the fastest grocery delivery available.",ios:"https://apps.apple.com/bg/app/blink-delivery",android:"https://play.google.com/store/apps/details?id=bg.blink.delivery",web:"https://blink.bg",rating:4.6,free:true,cities:["sofia"]},
  {id:17,cat:"grocery",name:"BILLA Online",icon:"🔴",color:"#cc0000",bg:"#fff5f5",desc:"Order groceries from BILLA supermarket for home delivery or click & collect. Full product range.",tip:"Set up a recurring weekly order to save time. Delivery slots fill up fast on weekends — book early.",ios:"https://apps.apple.com/bg/app/billa-online",android:"https://play.google.com/store/apps/details?id=bg.billa.online",web:"https://online.billa.bg",rating:4.0,free:true,cities:["sofia","plovdiv","varna"]},
  {id:18,cat:"grocery",name:"Kaufland Click & Collect",icon:"🛒",color:"#e2000f",bg:"#fff5f5",desc:"Order Kaufland groceries online for pickup or delivery. Good prices, wide selection.",tip:"Click & Collect is faster than delivery and saves on delivery fees. Ready in 2h.",ios:"",android:"",web:"https://kaufland.bg/online-shop",rating:3.9,free:true,cities:["sofia","plovdiv","varna","burgas"]},
  {id:19,cat:"grocery",name:"Wolt Grocery",icon:"🔵",color:"#009de0",bg:"#e6f6fd",desc:"Grocery delivery through Wolt app. Fantastico, Billa and other stores available. Same fast Wolt delivery.",tip:"If you already have Wolt+ you get free grocery delivery too. Very convenient.",ios:"https://apps.apple.com/app/wolt/id943905271",android:"https://play.google.com/store/apps/details?id=com.wolt.android",web:"https://wolt.com/bg",rating:4.7,free:true,cities:["sofia","plovdiv","varna"]},

  // ── SAVE MONEY ───────────────────────────────────────────────
  {id:20,cat:"savings",name:"Lidl Plus",icon:"💛",color:"#f0b800",bg:"#fffbeb",desc:"Massive weekly discounts at Lidl. Digital loyalty card, personalised coupons, scratch cards. Lidl is Bulgaria's best value supermarket.",tip:"Check the app every Monday for new coupons. Thursday fresh bread and pastries are incredible value.",ios:"https://apps.apple.com/app/lidl-plus/id1445881366",android:"https://play.google.com/store/apps/details?id=com.lidl.eci.lidlplus",web:"https://www.lidl.bg/plus",rating:4.6,free:true,cities:["all"]},
  {id:21,cat:"savings",name:"BILLA Club",icon:"🔴",color:"#cc0000",bg:"#fff5f5",desc:"BILLA loyalty card app. Points on every purchase, weekly discount products, digital receipts.",tip:"Always scan before paying — you often get 20-40% off random items each week.",ios:"https://apps.apple.com/bg/app/billa-club",android:"https://play.google.com/store/apps/details?id=bg.billa.loyaltyapp",web:"https://billa.bg/club",rating:4.1,free:true,cities:["all"]},
  {id:22,cat:"savings",name:"Kaufland Card",icon:"🟥",color:"#e2000f",bg:"#fff5f5",desc:"Kaufland loyalty card. Digital coupons, K-Classic brand deals, fuel discounts at partner stations.",tip:"K-Classic own brand products are excellent quality at 30-40% less than branded items.",ios:"https://apps.apple.com/bg/app/kaufland-card",android:"https://play.google.com/store/apps/details?id=bg.kaufland.kundenkarte",web:"https://kaufland.bg/kaufland-card",rating:4.0,free:true,cities:["all"]},
  {id:23,cat:"savings",name:"Penny+",icon:"🔵",color:"#0047AB",bg:"#eff6ff",desc:"Penny supermarket loyalty app. Good for basic groceries. Weekly deep discounts on selected items.",tip:"Penny has the best prices for basic staples — rice, pasta, oils, cleaning products.",ios:"https://apps.apple.com/bg/app/penny-plus",android:"https://play.google.com/store/apps/details?id=bg.penny.plus",web:"https://penny.bg",rating:3.8,free:true,cities:["all"]},
  {id:24,cat:"savings",name:"Revolut",icon:"⬛",color:"#191c20",bg:"#f5f5f5",desc:"Best card for saving money in Bulgaria. No foreign transaction fees, great exchange rates, cashback on purchases. Essential for expats.",tip:"Pay in € always when machines offer to convert currencies — Revolut gives you interbank rates.",ios:"https://apps.apple.com/app/revolut/id932493382",android:"https://play.google.com/store/apps/details?id=com.revolut.revolut",web:"https://revolut.com",rating:4.7,free:true,cities:["all"]},
  {id:25,cat:"savings",name:"Groupon Bulgaria",icon:"🟢",color:"#53a318",bg:"#f0fdf4",desc:"Deals on restaurants, spas, activities and experiences in Bulgaria. Great for trying new places at 30-70% off.",tip:"Sofia spa days and restaurants often 50% off. Check daily deals every morning.",ios:"https://apps.apple.com/app/groupon/id352683833",android:"https://play.google.com/store/apps/details?id=com.groupon",web:"https://www.groupon.bg",rating:4.2,free:true,cities:["sofia","plovdiv","varna"]},

  // ── FITNESS & WELLNESS ────────────────────────────────────────
  {id:26,cat:"fitness",name:"ClassPass",icon:"🏋️",color:"#ff5a5f",bg:"#fff5f5",desc:"Access hundreds of fitness classes across Bulgaria. Yoga, pilates, CrossFit, swimming, boxing. Use credits at multiple gyms.",tip:"New members get first month heavily discounted. Great way to try gyms before committing.",ios:"https://apps.apple.com/app/classpass/id680259447",android:"https://play.google.com/store/apps/details?id=com.classpass.classpass",web:"https://classpass.com/bg",rating:4.5,free:false,cities:["sofia","plovdiv","varna"]},
  {id:27,cat:"fitness",name:"Urban Sports Club",icon:"🏊",color:"#0f6af5",bg:"#eff6ff",desc:"Multi-gym access membership. One subscription for gym, pool, yoga, tennis across Bulgaria. Popular with expats.",tip:"M membership (~€40/month) gives access to 50+ facilities in Sofia alone. Great value.",ios:"https://apps.apple.com/app/urban-sports-club/id1086236051",android:"https://play.google.com/store/apps/details?id=com.urbansportsclub.android",web:"https://urbansportsclub.com/bg",rating:4.4,free:false,cities:["sofia","plovdiv","varna"]},
  {id:28,cat:"fitness",name:"Strava",icon:"🏃",color:"#fc4c02",bg:"#fff5f0",desc:"Running and cycling tracker. Join the Sofia Running Club community and Strava clubs for Bulgarian expats.",tip:"Vitosha Mountain has some of the best Strava segments in the Balkans. Check the local leaderboards.",ios:"https://apps.apple.com/app/strava/id426826309",android:"https://play.google.com/store/apps/details?id=com.strava",web:"https://strava.com",rating:4.6,free:true,cities:["all"]},
  {id:29,cat:"fitness",name:"MyFitnessPal",icon:"🥗",color:"#0066cc",bg:"#eff6ff",desc:"Calorie and nutrition tracker. Bulgarian foods and restaurant dishes in the database. Syncs with most fitness trackers.",tip:"Scan barcodes of Bulgarian supermarket products — most are in the database already.",ios:"https://apps.apple.com/app/myfitnesspal/id341232718",android:"https://play.google.com/store/apps/details?id=com.myfitnesspal.android",web:"https://myfitnesspal.com",rating:4.5,free:true,cities:["all"]},
  {id:30,cat:"fitness",name:"Freeletics",icon:"💪",color:"#ff0050",bg:"#fff5f8",desc:"Bodyweight workout app. No gym needed. Great for when you first arrive and haven't found a gym yet.",tip:"The free version has enough workouts to get started. Perfect for Vitosha Mountain workout sessions.",ios:"https://apps.apple.com/app/freeletics-fitness-workouts/id654810212",android:"https://play.google.com/store/apps/details?id=com.freeletics.lite",web:"https://freeletics.com",rating:4.4,free:true,cities:["all"]},
  {id:31,cat:"fitness",name:"Calm",icon:"🧘",color:"#5573c2",bg:"#eef2ff",desc:"Meditation and sleep app. Essential for managing the stress of relocation. Bulgarian content available.",tip:"Use Calm during your first weeks — relocating is stressful. The sleep stories work brilliantly.",ios:"https://apps.apple.com/app/calm/id571800810",android:"https://play.google.com/store/apps/details?id=com.calm.android",web:"https://calm.com",rating:4.7,free:false,cities:["all"]},

  // ── HEALTH & MEDICAL ─────────────────────────────────────────
  {id:32,cat:"health",name:"Doctrina.bg",icon:"👨‍⚕️",color:"#0891b2",bg:"#ecfeff",desc:"Book doctor appointments online in Bulgaria. GPs, specialists, dentists. Some English-speaking doctors listed.",tip:"Filter by 'English-speaking' to find expat-friendly doctors. Tokuda and Acibadem hospitals are on there.",ios:"",android:"",web:"https://doctrina.bg",rating:4.2,free:true,cities:["sofia","plovdiv","varna"]},
  {id:33,cat:"health",name:"Zdravei.bg",icon:"💊",color:"#16a34a",bg:"#f0fdf4",desc:"Online pharmacy Bulgaria. Order medicines for delivery or pickup. Check medicine availability and compare prices.",tip:"Much cheaper than pharmacy walk-in for non-urgent medicines. Next-day delivery in Sofia.",ios:"",android:"",web:"https://zdravei.bg",rating:4.3,free:true,cities:["sofia","plovdiv","varna"]},
  {id:34,cat:"health",name:"NHIF Check (PIS)",icon:"🏛️",color:"#7c3aed",bg:"#f5f3ff",desc:"Check your NHIF (public health insurance) status online. Verify you're registered, see your GP, check contributions.",tip:"Register here before visiting a Bulgarian public doctor — they'll check your status in the system.",ios:"",android:"",web:"https://pis.nhif.bg",rating:3.5,free:true,cities:["all"]},
  {id:35,cat:"health",name:"Vemedico",icon:"🩺",color:"#0ea5e9",bg:"#f0f9ff",desc:"Online doctor consultations in Bulgaria. Video calls with English-speaking doctors. Quick diagnosis and prescriptions.",tip:"Brilliant for minor illnesses when you don't want to navigate Bulgarian public health system.",ios:"https://apps.apple.com/bg/app/vemedico",android:"https://play.google.com/store/apps/details?id=bg.vemedico",web:"https://vemedico.bg",rating:4.4,free:false,cities:["all"]},
  {id:36,cat:"health",name:"Tokuda Hospital App",icon:"🏥",color:"#dc2626",bg:"#fef2f2",desc:"Book appointments at Tokuda Hospital Sofia directly. One of the best English-speaking hospitals. Specialists, tests, check-ups.",tip:"Use the app to book specific English-speaking specialists. Faster than calling.",ios:"https://apps.apple.com/bg/app/tokuda",android:"https://play.google.com/store/apps/details?id=bg.tokuda.app",web:"https://tokudabolnitsa.bg",rating:4.1,free:true,cities:["sofia"]},

  // ── ONLINE SHOPPING ──────────────────────────────────────────
  {id:37,cat:"shopping",name:"eMAG",icon:"🛍️",color:"#f97316",bg:"#fff7ed",desc:"Bulgaria's Amazon. Biggest online store — electronics, appliances, fashion, baby products. Fast delivery, easy returns. English available.",tip:"Friday sales are massive. Add items to wishlist and wait for flash deals. Usually 30-60% off.",ios:"https://apps.apple.com/bg/app/emag",android:"https://play.google.com/store/apps/details?id=ro.emag.mobile",web:"https://emag.bg",rating:4.6,free:true,cities:["all"]},
  {id:38,cat:"shopping",name:"OLX Bulgaria",icon:"🔵",color:"#002f34",bg:"#f0f9ff",desc:"Buy and sell secondhand in Bulgaria. Furniture, electronics, cars, clothes. Great for furnishing your new home cheaply.",tip:"Negotiate! Prices are always negotiable on OLX. Start at 60-70% of asking price.",ios:"https://apps.apple.com/bg/app/olx",android:"https://play.google.com/store/apps/details?id=com.olx.southeasteurope",web:"https://olx.bg",rating:4.3,free:true,cities:["all"]},
  {id:39,cat:"shopping",name:"Ozone.bg",icon:"🔷",color:"#1d4ed8",bg:"#eff6ff",desc:"Best Bulgarian electronics store. Laptops, phones, TVs, gaming. Price match, extended warranty, good support.",tip:"Check ozone.bg before Amazon — often same price but faster delivery and local warranty.",ios:"https://apps.apple.com/bg/app/ozone",android:"https://play.google.com/store/apps/details?id=bg.ozone.android",web:"https://ozone.bg",rating:4.5,free:true,cities:["all"]},
  {id:40,cat:"shopping",name:"Fashion Days",icon:"👗",color:"#be185d",bg:"#fdf2f8",desc:"Bulgarian fashion deals. Branded clothes at 30–70% discount. Fast delivery, easy returns. Popular with expat women.",tip:"End of season sales are insane. Sign up for email alerts — deals sell out in hours.",ios:"https://apps.apple.com/bg/app/fashion-days",android:"https://play.google.com/store/apps/details?id=ro.fashiondays.app",web:"https://fashiondays.bg",rating:4.4,free:true,cities:["all"]},
  {id:41,cat:"shopping",name:"Pazaruvaj.com",icon:"📊",color:"#059669",bg:"#ecfdf5",desc:"Bulgarian price comparison site. Find the cheapest price for any product across all Bulgarian online stores.",tip:"Always check Pazaruvaj before buying anything online in Bulgaria. Saves 10-40% regularly.",ios:"",android:"",web:"https://pazaruvaj.com",rating:4.4,free:true,cities:["all"]},

  // ── MUST-HAVE PRACTICAL ────────────────────────────────────────
  {id:42,cat:"practical",name:"Viber",icon:"💜",color:"#7360f2",bg:"#f5f3ff",desc:"The most used messaging app in Bulgaria. Everyone uses Viber — landlords, doctors, tradespeople, friends. More important than WhatsApp here.",tip:"Install this on day 1. Most Bulgarians will send you their Viber number, not WhatsApp.",ios:"https://apps.apple.com/app/viber-messenger/id382617920",android:"https://play.google.com/store/apps/details?id=com.viber.voip",web:"https://viber.com",rating:4.5,free:true,cities:["all"]},
  {id:43,cat:"practical",name:"Revolut",icon:"⬛",color:"#191c20",bg:"#f5f5f5",desc:"Best banking app for expats in Bulgaria. Multi-currency, instant transfers, crypto, insurance, great rates. Essential.",tip:"Get the Metal card for cashback on all purchases. Pays for itself quickly.",ios:"https://apps.apple.com/app/revolut/id932493382",android:"https://play.google.com/store/apps/details?id=com.revolut.revolut",web:"https://revolut.com",rating:4.7,free:true,cities:["all"]},
  {id:44,cat:"practical",name:"Wise",icon:"🟢",color:"#00b9ff",bg:"#e6f9ff",desc:"Send money internationally at real exchange rate. Perfect for receiving salary from abroad or sending money home. Used by most expat freelancers.",tip:"Set up a EUR account on Wise to receive money from Bulgarian employers without conversion fees.",ios:"https://apps.apple.com/app/wise-money-transfer/id612261027",android:"https://play.google.com/store/apps/details?id=com.transferwise.android",web:"https://wise.com",rating:4.8,free:true,cities:["all"]},
  {id:45,cat:"practical",name:"Speedy",icon:"📦",color:"#e17000",bg:"#fff7ed",desc:"Bulgaria's largest parcel delivery company. Track shipments, find pickup points, schedule deliveries. Most online orders use Speedy.",tip:"Set up a Speedy account to redirect packages to a nearby office if you miss delivery.",ios:"https://apps.apple.com/bg/app/speedy",android:"https://play.google.com/store/apps/details?id=com.speedy.app",web:"https://speedy.bg",rating:4.3,free:true,cities:["all"]},
  {id:46,cat:"practical",name:"Econt",icon:"📫",color:"#004b9b",bg:"#eff6ff",desc:"Second largest courier in Bulgaria. Extensive network of offices and ECONT-O machines (like Amazon lockers).",tip:"The ECONT-O machine near you is a game changer — 24/7 pickup, no waiting for delivery.",ios:"https://apps.apple.com/bg/app/econt",android:"https://play.google.com/store/apps/details?id=bg.econt.mobile",web:"https://econt.com",rating:4.4,free:true,cities:["all"]},
  {id:47,cat:"practical",name:"Google Translate",icon:"🌐",color:"#4285f4",bg:"#eff6ff",desc:"Essential daily tool. Bulgarian Cyrillic camera translation is a lifesaver for menus, forms and signs. Download offline Bulgarian pack.",tip:"Use camera mode to instantly translate Cyrillic signs, menus, and official letters. Life-changing.",ios:"https://apps.apple.com/app/google-translate/id414706506",android:"https://play.google.com/store/apps/details?id=com.google.android.apps.translate",web:"https://translate.google.com",rating:4.7,free:true,cities:["all"]},
  {id:48,cat:"practical",name:"ePay.bg",icon:"💳",color:"#003087",bg:"#eff6ff",desc:"Bulgarian online payment platform. Pay utilities (electricity, water, internet), taxes, municipality fees. Used by most Bulgarians.",tip:"Link your bank account or card and pay all Bulgarian bills in one place. Saves massive time.",ios:"https://apps.apple.com/bg/app/epay",android:"https://play.google.com/store/apps/details?id=bg.epay.mobile",web:"https://epay.bg",rating:4.0,free:true,cities:["all"]},
  {id:49,cat:"practical",name:"Imoti.net",icon:"🏠",color:"#e11d48",bg:"#fdf2f8",desc:"Biggest property listings site in Bulgaria. Find apartments to rent or buy. Search by area, price, size. English filter available.",tip:"Set up alerts for your search criteria. Good apartments in Lozenets go within hours.",ios:"https://apps.apple.com/bg/app/imoti-net",android:"https://play.google.com/store/apps/details?id=bg.imoti.net",web:"https://imoti.net",rating:4.2,free:true,cities:["all"]},
  {id:50,cat:"practical",name:"Yettel MyYettel",icon:"📱",color:"#e4003c",bg:"#fff5f8",desc:"Manage your Yettel (one of Bulgaria's main mobile operators) account. Check data usage, pay bills, change plan.",tip:"Yettel has the best data deals for expats. 20GB for ~€13/month. EU roaming included.",ios:"https://apps.apple.com/bg/app/myyettel",android:"https://play.google.com/store/apps/details?id=bg.yettel.selfcare",web:"https://yettel.bg",rating:4.1,free:true,cities:["all"]},
]

// ── Apps Directory Page ───────────────────────────────────────────
function AppsPage(){
  const [cat,setCat]=useState("all")
  const [search,setSearch]=useState("")
  const filtered=BG_APPS.filter(a=>{
    const matchCat=cat==="all"||a.cat===cat
    const matchSearch=!search||a.name.toLowerCase().includes(search.toLowerCase())||a.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat&&matchSearch
  })
  const catObj=BG_APP_CATS.find(c=>c.id===cat)

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#3730a3)",padding:"32px 20px 44px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(22px,4vw,36px)",fontWeight:400,margin:"0 0 6px"}}>📱 Bulgaria App Directory</h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:15,margin:"0 0 18px",fontWeight:300}}>50 essential apps for expat life in Bulgaria — transport, food, health, shopping and more</p>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search apps..." style={{width:"100%",maxWidth:400,border:"none",borderRadius:12,padding:"11px 16px",fontSize:14,outline:"none",background:"rgba(255,255,255,0.15)",color:"#fff",boxSizing:"border-box"}}/>
        </div>
      </div>

      {/* Category filter */}
      <div style={{background:"#1e1b4b",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:"10px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:6}}>
          {BG_APP_CATS.map(c=>(
            <button key={c.id} onClick={()=>{setCat(c.id);setSearch("")}}
              style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${cat===c.id?"#a5b4fc":"rgba(255,255,255,0.15)"}`,background:cat===c.id?"rgba(165,180,252,0.15)":"transparent",color:cat===c.id?"#a5b4fc":"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:12,fontWeight:cat===c.id?700:400,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 20px"}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>{filtered.length} apps{cat!=="all"?" in "+((catObj&&catObj.label)||""):" "}{search?" matching \""+search+"\"":""}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
          {filtered.map(app=>(
            <div key={app.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.05)",transition:"transform 0.2s,box-shadow 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.08)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.05)"}}>
              {/* App header */}
              <div style={{background:app.bg,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:44,height:44,borderRadius:12,background:app.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
                  {app.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:C.text}}>{app.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    {"★★★★★".slice(0,Math.round(app.rating)).split("").map((_,i)=><span key={i} style={{color:"#f59e0b",fontSize:11}}>★</span>)}
                    <span style={{fontSize:11,color:C.muted}}>{app.rating}</span>
                    {!app.free&&<span style={{fontSize:10,color:"#7c3aed",background:"#f3e8ff",padding:"1px 6px",borderRadius:6,fontWeight:600}}>Paid</span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:4}}>
                  {app.ios&&<div style={{width:20,height:20,borderRadius:4,background:"#000",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff"}}>🍎</div>}
                  {app.android&&<div style={{width:20,height:20,borderRadius:4,background:"#3ddc84",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🤖</div>}
                  {app.web&&!app.ios&&!app.android&&<div style={{width:20,height:20,borderRadius:4,background:"#6366f1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff"}}>🌐</div>}
                </div>
              </div>
              {/* App body */}
              <div style={{padding:"12px 16px"}}>
                <p style={{fontSize:13,color:C.text,margin:"0 0 10px",lineHeight:1.6}}>{app.desc}</p>
                <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"8px 10px",marginBottom:12,fontSize:12,color:"#92400e",display:"flex",gap:6}}>
                  <span style={{flexShrink:0}}>💡</span><span><strong>Tip:</strong> {app.tip}</span>
                </div>
                <div style={{display:"flex",gap:6}}>
                  {app.ios&&<a href={app.ios} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"#000",color:"#fff",borderRadius:8,padding:"7px",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>🍎 App Store</a>}
                  {app.android&&<a href={app.android} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"#3ddc84",color:"#000",borderRadius:8,padding:"7px",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>🤖 Play Store</a>}
                  {app.web&&<a href={app.web} target="_blank" rel="noopener noreferrer" style={{flex:!app.ios&&!app.android?2:1,background:"#6366f1",color:"#fff",borderRadius:8,padding:"7px",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>🌐 Open website</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"60px",color:C.muted}}><div style={{fontSize:32,marginBottom:8}}>📱</div><p>No apps found. Try a different search.</p></div>}
      </div>
    </div>
  )
}

// ── Connect / Dating data ─────────────────────────────────────────
const INIT_PROFILES = [
  {id:1,name:"BGexpats",age:0,from:"Team",city:"sofia",flag:"🌹",bio:"Official BGexpats account. We connect expats and Bulgarians across Bulgaria. Create your profile to be one of the first members!",lookingFor:"friends",languages:["English","Bulgarian"],interests:["travel","community","culture"],gender:"X",av:"BG",verified:true,online:true,team:true},
]

const LOOKING_FOR_OPTS = [
  {v:"all",        l:"Everyone",         icon:"💫", tier:"free"},
  {v:"friends",    l:"Expat Friends",    icon:"🤝", tier:"basic"},
  {v:"networking", l:"Networking",       icon:"💼", tier:"basic"},
  {v:"roommate",   l:"Roommate Finder",  icon:"🏠", tier:"basic"},
  {v:"dating",     l:"Dating",           icon:"💘", tier:"premium"},
]

const INTEREST_TAGS = ["travel","hiking","cooking","music","art","yoga","photography","tech","dancing","reading","sports","wine","cinema","outdoors","cycling"]

// ── Connect Page ──────────────────────────────────────────────────
function ConnectPage({user,setView,subscription}){
  const [profiles,setProfiles]=useState(INIT_PROFILES)
  const [myAvatar,setMyAvatar]=useState(()=>user?loadAvatar(user.email):null)
  const [avatarUploading,setAvatarUploading]=useState(false)

  const uploadAvatar=async(e)=>{
    const file=e.target.files[0]
    if(!file)return
    if(file.size>3*1024*1024){alert("Max 3MB for profile picture");return}
    setAvatarUploading(true)
    const base64=await readFileAsBase64(file)
    saveAvatar(user.email,base64)
    setMyAvatar(base64)
    setAvatarUploading(false)
  }
  const [liked,setLiked]=useState({})
  const [filterCity,setFilterCity]=useState("all")
  const [filterLooking,setFilterLooking]=useState("all")
  const [filterFrom,setFilterFrom]=useState("all")
  const [showCreate,setShowCreate]=useState(false)
  const [showSafety,setShowSafety]=useState(false)
  const [selected,setSelected]=useState(null)
  const [newProfile,setNewProfile]=useState({name:"",age:"",bio:"",lookingFor:"friends",city:"sofia",languages:[],interests:[],gender:"M"})

  const tier=(subscription&&subscription.plan)||"free"
  const isBasic=tier==="basic"||tier==="premium"
  const isPremium=tier==="premium"

  const filtered=profiles.filter(p=>{
    if(filterCity!=="all"&&p.city!==filterCity)return false
    if(filterLooking!=="all"&&p.lookingFor!==filterLooking)return false
    if(filterFrom==="expat"&&p.from==="Bulgarian")return false
    if(filterFrom==="bulgarian"&&p.from!=="Bulgarian")return false
    return true
  })
  const safeFiltered=filtered.filter(p=>p.lookingFor!=="dating"||isPremium)
  const visible=user?(isBasic?safeFiltered:safeFiltered.slice(0,4)):safeFiltered.slice(0,3)

  const toggleLike=(id)=>{
    if(!user){setView("login");return}
    if(!isBasic){setView("pricing");return}
    setLiked(p=>({...p,[id]:!p[id]}))
  }

  const submitProfile=()=>{
    if(!newProfile.name||!newProfile.age||!newProfile.bio)return
    const p={...newProfile,id:Date.now(),flag:"👤",from:"Expat",av:newProfile.name.slice(0,2).toUpperCase(),verified:false,online:true}
    setProfiles(prev=>[p,...prev])
    setShowCreate(false)
  }

  const cities=[{v:"all",l:"All cities"},{v:"sofia",l:"Sofia"},{v:"plovdiv",l:"Plovdiv"},{v:"varna",l:"Varna"},{v:"burgas",l:"Burgas"},{v:"bansko",l:"Bansko"}]
  const fromOpts=[{v:"all",l:"Everyone"},{v:"bulgarian",l:"Bulgarians 🇧🇬"},{v:"expat",l:"Expats 🌍"}]

  return(
    <div style={{minHeight:"100vh",background:C.page}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#6b21a8,#9333ea)",padding:"32px 20px 44px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(24px,4vw,38px)",fontWeight:400,margin:"0 0 6px"}}>💑 Meet & Connect</h1>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:15,margin:"0 0 10px",fontWeight:300}}>Connect expats and Bulgarians across Bulgaria</p>
          <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
            {[["🤝","Expat Friends","Basic"],["💼","Networking","Basic"],["🏠","Roommate Finder","Basic"],["💘","Dating","Premium"]].map(([icon,label,tier])=>(
              <span key={label} style={{background:"rgba(255,255,255,0.12)",border:`1px solid rgba(255,255,255,${tier==="Premium"?"0.4":"0.15"})`,borderRadius:20,padding:"4px 12px",fontSize:12,color:tier==="Premium"?"#f0c060":"rgba(255,255,255,0.85)",fontWeight:tier==="Premium"?600:400}}>
                {icon} {label} {tier==="Premium"&&"✨"}
              </span>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {user?(
              <button onClick={()=>setShowCreate(!showCreate)} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                {showCreate?"✕ Close":"✏️ Create my profile"}
              </button>
            ):(
              <button onClick={()=>setView("login")} style={{background:"#fff",border:"none",color:"#6b21a8",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>
                Sign in to create your profile →
              </button>
            )}
            <button onClick={()=>setShowSafety(!showSafety)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.8)",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontSize:14}}>
              🛡️ Safety tips
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"-24px auto 48px",padding:"0 20px"}}>

        {/* Safety Tips */}
        {showSafety&&(
          <div style={{background:"#fff9f0",border:"1px solid #f0d9b0",borderRadius:14,padding:"18px 20px",marginBottom:16}}>
            <div style={{fontSize:15,fontWeight:600,color:"#8a5a1a",marginBottom:12}}>🛡️ Stay safe when connecting with new people</div>
            {["Never share your home address, phone number or financial details with people you just met","Always meet for the first time in a public place — café, restaurant, park","Tell a friend or family member where you are going","Trust your instincts — if something feels off, it probably is","Video call before meeting in person","BGexpats does not perform background checks on users — use your own judgement"].map((tip,i)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"5px 0",fontSize:13,color:"#8a5a1a"}}><span>•</span><span>{tip}</span></div>
            ))}
          </div>
        )}

        {/* Create profile form */}
        {showCreate&&user&&(
          <div style={{background:C.surface,border:`1px solid #9333ea30`,borderRadius:16,padding:"22px",marginBottom:16,boxShadow:"0 4px 20px rgba(107,33,168,0.1)"}}>
            <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:16}}>✏️ Your profile</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>First name only</label>
                <input value={newProfile.name} onChange={e=>setNewProfile(p=>({...p,name:e.target.value}))} placeholder="Maria" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>Age</label>
                <input type="number" value={newProfile.age} onChange={e=>setNewProfile(p=>({...p,age:e.target.value}))} placeholder="28" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>About you (max 200 characters)</label>
              <textarea value={newProfile.bio} onChange={e=>setNewProfile(p=>({...p,bio:e.target.value.slice(0,200)}))} placeholder="Tell people a bit about yourself, what you enjoy, what you're looking for..." style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:14,outline:"none",color:C.text,background:C.page,resize:"none",height:80,fontFamily:"inherit",boxSizing:"border-box"}}/>
              <div style={{fontSize:11,color:C.muted,textAlign:"right"}}>{newProfile.bio.length}/200</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>I am</label>
                <select value={newProfile.gender} onChange={e=>setNewProfile(p=>({...p,gender:e.target.value}))} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:14,outline:"none",color:C.text,background:C.page}}>
                  <option value="M">Man</option>
                  <option value="F">Woman</option>
                  <option value="X">Non-binary / Other</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>My city</label>
                <select value={newProfile.city} onChange={e=>setNewProfile(p=>({...p,city:e.target.value}))} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:14,outline:"none",color:C.text,background:C.page}}>
                  {cities.filter(c=>c.v!=="all").map(c=><option key={c.v} value={c.v}>{c.l}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>Looking for</label>
                <select value={newProfile.lookingFor} onChange={e=>setNewProfile(p=>({...p,lookingFor:e.target.value}))} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:14,outline:"none",color:C.text,background:C.page}}>
                  <option value="relationship">❤️ Relationship</option>
                  <option value="friends">🤝 Friends</option>
                </select>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:6}}>Interests (select all that apply)</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {INTEREST_TAGS.map(tag=>{
                  const sel=newProfile.interests.includes(tag)
                  return<button key={tag} onClick={()=>setNewProfile(p=>({...p,interests:sel?p.interests.filter(i=>i!==tag):[...p.interests,tag]}))} style={{padding:"4px 12px",borderRadius:14,border:`1.5px solid ${sel?"#9333ea":C.border}`,background:sel?"#f3e8ff":"transparent",color:sel?"#6b21a8":C.muted,cursor:"pointer",fontSize:12,fontWeight:sel?600:400}}>{tag}</button>
                })}
              </div>
            </div>
            <button onClick={submitProfile} disabled={!newProfile.name||!newProfile.age||!newProfile.bio}
              style={{background:newProfile.name&&newProfile.age&&newProfile.bio?"#9333ea":"#ccc",border:"none",color:"#fff",padding:"11px 24px",borderRadius:10,cursor:newProfile.name&&newProfile.age&&newProfile.bio?"pointer":"default",fontSize:14,fontWeight:700}}>
              Publish my profile →
            </button>
          </div>
        )}

        {/* Filters */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{display:"flex",gap:6}}>
            {fromOpts.map(o=><button key={o.v} onClick={()=>setFilterFrom(o.v)} style={{padding:"6px 12px",borderRadius:16,border:`1.5px solid ${filterFrom===o.v?"#9333ea":C.border}`,background:filterFrom===o.v?"#f3e8ff":"transparent",color:filterFrom===o.v?"#6b21a8":C.muted,cursor:"pointer",fontSize:12,fontWeight:filterFrom===o.v?700:400}}>{o.l}</button>)}
          </div>
          <div style={{display:"flex",gap:6}}>
            {LOOKING_FOR_OPTS.map(o=>{
              const isDating=o.v==="dating"
              const locked=isDating&&!isPremium
              return(
                <button key={o.v}
                  onClick={()=>locked?setView("pricing"):setFilterLooking(o.v)}
                  style={{padding:"6px 14px",borderRadius:16,border:`1.5px solid ${filterLooking===o.v?"#9333ea":isDating&&!isPremium?"#f0c060":C.border}`,background:filterLooking===o.v?"#f3e8ff":isDating&&!isPremium?"#fffbeb":"transparent",color:filterLooking===o.v?"#6b21a8":isDating&&!isPremium?"#92400e":C.muted,cursor:"pointer",fontSize:12,fontWeight:filterLooking===o.v?700:400,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                  {o.icon} {o.l}
                  {locked&&<span style={{fontSize:9,background:"#f0c060",color:"#1a3a20",padding:"1px 5px",borderRadius:4,fontWeight:700}}>PRO</span>}
                </button>
              )
            })}
          </div>
          <select value={filterCity} onChange={e=>setFilterCity(e.target.value)} style={{border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 12px",fontSize:12,color:C.text,background:C.page,outline:"none"}}>
            {cities.map(c=><option key={c.v} value={c.v}>{c.l}</option>)}
          </select>
          <span style={{fontSize:12,color:C.muted,marginLeft:"auto"}}>{visible.filter(p=>!p.team).length > 0 ? `${visible.length} members` : "Be the first member!"}</span>
        </div>

        {/* Dating upsell */}
        {filterLooking==="dating"&&!isPremium&&(
          <div style={{background:"linear-gradient(135deg,#fdf4ff,#ede9fe)",border:"1.5px solid #a855f730",borderRadius:16,padding:"24px",marginBottom:20,textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:12}}>💘</div>
            <h3 style={{fontSize:18,fontWeight:700,color:"#7c3aed",margin:"0 0 8px"}}>Dating & Romance — Premium only</h3>
            <p style={{color:"#6b21a8",fontSize:14,margin:"0 0 6px"}}>Meet expats and Bulgarians looking for a real relationship.</p>
            <p style={{color:C.muted,fontSize:13,margin:"0 0 20px"}}>Upgrade to Premium (€6.49/month) to unlock Dating profiles, direct messages and verified matches.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>setView("pricing")} style={{background:"linear-gradient(135deg,#7c3aed,#9333ea)",border:"none",color:"#fff",padding:"11px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>
                Upgrade to Premium →
              </button>
              <button onClick={()=>setFilterLooking("friends")} style={{background:"transparent",border:"1.5px solid #9333ea",color:"#7c3aed",padding:"11px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                Browse Expat Friends instead
              </button>
            </div>
          </div>
        )}

        {/* Profile grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:24}}>
          {visible.map(p=>{
            const isLiked=liked[p.id]
            const lookColor=p.lookingFor==="dating"?"#dc2626":p.lookingFor==="friends"?"#1d4ed8":p.lookingFor==="networking"?"#0891b2":p.lookingFor==="roommate"?"#059669":"#7c3aed"
            return(
              <div key={p.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)",transition:"transform 0.2s,box-shadow 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"}}>

                {/* Card header */}
                <div style={{background:"linear-gradient(135deg,#6b21a8,#9333ea)",padding:"20px",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"2.5px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {p.av}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                      <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>{p.name}, {p.age}</span>
                      {p.verified&&<span style={{fontSize:11,background:"rgba(255,255,255,0.2)",color:"#fff",padding:"1px 6px",borderRadius:8}}>✓ verified</span>}
                    </div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",display:"flex",alignItems:"center",gap:6}}>
                      <span>{p.flag} {p.from}</span>
                      <span>·</span>
                      <span style={{textTransform:"capitalize"}}>{p.city}</span>
                      {p.online&&<span>·</span>}
                      {p.online&&<span style={{color:"#4ade80"}}>● online</span>}
                    </div>
                  </div>
                </div>

                <div style={{padding:"14px 16px"}}>
                  {/* Looking for badge */}
                  <div style={{display:"inline-flex",alignItems:"center",gap:4,background:`${lookColor}12`,border:`1px solid ${lookColor}30`,borderRadius:10,padding:"3px 10px",marginBottom:10,fontSize:12,fontWeight:600,color:lookColor}}>
                    {p.lookingFor==="friends"?"🤝 Expat Friends":p.lookingFor==="networking"?"💼 Networking":p.lookingFor==="roommate"?"🏠 Roommate":p.lookingFor==="dating"?"💘 Dating":"💫 "+p.lookingFor}
                  </div>

                  {/* Bio */}
                  <p style={{fontSize:13,color:C.text,margin:"0 0 12px",lineHeight:1.6}}>{p.bio.slice(0,120)}{p.bio.length>120?"...":""}</p>

                  {/* Languages */}
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                    {p.languages.slice(0,3).map(l=>(
                      <span key={l} style={{fontSize:11,background:C.page,border:`1px solid ${C.border}`,borderRadius:8,padding:"2px 7px",color:C.muted}}>🗣️ {l}</span>
                    ))}
                  </div>

                  {/* Interests */}
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                    {p.interests.slice(0,4).map(i=>(
                      <span key={i} style={{fontSize:11,background:"#f3e8ff",border:"1px solid #e9d5ff",borderRadius:8,padding:"2px 7px",color:"#6b21a8"}}>{i}</span>
                    ))}
                    {p.interests.length>4&&<span style={{fontSize:11,color:C.muted}}>+{p.interests.length-4}</span>}
                  </div>

                  {/* Action buttons */}
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>toggleLike(p.id)}
                      style={{flex:1,background:isLiked?"#fce7f3":"transparent",border:`1.5px solid ${isLiked?"#ec4899":C.border}`,color:isLiked?"#ec4899":C.muted,padding:"9px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:isLiked?700:400,transition:"all 0.2s"}}>
                      {isLiked?"❤️ Interested":"🤍 Like"}
                    </button>
                    <button onClick={()=>{
                      if(!user){setView("login");return}
                      if(!isPremium){setView("pricing");return}
                      alert(`Message feature coming soon! For now, connect via the community forum.`)
                    }}
                      style={{flex:1,background:isPremium?"#9333ea":"transparent",border:`1.5px solid ${isPremium?"#9333ea":C.border}`,color:isPremium?"#fff":C.muted,padding:"9px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:5,transition:"all 0.2s"}}>
                      {isPremium?"💬 Message":"💬 Premium"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Upgrade gates */}
        {!user&&(
          <div style={{background:"linear-gradient(135deg,#6b21a8,#9333ea)",borderRadius:16,padding:"28px",textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:10}}>💑</div>
            <h3 style={{color:"#fff",fontSize:18,fontWeight:700,margin:"0 0 8px"}}>See all {profiles.length} profiles</h3>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:14,margin:"0 0 18px"}}>Sign in free to see all members and express interest</p>
            <button onClick={()=>setView("login")} style={{background:"#fff",border:"none",color:"#6b21a8",padding:"12px 28px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:700}}>Sign up free →</button>
          </div>
        )}
        {user&&!isBasic&&(
          <div style={{background:"#fce7f3",border:"1px solid #f9a8d4",borderRadius:16,padding:"20px",textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:8}}>🤍 Like profiles with Basic</div>
            <p style={{fontSize:13,color:"#9f1239",margin:"0 0 14px"}}>Upgrade to Basic (€3.99/month) to like profiles and show your interest</p>
            <button onClick={()=>setView("pricing")} style={{background:"#ec4899",border:"none",color:"#fff",padding:"10px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>Upgrade to Basic →</button>
          </div>
        )}
        {user&&isBasic&&!isPremium&&(
          <div style={{background:"linear-gradient(135deg,#6b21a8,#9333ea)",borderRadius:16,padding:"20px",textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:8}}>💬 Send messages with Premium</div>
            <p style={{color:"rgba(255,255,255,0.8)",fontSize:13,margin:"0 0 14px"}}>Upgrade to Premium (€6.49/month) to send direct messages to people you connect with</p>
            <button onClick={()=>setView("pricing")} style={{background:"#f0c060",border:"none",color:"#1a3a20",padding:"10px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>Upgrade to Premium →</button>
          </div>
        )}

        {/* Disclaimer */}
        <p style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:20,lineHeight:1.6}}>
          BGexpats Connect is a community feature for adults 18+. We do not perform background checks. Always meet new people in public places. Report any inappropriate behaviour using the flag button.
        </p>
      </div>
    </div>
  )
}


// ── Document Deadline Tracker ─────────────────────────────────────
const DOC_TYPES = [
  {id:"visa_d",      label:"Type D Visa",                icon:"🛂", tip:"Apply for renewal at the Bulgarian Embassy in your home country. Allow 30+ days processing time.",renewBefore:30},
  {id:"temp_res",    label:"Temporary Residence Permit", icon:"📋", tip:"Renew at your local Migration Directorate. Bring all original documents + copies + photos.",renewBefore:30},
  {id:"perm_res",    label:"Permanent Residence Permit", icon:"🏠", tip:"Valid indefinitely. Renew the associated ID card every 10 years.",renewBefore:60},
  {id:"nhif",        label:"NHIF Health Insurance",      icon:"🏥", tip:"Self-employed pay monthly by the 25th. Employed — employer handles it automatically.",renewBefore:7},
  {id:"eood_annual", label:"EOOD Annual Tax Filing",     icon:"🏢", tip:"Annual corporate tax declaration due 31 March. Your accountant should handle this.",renewBefore:45},
  {id:"eood_vat",    label:"VAT Monthly Filing",         icon:"📊", tip:"VAT-14 declaration due 14th of the following month. Your accountant files this.",renewBefore:7},
  {id:"eood_gfr",    label:"EOOD Annual Report (NSI)",   icon:"📑", tip:"Annual statistics report due 31 March. File at NSI (statistics agency).",renewBefore:30},
  {id:"driving",     label:"Driving Licence Exchange",   icon:"🚗", tip:"Exchange your foreign licence within 12 months of getting residency. Go to KAT Sofia.",renewBefore:30},
  {id:"passport",    label:"Passport",                   icon:"📘", tip:"Renew at your home country's embassy or consulate in Bulgaria. Check processing times.",renewBefore:90},
  {id:"id_card",     label:"Bulgarian ID Card",          icon:"🪪", tip:"Renew at local municipality office (Obshtina). Bring residence permit and photos.",renewBefore:30},
  {id:"vignette",    label:"Road Vignette (е-стикер)",   icon:"🚘", tip:"Annual electronic sticker. Buy at bgtoll.bg, petrol stations or post offices.",renewBefore:14},
  {id:"car_insur",   label:"Car Insurance (Civil)",      icon:"🛡️", tip:"Mandatory third-party insurance. Compare at bginsurers.com. Can buy at any insurer.",renewBefore:14},
  {id:"lease",       label:"Rental Contract",            icon:"🏘️", tip:"Discuss renewal with your landlord at least 1 month before expiry.",renewBefore:30},
  {id:"health_priv", label:"Private Health Insurance",   icon:"💊", tip:"Renew with your insurer. Compare alternatives before renewal date.",renewBefore:21},
  {id:"work_permit", label:"Work Permit",                icon:"💼", tip:"Renew at Migration Directorate before expiry. Employer usually initiates this.",renewBefore:30},
  {id:"vehicle_reg", label:"Vehicle Registration",       icon:"🚙", tip:"Annual vehicle registration. Go to KAT office with documents and current insurance.",renewBefore:21},
  {id:"custom",      label:"Custom document",            icon:"📄", tip:"",renewBefore:14},
]

const URGENCY = [
  {key:"overdue", label:"Overdue",     color:"#dc2626", bg:"#fef2f2", border:"#fecaca", textColor:"#991b1b", days:-Infinity},
  {key:"critical",label:"Critical",    color:"#ea580c", bg:"#fff7ed", border:"#fed7aa", textColor:"#9a3412", days:7},
  {key:"soon",    label:"Due soon",    color:"#d97706", bg:"#fffbeb", border:"#fde68a", textColor:"#92400e", days:30},
  {key:"upcoming",label:"Upcoming",    color:"#2563eb", bg:"#eff6ff", border:"#bfdbfe", textColor:"#1e40af", days:90},
  {key:"ok",      label:"All good",    color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", textColor:"#166534", days:Infinity},
]

const getUrgency = (daysLeft) => {
  if(daysLeft < 0) return URGENCY[0]
  if(daysLeft <= 7) return URGENCY[1]
  if(daysLeft <= 30) return URGENCY[2]
  if(daysLeft <= 90) return URGENCY[3]
  return URGENCY[4]
}

const getDaysLeft = (dateStr) => {
  const today = new Date(); today.setHours(0,0,0,0)
  const exp = new Date(dateStr); exp.setHours(0,0,0,0)
  return Math.round((exp-today)/(1000*60*60*24))
}

// Storage that works in artifact + deployed app
const dlStore = {
  key:"bgexpats_deadlines_v1",
  get: async()=>{
    try{
      if(window.storage){const r=await window.storage.get(dlStore.key);return r?JSON.parse(r.value):[]}
      return JSON.parse(localStorage.getItem(dlStore.key)||"[]")
    }catch{return[]}
  },
  set: async(data)=>{
    try{
      const s=JSON.stringify(data)
      if(window.storage)await window.storage.set(dlStore.key,s)
      try{localStorage.setItem(dlStore.key,s)}catch{}
    }catch{}
  }
}

function DeadlineTracker({user,subscription,setView}){
  const [docs,setDocs]=useState([])
  const [loading,setLoading]=useState(true)
  const [showForm,setShowForm]=useState(false)
  const [editId,setEditId]=useState(null)
  const [renewId,setRenewId]=useState(null)
  const [form,setForm]=useState({typeId:"visa_d",label:"",date:"",notes:""})
  const [deleteId,setDeleteId]=useState(null)

  const tier=(subscription&&subscription.plan)||"free"
  const isPremium=tier==="premium"

  useEffect(()=>{
    dlStore.get().then(d=>{setDocs(d);setLoading(false)})
  },[])

  const save=async(updated)=>{setDocs(updated);await dlStore.set(updated)}

  const openAdd=()=>{
    setEditId(null)
    const defaultType=DOC_TYPES[0]
    setForm({typeId:defaultType.id,label:defaultType.label,date:"",notes:defaultType.tip})
    setShowForm(true)
  }

  const openEdit=(doc)=>{
    setEditId(doc.id)
    setForm({typeId:doc.typeId,label:doc.label,date:doc.date,notes:doc.notes||""})
    setShowForm(true)
  }

  const submitForm=async()=>{
    if(!form.date)return
    const docType=DOC_TYPES.find(t=>t.id===form.typeId)||DOC_TYPES[0]
    if(editId){
      const updated=docs.map(d=>d.id===editId?{...d,...form,label:form.label||docType.label}:d)
      await save(updated)
    } else {
      const newDoc={id:Date.now(),typeId:form.typeId,label:form.label||docType.label,icon:docType.icon,date:form.date,notes:form.notes,createdAt:new Date().toISOString()}
      await save([...docs,newDoc])
    }
    setShowForm(false);setEditId(null)
    setForm({typeId:"visa_d",label:"",date:"",notes:""})
  }

  const deleteDoc=async(id)=>{await save(docs.filter(d=>d.id!==id));setDeleteId(null)}

  const markRenewed=async(id,newDate)=>{
    const updated=docs.map(d=>d.id===id?{...d,date:newDate,renewedAt:new Date().toISOString()}:d)
    await save(updated)
    setRenewId(null)
  }

  const changeType=(typeId)=>{
    const t=DOC_TYPES.find(d=>d.id===typeId)||DOC_TYPES[0]
    setForm(p=>({...p,typeId,label:t.label,notes:t.tip}))
  }

  const sorted=[...docs].sort((a,b)=>getDaysLeft(a.date)-getDaysLeft(b.date))
  const overdue=sorted.filter(d=>getDaysLeft(d.date)<0).length
  const critical=sorted.filter(d=>{const dl=getDaysLeft(d.date);return dl>=0&&dl<=7}).length
  const soon=sorted.filter(d=>{const dl=getDaysLeft(d.date);return dl>7&&dl<=30}).length

  if(!isPremium){
    return(
      <div style={{minHeight:"calc(100vh - 58px)",background:C.page,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px"}}>
        <div style={{maxWidth:480,textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:16}}>📅</div>
          <h1 className="serif" style={{fontSize:28,fontWeight:400,color:C.text,margin:"0 0 12px"}}>Document Deadline Tracker</h1>
          <p style={{fontSize:15,color:C.muted,margin:"0 0 24px",lineHeight:1.7}}>Never miss a visa renewal, NHIF payment, EOOD filing or residence permit deadline again. Premium exclusive feature.</p>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"20px",marginBottom:24,textAlign:"left"}}>
            {["Visa & residence permit expiry tracker","EOOD tax and VAT filing reminders","NHIF health insurance payment alerts","Driving licence exchange countdown","Rental contract renewal reminders","17 Bulgarian expat document types","Colour-coded urgency dashboard"].map((f,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"6px 0",fontSize:14,color:C.text,borderBottom:i<6?`0.5px solid ${C.border}`:"none"}}>
                <span style={{color:"#16a34a",flexShrink:0}}>✓</span>{f}
              </div>
            ))}
          </div>
          <button onClick={()=>setView("pricing")} style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,border:"none",color:"#fff",padding:"14px 32px",borderRadius:12,cursor:"pointer",fontSize:15,fontWeight:700,width:"100%",marginBottom:10}}>
            Upgrade to Premium — €6.49/month →
          </button>
          <p style={{fontSize:12,color:C.muted}}>or €3.33/month billed annually · Cancel anytime</p>
        </div>
      </div>
    )
  }

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:"28px 20px 44px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div>
              <h1 className="serif" style={{color:"#fff",fontSize:"clamp(22px,4vw,34px)",fontWeight:400,margin:"0 0 6px"}}>📅 Document Tracker</h1>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,margin:0,fontWeight:300}}>Never miss a deadline for your Bulgarian documents</p>
            </div>
            <button onClick={openAdd} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:6,backdropFilter:"blur(8px)"}}>
              + Add document
            </button>
          </div>
          {/* Summary */}
          {docs.length>0&&(
            <div style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"}}>
              {[
                {label:"Overdue",count:overdue,bg:"#dc2626"},
                {label:"Due ≤7 days",count:critical,bg:"#ea580c"},
                {label:"Due ≤30 days",count:soon,bg:"#d97706"},
                {label:"Total tracked",count:docs.length,bg:"rgba(255,255,255,0.2)"},
              ].map(s=>(
                <div key={s.label} style={{background:s.bg,borderRadius:10,padding:"10px 16px",textAlign:"center",minWidth:100}}>
                  <div style={{fontSize:22,fontWeight:700,color:"#fff",lineHeight:1}}>{s.count}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.85)",marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{maxWidth:900,margin:"-20px auto 48px",padding:"0 20px"}}>

        {/* Add / Edit form */}
        {showForm&&(
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"22px",marginBottom:20,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
            <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:16}}>{editId?"✏️ Edit document":"+ Add new document"}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>Document type</label>
                <select value={form.typeId} onChange={e=>changeType(e.target.value)} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:14,color:C.text,background:C.page,outline:"none"}}>
                  {DOC_TYPES.map(t=><option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>Custom name (optional)</label>
                <input value={form.label} onChange={e=>setForm(p=>({...p,label:e.target.value}))} placeholder="Leave blank for default name" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:14,color:C.text,background:C.page,outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:4}}>Expiry / due date</label>
              <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:14,color:C.text,background:C.page,outline:"none"}}/>
            </div>
            {form.notes&&(
              <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:13,color:"#92400e"}}>
                💡 {form.notes}
              </div>
            )}
            <div style={{display:"flex",gap:8}}>
              <button onClick={submitForm} disabled={!form.date} style={{background:form.date?C.primary:"#ccc",border:"none",color:"#fff",padding:"10px 22px",borderRadius:9,cursor:form.date?"pointer":"default",fontSize:14,fontWeight:600}}>
                {editId?"Save changes":"Add document"}
              </button>
              <button onClick={()=>{setShowForm(false);setEditId(null)}} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 16px",borderRadius:9,cursor:"pointer",fontSize:14}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Renew modal */}
        {renewId&&(
          <div style={{background:C.surface,border:`2px solid ${C.primary}`,borderRadius:16,padding:"20px",marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:12}}>✅ Mark as renewed — enter new expiry date</div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <input type="date" id="renew-date" style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:14,color:C.text,background:C.page,outline:"none"}}/>
              <button onClick={()=>{const d=document.getElementById("renew-date").value;if(d)markRenewed(renewId,d)}} style={{background:C.primary,border:"none",color:"#fff",padding:"10px 18px",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:600}}>Confirm</button>
              <button onClick={()=>setRenewId(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 14px",borderRadius:8,cursor:"pointer",fontSize:14}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading&&docs.length===0&&!showForm&&(
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"48px 24px",textAlign:"center"}}>
            <div style={{fontSize:52,marginBottom:14}}>📋</div>
            <h2 className="serif" style={{fontSize:22,fontWeight:400,color:C.text,margin:"0 0 10px"}}>Add your first document</h2>
            <p style={{fontSize:14,color:C.muted,margin:"0 0 24px",lineHeight:1.7,maxWidth:400,marginLeft:"auto",marginRight:"auto"}}>
              Track visa expiry dates, residence permits, NHIF payments, EOOD filings and more. Never get caught by surprise again.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:24}}>
              {["🛂 Visa","📋 Residence permit","🏥 NHIF","🏢 EOOD filing","🚗 Driving licence","📘 Passport"].map(s=>(
                <span key={s} style={{background:C.primaryLight,color:C.primary,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:500}}>{s}</span>
              ))}
            </div>
            <button onClick={openAdd} style={{background:C.primary,border:"none",color:"#fff",padding:"12px 28px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>
              + Add my first document →
            </button>
          </div>
        )}

        {/* Document cards */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {sorted.map(doc=>{
            const daysLeft=getDaysLeft(doc.date)
            const urgency=getUrgency(daysLeft)
            const docType=DOC_TYPES.find(t=>t.id===doc.typeId)||DOC_TYPES[DOC_TYPES.length-1]
            const expDate=new Date(doc.date).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})
            return(
              <div key={doc.id} style={{background:C.surface,border:`1px solid ${urgency.border}`,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",display:"flex"}}>
                {/* Left urgency bar */}
                <div style={{width:5,background:urgency.color,flexShrink:0}}/>
                <div style={{flex:1,padding:"18px 18px 18px 16px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start",flex:1}}>
                      <div style={{width:44,height:44,borderRadius:12,background:urgency.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{doc.icon||docType.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:3}}>{doc.label}</div>
                        <div style={{fontSize:13,color:C.muted}}>Expires: {expDate}</div>
                        {docType.tip&&doc.typeId!=="custom"&&(
                          <div style={{fontSize:12,color:C.muted,marginTop:4,lineHeight:1.5}}>{docType.tip}</div>
                        )}
                      </div>
                    </div>
                    {/* Days counter */}
                    <div style={{textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:daysLeft<0?18:Math.abs(daysLeft)>99?22:28,fontWeight:800,color:urgency.color,lineHeight:1}}>
                        {daysLeft<0?`${Math.abs(daysLeft)}d overdue`:`${daysLeft}d`}
                      </div>
                      {daysLeft>=0&&<div style={{fontSize:10,color:urgency.color,fontWeight:600,marginTop:2}}>remaining</div>}
                      <div style={{marginTop:6,display:"inline-block",background:urgency.bg,border:`1px solid ${urgency.border}`,borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:700,color:urgency.textColor}}>{urgency.label.toUpperCase()}</div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div style={{display:"flex",gap:8,marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
                    <button onClick={()=>setRenewId(doc.id)} style={{background:C.primaryLight,border:`1px solid #b8d4c4`,color:C.primary,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600}}>✅ Mark renewed</button>
                    <button onClick={()=>openEdit(doc)} style={{background:C.page,border:`1px solid ${C.border}`,color:C.muted,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12}}>✏️ Edit</button>
                    <button onClick={()=>setDeleteId(doc.id)} style={{background:"#fef2f2",border:"1px solid #fecaca",color:"#dc2626",padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12}}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Delete confirm */}
        {deleteId&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20}}>
            <div style={{background:C.surface,borderRadius:16,padding:"24px",maxWidth:380,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
              <div style={{fontSize:24,marginBottom:12}}>🗑️</div>
              <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:8}}>Delete this document?</div>
              <p style={{fontSize:13,color:C.muted,margin:"0 0 20px"}}>This action cannot be undone.</p>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>deleteDoc(deleteId)} style={{flex:1,background:"#dc2626",border:"none",color:"#fff",padding:"10px",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:600}}>Yes, delete</button>
                <button onClick={()=>setDeleteId(null)} style={{flex:1,background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px",borderRadius:8,cursor:"pointer",fontSize:14}}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Email reminder note */}
        {docs.length>0&&(
          <div style={{marginTop:20,background:C.primaryLight,border:`1px solid #b8d4c4`,borderRadius:12,padding:"14px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:18,flexShrink:0}}>📧</span>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:C.primary,marginBottom:2}}>Email reminders coming soon</div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>We're adding automatic email alerts 30, 14 and 7 days before each deadline. You'll receive them at your registered email address. For now, bookmark this page and check it regularly.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


// ── Advertise / Sponsorship Page ─────────────────────────────────
const AD_CONTACT_EMAIL = "partners@bgexpats.com" // ← your partnerships inbox

const AD_TIERS = [
  {
    id:"pin",
    icon:"📍",
    name:"Map Listing",
    monthly:17,
    yearly:137,
    tagline:"Get found on the interactive map",
    accent:"#1e5e3f",
    features:[
      "Your business pinned on the city map",
      "Logo, description, phone & website",
      "\"English spoken\" badge if applicable",
      "Appears in your category & city",
      "Update your details anytime",
    ],
  },
  {
    id:"featured",
    icon:"⭐",
    name:"Featured Partner",
    monthly:47,
    yearly:378,
    tagline:"Stand out at the top of your category",
    accent:"#b8792a",
    popular:true,
    features:[
      "Everything in Map Listing",
      "Priority placement — top of your category",
      "Highlighted card with your brand colour",
      "Featured in the app directory sidebar",
      "One social post to our community feed / month",
      "Monthly views & clicks report",
    ],
  },
  {
    id:"sponsor",
    icon:"👑",
    name:"Sponsored Guide",
    monthly:119,
    yearly:956,
    tagline:"Own a whole topic expats read daily",
    accent:"#164530",
    features:[
      "Everything in Featured Partner",
      "\"Sponsored by you\" on a relevant guide (e.g. Banking, Housing)",
      "Native mention inside the guide article",
      "Banner on the AI chat welcome screen",
      "Newsletter feature to all subscribers",
      "Dedicated account contact",
    ],
  },
]

const AD_STATS = [
  {n:"5", label:"languages spoken by our audience"},
  {n:"10+", label:"Bulgarian cities covered"},
  {n:"20+", label:"everyday topics expats search"},
  {n:"100%", label:"foreigners & new arrivals — your exact customers"},
]

function AdvertisePage({setView,lang}){
  const [sel,setSel]=useState("featured")
  const [billing,setBilling]=useState("monthly")
  const chosen=AD_TIERS.find(t=>t.id===sel)
  const chosenPrice=chosen?(billing==="yearly"?chosen.yearly:chosen.monthly):0
  const chosenUnit=billing==="yearly"?"/year":"/month"
  const mailto=`mailto:${AD_CONTACT_EMAIL}?subject=${encodeURIComponent("Advertising enquiry — "+(chosen?chosen.name:"BGexpats"))}&body=${encodeURIComponent("Hi BGexpats team,\n\nWe'd like to advertise on BGexpats.\n\nBusiness name:\nCity:\nCategory (e.g. legal, healthcare, dining):\nWebsite:\nInterested in: "+(chosen?chosen.name+" (€"+chosenPrice+chosenUnit+")":"")+"\n\nOur question / goal:\n\nThanks!")}`

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(150deg,${C.primary},#2a7a52 70%)`,padding:"52px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:0.08,fontSize:180,lineHeight:1,userSelect:"none",pointerEvents:"none"}}>🌹</div>
        <div style={{position:"relative",maxWidth:720,margin:"0 auto"}}>
          <div style={{display:"inline-block",background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:12,fontWeight:600,letterSpacing:"0.08em",padding:"5px 14px",borderRadius:20,marginBottom:18}}>FOR LOCAL BUSINESSES</div>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(30px,5.5vw,50px)",fontWeight:400,margin:"0 0 14px",lineHeight:1.1}}>Reach the expats<br/>who are looking for you</h1>
          <p style={{color:"rgba(255,255,255,0.82)",fontSize:17,margin:"0 auto 28px",maxWidth:520,lineHeight:1.6,fontWeight:300}}>Every day, foreigners in Bulgaria open BGexpats to find lawyers, doctors, restaurants, agents and services. Put your business in front of them at the moment they're deciding.</p>
          <a href={mailto} style={{display:"inline-block",background:"#f0c060",color:"#1a3a20",padding:"14px 34px",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 6px 22px rgba(0,0,0,0.2)"}}>Become a partner →</a>
        </div>
      </div>

      {/* Hero image band */}
      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 16px"}}>
        <div style={{marginTop:-28,borderRadius:18,overflow:"hidden",boxShadow:"0 10px 34px rgba(0,0,0,0.14)",position:"relative"}}>
          <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1400&q=80" alt="Local business owners and customers meeting in Bulgaria"
            style={{width:"100%",height:"clamp(180px,32vw,320px)",objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(22,69,48,0.55),rgba(22,69,48,0) 55%)"}}/>
          <div style={{position:"absolute",left:"clamp(18px,4vw,40px)",bottom:"clamp(16px,3vw,28px)",right:20}}>
            <div className="serif" style={{color:"#fff",fontSize:"clamp(18px,2.6vw,26px)",fontWeight:400,textShadow:"0 2px 12px rgba(0,0,0,0.4)",maxWidth:440,lineHeight:1.25}}>Thousands of newcomers are finding their favourite local places through BGexpats.</div>
          </div>
        </div>
      </div>

      {/* Reach stats */}
      <div style={{maxWidth:1000,margin:"28px auto 0",padding:"0 16px",position:"relative"}}>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,padding:"26px 20px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:18,boxShadow:"0 6px 24px rgba(0,0,0,0.06)"}}>
          {AD_STATS.map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div className="serif" style={{fontSize:34,color:C.primary,fontWeight:400,lineHeight:1}}>{s.n}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:6,lineHeight:1.4}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why advertise */}
      <div style={{maxWidth:900,margin:"46px auto 0",padding:"0 20px",textAlign:"center"}}>
        <h2 className="serif" style={{fontSize:"clamp(24px,3.5vw,34px)",fontWeight:400,color:C.text,margin:"0 0 10px"}}>An audience settling into a new home</h2>
        <p style={{color:C.muted,fontSize:15,lineHeight:1.7,maxWidth:600,margin:"0 auto"}}>People moving to Bulgaria are building a whole life here — finding a bank, a home, a doctor, a school, a favourite café. They're looking for businesses they can trust, they value being welcomed in their own language, and they rely on recommendations inside a platform made for them.</p>
      </div>

      {/* Tiers */}
      <div style={{maxWidth:1060,margin:"40px auto 0",padding:"0 16px"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:26}}>
          <div style={{display:"inline-flex",background:C.primaryLight,borderRadius:30,padding:4,gap:4}}>
            {["monthly","yearly"].map(b=>(
              <button key={b} onClick={()=>setBilling(b)}
                style={{background:billing===b?C.primary:"transparent",border:"none",color:billing===b?"#fff":C.primary,padding:"8px 22px",borderRadius:26,cursor:"pointer",fontSize:14,fontWeight:billing===b?700:500,transition:"all 0.2s",display:"flex",alignItems:"center",gap:7}}>
                {b==="monthly"?"Monthly":"Yearly"}
                {b==="yearly"&&<span style={{background:billing==="yearly"?"#f0c060":C.accent,color:billing==="yearly"?"#1a3a20":"#fff",fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:10}}>33% OFF</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
          {AD_TIERS.map(tier=>{
            const active=sel===tier.id
            return(
              <div key={tier.id} onClick={()=>setSel(tier.id)}
                style={{background:C.surface,border:`2px solid ${active?tier.accent:C.border}`,borderRadius:18,padding:"26px 22px",cursor:"pointer",position:"relative",transition:"all 0.2s",boxShadow:active?"0 10px 30px rgba(0,0,0,0.10)":"0 2px 10px rgba(0,0,0,0.04)",transform:active?"translateY(-3px)":"none"}}>
                {tier.popular&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:tier.accent,color:"#fff",fontSize:11,fontWeight:700,letterSpacing:"0.05em",padding:"3px 14px",borderRadius:20,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
                <div style={{fontSize:30,marginBottom:8}}>{tier.icon}</div>
                <div className="serif" style={{fontSize:22,color:C.text,fontWeight:400,marginBottom:3}}>{tier.name}</div>
                <div style={{fontSize:13,color:C.muted,marginBottom:16,minHeight:34,lineHeight:1.4}}>{tier.tagline}</div>
                <div style={{marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:3}}>
                    <span className="serif" style={{fontSize:38,color:tier.accent,fontWeight:400}}>€{billing==="yearly"?tier.yearly:tier.monthly}</span>
                    <span style={{fontSize:14,color:C.muted}}>{billing==="yearly"?"/year":"/month"}</span>
                  </div>
                  {billing==="yearly"&&<div style={{fontSize:12,color:C.primary,fontWeight:600,marginTop:2}}>≈ €{(tier.yearly/12).toFixed(0)}/mo · save €{tier.monthly*12-tier.yearly}/yr (33% off)</div>}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:9}}>
                  {tier.features.map((f,i)=>(
                    <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13,color:C.text,lineHeight:1.45}}>
                      <span style={{color:tier.accent,flexShrink:0,fontWeight:700}}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <p style={{textAlign:"center",fontSize:12,color:C.muted,marginTop:16}}>Switch between monthly and yearly above — yearly saves you 33%. VAT invoicing available for Bulgarian & EU companies. No long-term lock-in; cancel anytime.</p>
      </div>

      {/* Contact / collaboration */}
      <div style={{maxWidth:760,margin:"52px auto 0",padding:"0 20px"}}>
        <div style={{background:`linear-gradient(150deg,${C.primaryDark},${C.primary})`,borderRadius:22,padding:"40px 30px",textAlign:"center"}}>
          <div style={{fontSize:30,marginBottom:10}}>🤝</div>
          <h2 className="serif" style={{color:"#fff",fontSize:"clamp(22px,3.5vw,30px)",fontWeight:400,margin:"0 0 10px"}}>Let's talk collaboration</h2>
          <p style={{color:"rgba(255,255,255,0.8)",fontSize:15,lineHeight:1.65,maxWidth:500,margin:"0 auto 24px"}}>Have a question, want a custom package, or run a service we should know about? Tell us about your business and we'll suggest the best way to reach our community.</p>
          <a href={mailto} style={{display:"inline-block",background:"#f0c060",color:"#1a3a20",padding:"14px 32px",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none",marginBottom:18}}>Email us about {chosen?chosen.name:"advertising"} (€{chosenPrice}{chosenUnit}) →</a>
          <div style={{color:"rgba(255,255,255,0.75)",fontSize:14,marginTop:6}}>
            or write directly to <a href={`mailto:${AD_CONTACT_EMAIL}`} style={{color:"#f0c060",fontWeight:600}}>{AD_CONTACT_EMAIL}</a>
          </div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,marginTop:20,lineHeight:1.6}}>We reply within 2 business days · Sofia, Bulgaria</div>
        </div>
      </div>

      <div style={{textAlign:"center",padding:"32px 20px 48px"}}>
        <button onClick={()=>setView("home")} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 22px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600}}>← Back to BGexpats</button>
      </div>
    </div>
  )
}


function AnalyticsPage({liveEvents,user}){
  const [range,setRange]=useState(7)
  const now=Date.now()
  const cutoff=now-range*86400000
  const prev=now-(range*2)*86400000
  const all=[...SEED,...liveEvents]
  const period=all.filter(e=>e.ts>=cutoff)
  const prevPeriod=all.filter(e=>e.ts>=prev&&e.ts<cutoff)

  const views=period.filter(e=>e.type==="view")
  const tools=period.filter(e=>e.type==="tool")
  const chats=period.filter(e=>e.type==="chat")
  const logins=period.filter(e=>e.type==="login")

  const pvPrev=prevPeriod.filter(e=>e.type==="view").length
  const delta=(n,p)=>p===0?100:Math.round((n-p)/p*100)

  const pageCounts={home:0,legal:0,healthcare:0,banking:0,tourism:0,housing:0,business:0,community:0,tools:0,pricing:0,chat:0}
  views.forEach(e=>{if(pageCounts[e.label]!==undefined)pageCounts[e.label]++})
  const pageMax=Math.max(...Object.values(pageCounts),1)

  const toolCounts={cost:0,tax:0,visa:0,hood:0,fx:0,checklist:0,phrases:0}
  tools.forEach(e=>{if(toolCounts[e.label]!==undefined)toolCounts[e.label]++})
  const toolMax=Math.max(...Object.values(toolCounts),1)

  const countryCounts={}
  period.forEach(e=>{countryCounts[e.country]=(countryCounts[e.country]||0)+1})
  const countryList=Object.entries(countryCounts).sort((a,b)=>b[1]-a[1]).slice(0,6)
  const countryMax=(countryList[0]?countryList[0][1]:0)||1

  const flags={GB:"🇬🇧",FR:"🇫🇷",DE:"🇩🇪",NL:"🇳🇱",ES:"🇪🇸",BG:"🇧🇬",US:"🇺🇸",RO:"🇷🇴",CH:"🇨🇭",SE:"🇸🇪"}
  const countryNames={GB:"United Kingdom",FR:"France",DE:"Germany",NL:"Netherlands",ES:"Spain",BG:"Bulgaria",US:"United States",RO:"Romania",CH:"Switzerland",SE:"Sweden"}

  const hourCounts=Array(24).fill(0)
  period.forEach(e=>{const h=new Date(e.ts).getHours();hourCounts[h]++})
  const hourMax=Math.max(...hourCounts,1)

  const recent=[...all].sort((a,b)=>b.ts-a.ts).slice(0,8)
  const typeIcon={view:"👁️",tool:"🛠️",chat:"🤖",login:"👤"}
  const typeLabel={view:"Page view",tool:"Tool used",chat:"AI chat",login:"Login"}

  const dv=delta(views.length,pvPrev)

  const S={
    page:{background:"#0f1729",minHeight:"100vh",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0"},
    header:{background:"linear-gradient(135deg,#0d2544 0%,#0f3352 100%)",padding:"28px 24px 36px",borderBottom:"1px solid #1e3a5f"},
    card:{background:"#1a2744",border:"1px solid #1e3a5f",borderRadius:14,padding:"18px"},
    label:{fontSize:11,color:"#64748b",fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:6},
    stat:{fontSize:28,fontWeight:700,color:"#f1f5f9",letterSpacing:"-0.5px"},
    muted:{fontSize:13,color:"#64748b"},
    green:{color:"#22c55e"},red:{color:"#ef4444"},
    barBg:{background:"#1e3a5f",borderRadius:3,overflow:"hidden",height:6},
  }

  return(
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={{maxWidth:1140,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e"}}/>
                <span style={{fontSize:12,color:"#22c55e",fontWeight:600,letterSpacing:"0.06em"}}>ADMIN — LIVE</span>
              </div>
              <h1 style={{color:"#f1f5f9",fontSize:22,fontWeight:700,margin:0,letterSpacing:"-0.4px"}}>📊 BGexpats Analytics</h1>
              <p style={{color:"#64748b",fontSize:13,margin:"4px 0 0"}}>Personal dashboard — only visible to you</p>
            </div>
            <div style={{display:"flex",gap:6}}>
              {[7,14,30].map(d=>(
                <button key={d} onClick={()=>setRange(d)}
                  style={{background:range===d?"#1d4ed8":"transparent",border:"1px solid",borderColor:range===d?"#1d4ed8":"#1e3a5f",color:range===d?"#fff":"#94a3b8",padding:"6px 14px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:range===d?600:400}}>
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1140,margin:"0 auto",padding:"24px"}}>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:24}}>
          {[
            ["👁️ Page views",views.length,pvPrev,dv,"views this period"],
            ["🛠️ Tool opens",tools.length,prevPeriod.filter(e=>e.type==="tool").length,delta(tools.length,prevPeriod.filter(e=>e.type==="tool").length),"interactions"],
            ["🤖 AI chats",chats.length,prevPeriod.filter(e=>e.type==="chat").length,delta(chats.length,prevPeriod.filter(e=>e.type==="chat").length),"questions asked"],
            ["👤 Logins",logins.length,prevPeriod.filter(e=>e.type==="login").length,delta(logins.length,prevPeriod.filter(e=>e.type==="login").length),"sessions"],
          ].map(([label,val,prev,d,sub])=>(
            <div key={label} style={S.card}>
              <div style={S.label}>{label}</div>
              <div style={S.stat}>{val.toLocaleString()}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                <span style={{fontSize:12,fontWeight:600,color:d>=0?"#22c55e":"#ef4444"}}>{d>=0?"+":""}{d}%</span>
                <span style={S.muted}>vs prev {range}d</span>
              </div>
              <div style={{...S.muted,marginTop:2}}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>

          {/* Page views breakdown */}
          <div style={S.card}>
            <div style={{...S.label,marginBottom:16}}>📄 Traffic by page</div>
            {Object.entries(pageCounts).sort((a,b)=>b[1]-a[1]).map(([page,count])=>(
              <div key={page} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:"#94a3b8",textTransform:"capitalize"}}>{page}</span>
                  <span style={{fontSize:12,fontWeight:600,color:"#e2e8f0"}}>{count}</span>
                </div>
                <div style={S.barBg}>
                  <div style={{width:`${count/pageMax*100}%`,height:"100%",background:"linear-gradient(to right,#1d4ed8,#3b82f6)",borderRadius:3,transition:"width 0.8s ease"}}/>
                </div>
              </div>
            ))}
          </div>

          {/* Tool usage */}
          <div style={S.card}>
            <div style={{...S.label,marginBottom:16}}>🛠️ Tool usage</div>
            {[
              ["cost","💰 Cost calculator"],["tax","📊 Tax calculator"],["visa","🛂 Visa checker"],
              ["hood","🏙️ Neighbourhoods"],["fx","💱 Currency"],["checklist","✅ Checklist"],["phrases","🗣️ Phrases"]
            ].map(([id,label])=>(
              <div key={id} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:"#94a3b8"}}>{label}</span>
                  <span style={{fontSize:12,fontWeight:600,color:"#e2e8f0"}}>{toolCounts[id]}</span>
                </div>
                <div style={S.barBg}>
                  <div style={{width:`${toolCounts[id]/toolMax*100}%`,height:"100%",background:"linear-gradient(to right,#0f6e56,#1d9e75)",borderRadius:3,transition:"width 0.8s ease"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>

          {/* Countries */}
          <div style={S.card}>
            <div style={{...S.label,marginBottom:14}}>🌍 Top countries</div>
            {countryList.map(([code,count])=>(
              <div key={code} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{fontSize:18,flexShrink:0}}>{flags[code]||"🌍"}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,color:"#94a3b8"}}>{countryNames[code]||code}</span>
                    <span style={{fontSize:12,fontWeight:600,color:"#e2e8f0"}}>{count}</span>
                  </div>
                  <div style={S.barBg}>
                    <div style={{width:`${count/countryMax*100}%`,height:"100%",background:"linear-gradient(to right,#854f0b,#ef9f27)",borderRadius:3}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hourly activity */}
          <div style={S.card}>
            <div style={{...S.label,marginBottom:14}}>⏰ Activity by hour</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:2,height:80}}>
              {hourCounts.map((v,h)=>(
                <div key={h} title={`${h}:00 — ${v} events`}
                  style={{flex:1,background:v>0?"#3b82f6":"#1e3a5f",borderRadius:"2px 2px 0 0",height:`${Math.max(v/hourMax*100,4)}%`,cursor:"default",transition:"height 0.5s",opacity:v>0?1:0.3}}/>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
              <span style={{fontSize:10,color:"#475569"}}>00:00</span>
              <span style={{fontSize:10,color:"#475569"}}>12:00</span>
              <span style={{fontSize:10,color:"#475569"}}>23:00</span>
            </div>
            <div style={{marginTop:12,padding:"8px 10px",background:"#0f1f38",borderRadius:8}}>
              <div style={{fontSize:11,color:"#64748b",marginBottom:2}}>Peak hour</div>
              <div style={{fontSize:14,fontWeight:600,color:"#f1f5f9"}}>
                {hourCounts.indexOf(Math.max(...hourCounts))}:00 — {Math.max(...hourCounts)} events
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div style={S.card}>
            <div style={{...S.label,marginBottom:14}}>⚡ Live activity</div>
            {recent.map((e,i)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid #1e3a5f"}}>
                <span style={{fontSize:14,flexShrink:0}}>{typeIcon[e.type]||"📌"}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,color:"#94a3b8",fontWeight:500}}>{typeLabel[e.type]}{e.label?" — "+e.label:""}</div>
                  <div style={{fontSize:11,color:"#475569"}}>{flags[e.country]||""} {new Date(e.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Analytics + Plausible recommendation */}
        <div style={{...S.card,background:"#0f2744",border:"1px solid #1e3a5f"}}>
          <div style={{...S.label,marginBottom:12}}>🚀 Add real-time tracking to BGexpats</div>
          <p style={{fontSize:13,color:"#94a3b8",margin:"0 0 14px",lineHeight:1.6}}>This dashboard shows session data + seeded historical data. For permanent real tracking once deployed, add one of these free tools in 5 minutes:</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{background:"#1e3a5f",borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"#f1f5f9",marginBottom:4}}>Google Analytics 4 (free)</div>
              <p style={{fontSize:12,color:"#64748b",margin:"0 0 8px",lineHeight:1.5}}>Most powerful. Tracks everything. Add to your Vercel project in index.html.</p>
              <div style={{background:"#0f1729",borderRadius:6,padding:"8px 10px",fontSize:11,color:"#22c55e",fontFamily:"monospace"}}>analytics.google.com → create property → get tracking ID (G-XXXXXXXX)</div>
            </div>
            <div style={{background:"#1e3a5f",borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"#f1f5f9",marginBottom:4}}>Plausible.io (€9/mo)</div>
              <p style={{fontSize:12,color:"#64748b",margin:"0 0 8px",lineHeight:1.5}}>Privacy-friendly, GDPR compliant, beautiful. No cookie banner needed. Perfect for EU users.</p>
              <div style={{background:"#0f1729",borderRadius:6,padding:"8px 10px",fontSize:11,color:"#22c55e",fontFamily:"monospace"}}>plausible.io → add site → paste 1 script tag → done</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


