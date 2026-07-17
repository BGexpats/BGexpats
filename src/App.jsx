import { useState, useRef, useEffect, Fragment } from "react"
import { signUp as sbSignUp, signIn as sbSignIn, signOut as sbSignOut, getCurrentUser as sbGetCurrentUser, resetPassword as sbResetPassword, getProfile as sbGetProfile, updateProfile as sbUpdateProfile, uploadAvatar as sbUploadAvatar, listProfiles as sbListProfiles } from "./supabase"
import heroImg1 from "./assets/hero-rila-lake.jpg"
import nessebar from "./assets/nessebar.jpg"
import plovdiv from "./assets/plovdiv.jpg"
import heroImg2 from "./assets/hero-sunny-beach.jpg"
import heroImg3 from "./assets/hero-ivan-vazov.jpg"
import connectHeroImg from "./assets/connect-hero.png"

const LOGO_ICON = "data:image/png;base64,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"

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
  en:{flag:"🇬🇧",name:"English",   short:"EN",cc:"gb"},
  fr:{flag:"🇫🇷",name:"Français",  short:"FR",cc:"fr"},
  es:{flag:"🇪🇸",name:"Español",   short:"ES",cc:"es"},
  de:{flag:"🇩🇪",name:"Deutsch",   short:"DE",cc:"de"},
  nl:{flag:"🇳🇱",name:"Nederlands",short:"NL",cc:"nl"},
  ru:{flag:"🇷🇺",name:"Русский",   short:"RU",cc:"ru"},
  uk:{flag:"🇺🇦",name:"Українська",short:"UK",cc:"ua"},
  tr:{flag:"🇹🇷",name:"Türkçe",    short:"TR",cc:"tr"},
  bg:{flag:"🇧🇬",name:"Български", short:"BG",cc:"bg"},
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
    suggestions:["How do I get a residency permit?","What's the cost of living in Sofia?","How to open a bank account as a foreigner?","How to register an EOOD company?","Best neighbourhoods in Sofia for expats?"],
    placeholder:"Ask anything about life in Bulgaria...",
    translating:"Translating...",home:"← Home",translateBtn:"Translate this guide",nav:{explore:"Explore",partners:"Partners",tools:"🛠️ Tools",map:"🗺️ Map",advertise:"📢 Advertise",pricing:"⭐ Pricing",community:"💬 Community",connect:"💑 Connect",apps:"📱 Apps",deadlines:"📅 Deadlines",upgrade:"⭐ Upgrade",login:"👤 Login",signout:"Sign out",profile:"My profile"},
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
    translating:"Traduction en cours...",home:"← Accueil",nav:{explore:"Explorer",partners:"Partenaires",tools:"🛠️ Outils",map:"🗺️ Carte",advertise:"📢 Publicité",pricing:"⭐ Tarifs",community:"💬 Communauté",connect:"💑 Rencontres",apps:"📱 Applis",deadlines:"📅 Délais",upgrade:"⭐ Améliorer",login:"👤 Connexion",signout:"Déconnexion",profile:"Mon profil"},translateBtn:"Traduire ce guide",
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
    translating:"Traduciendo...",home:"← Inicio",nav:{explore:"Explorar",partners:"Socios",tools:"🛠️ Herramientas",map:"🗺️ Mapa",advertise:"📢 Publicidad",pricing:"⭐ Precios",community:"💬 Comunidad",connect:"💑 Conectar",apps:"📱 Apps",deadlines:"📅 Plazos",upgrade:"⭐ Actualizar",login:"👤 Entrar",signout:"Cerrar sesión",profile:"Mi perfil"},translateBtn:"Traducir esta guía",
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
    nav:{explore:"Entdecken",partners:"Partner",tools:"🛠️ Tools",map:"🗺️ Karte",advertise:"📢 Werbung",pricing:"⭐ Preise",community:"💬 Community",connect:"💑 Vernetzen",apps:"📱 Apps",deadlines:"📅 Fristen",upgrade:"⭐ Upgrade",login:"👤 Anmelden",signout:"Abmelden",profile:"Mein Profil"},
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
    translating:"Vertalen...",home:"← Terug",translateBtn:"Vertaal deze gids",nav:{explore:"Verkennen",partners:"Partners",tools:"🛠️ Tools",map:"🗺️ Kaart",advertise:"📢 Adverteren",pricing:"⭐ Prijzen",community:"💬 Community",connect:"💑 Verbinden",apps:"📱 Apps",deadlines:"📅 Deadlines",upgrade:"⭐ Upgrade",login:"👤 Inloggen",signout:"Uitloggen",profile:"Mijn profiel",analytics:"Statistieken"}
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
    translating:"Перевод...",home:"← Главная",translateBtn:"Перевести этот гид",nav:{explore:"Обзор",partners:"Партнёры",tools:"🛠️ Инструменты",map:"🗺️ Карта",advertise:"📢 Реклама",pricing:"⭐ Цены",community:"💬 Сообщество",connect:"💑 Знакомства",apps:"📱 Приложения",deadlines:"📅 Сроки",upgrade:"⭐ Улучшить",login:"👤 Войти",signout:"Выйти",profile:"Мой профиль",analytics:"Аналитика"}
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
    translating:"Переклад...",home:"← Головна",translateBtn:"Перекласти цей гід",nav:{explore:"Огляд",partners:"Партнери",tools:"🛠️ Інструменти",map:"🗺️ Карта",advertise:"📢 Реклама",pricing:"⭐ Ціни",community:"💬 Спільнота",connect:"💑 Знайомства",apps:"📱 Додатки",deadlines:"📅 Терміни",upgrade:"⭐ Покращити",login:"👤 Увійти",signout:"Вийти",profile:"Мій профіль",analytics:"Аналітика"}
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
    translating:"Превод...",home:"← Начало",translateBtn:"Преведи този наръчник",nav:{explore:"Разгледай",partners:"Партньори",tools:"🛠️ Инструменти",map:"🗺️ Карта",advertise:"📢 Реклама",pricing:"⭐ Цени",community:"💬 Общност",connect:"💑 Запознанства",apps:"📱 Приложения",deadlines:"📅 Срокове",upgrade:"⭐ Надгради",login:"👤 Вход",signout:"Изход",profile:"Моят профил",analytics:"Анализи"}
  },
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
    translating:"Çevriliyor...",home:"← Ana sayfa",translateBtn:"Bu rehberi çevir",nav:{explore:"Keşfet",partners:"Ortaklar",tools:"🛠️ Araçlar",map:"🗺️ Harita",advertise:"📢 Reklam",pricing:"⭐ Fiyatlar",community:"💬 Topluluk",connect:"💑 Bağlan",apps:"📱 Uygulamalar",deadlines:"📅 Son Tarihler",upgrade:"⭐ Yükselt",login:"👤 Giriş",signout:"Çıkış",profile:"Profilim",analytics:"Analitik"}
  },
}

const CATEGORIES = [
  {
    id:"legal",icon:"⚖️",bg:"#e8f0fd",
    labels:{en:{label:"Legal & Residency",sub:"Visas, permits, registration"},fr:{label:"Juridique & Résidence",sub:"Visas, permis, inscription"},es:{label:"Legal y Residencia",sub:"Visados, permisos, registro"},de:{label:"Recht & Aufenthalt",sub:"Visa, Genehmigungen, Anmeldung"},nl:{label:"Juridisch & Verblijf",sub:"Visa's, vergunningen, registratie"},ru:{label:"Законодательство и ВНЖ",sub:"Визы, разрешения, регистрация"},uk:{label:"Законодавство та проживання",sub:"Візи, дозволи, реєстрація"},tr:{label:"Hukuk ve İkamet",sub:"Vizeler, izinler, kayıt"},bg:{label:"Право и пребиваване",sub:"Визи, разрешения, регистрация"}},
    articles:[
      {titles:{en:"Type D visa — for non-EU citizens",fr:"Visa de type D — pour les ressortissants hors UE",es:"Visado tipo D — para ciudadanos no comunitarios",de:"Typ-D-Visum — für Nicht-EU-Bürger",nl:"Type D-visum — voor niet-EU-burgers"},
       source:"Bulgarian Ministry of Foreign Affairs",sourceUrl:"https://www.mfa.bg",readTime:"4 min read",body:`A Type D (long-stay) visa lets you stay in Bulgaria for up to 180 days and is the first step toward residency.\n\n**Who needs it:** Non-EU/EEA citizens who want to stay longer than 90 days.\n\n**Documents needed:**\n• Valid passport (6+ months remaining)\n• Health insurance (min €30,000 coverage)\n• Proof of accommodation (rental contract)\n• Proof of finances (~€500/month in account)\n• Proof of purpose (work, study, family, etc.)\n\n**Apply at:** The Bulgarian embassy in your home country.\n\n**Processing:** 10–30 days. Fee ~€100.\n\n**After arrival:** Within 3 months, apply for a Temporary Residence Permit at your local Migration Directorate.\n\n💡 Tip: Call the Bulgarian embassy first — they give you the exact list for your nationality.`},
      {titles:{en:"EU citizens — registering your right to stay",fr:"Citoyens UE — enregistrer votre droit de séjour",es:"Ciudadanos UE — registrar su derecho de residencia",de:"EU-Bürger — Anmeldung des Aufenthaltsrechts",nl:"EU-burgers — uw verblijfsrecht registreren"},
       source:"Bulgarian Migration Directorate",sourceUrl:"https://mvr.bg/nsdmp",readTime:"3 min read",body:`As an EU/EEA citizen you have the right to live in Bulgaria without a visa. But after 3 months you must register.\n\n**Where to go:** Your local Migration Directorate office.\n\n**Documents needed:**\n• Valid EU passport or national ID card\n• Proof of address (rental contract or property deed)\n• Proof of income or employment, OR health insurance\n• 2 passport photos\n\n**Cost:** ~€5\n**Time:** Usually same day or 1–2 days\n\n**After 5 years:** You can apply for permanent residency.\n\n💡 Register in the city where you actually live — Sofia, Plovdiv, Varna each have their own office.`},
      {titles:{en:"Digital nomads & self-employed in Bulgaria",fr:"Nomades numériques et indépendants en Bulgarie",es:"Nómadas digitales y autónomos en Bulgaria",de:"Digitale Nomaden und Selbstständige in Bulgarien",nl:"Digitale nomaden en zelfstandigen in Bulgarije"},
       body:`Bulgaria is popular with digital nomads: 10% flat income tax, EU membership, and very low cost of living.\n\n**Best option — start a Bulgarian EOOD company:** Corporate tax is 10%, dividends taxed at 5%. Total effective tax ~14.5% — among the lowest in the EU.\n\n**EOOD registration:** 3–7 days, ~€50–150 in state fees plus notary.\n\n**You will need:** A local accountant (~€75–150/month). Essential and worth every euro.\n\n**Alternatively:** Type D visa (freelance) — apply showing regular income from abroad (€500+/month in bank statements).\n\n💡 Facebook groups "Sofia Digital Nomads" and "Expats in Sofia" are very active and helpful.`},
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
    labels:{en:{label:"Healthcare",sub:"Doctors, hospitals, insurance"},fr:{label:"Santé",sub:"Médecins, hôpitaux, assurance"},es:{label:"Sanidad",sub:"Médicos, hospitales, seguro"},de:{label:"Gesundheit",sub:"Ärzte, Krankenhäuser, Versicherung"},nl:{label:"Gezondheidszorg",sub:"Artsen, ziekenhuizen, verzekering"},ru:{label:"Здравоохранение",sub:"Врачи, страховка, больницы"},uk:{label:"Охорона здоров'я",sub:"Лікарі, страховка, лікарні"},tr:{label:"Sağlık",sub:"Doktorlar, sigorta, hastaneler"},bg:{label:"Здравеопазване",sub:"Лекари, застраховки, болници"}},
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
    labels:{en:{label:"Banking & Tax",sub:"Accounts, money, tax rates"},fr:{label:"Banque & Impôts",sub:"Comptes, argent, fiscalité"},es:{label:"Banca e Impuestos",sub:"Cuentas, dinero, fiscalidad"},de:{label:"Banking & Steuern",sub:"Konten, Geld, Steuern"},nl:{label:"Bankieren & Belasting",sub:"Rekeningen, geld, belastingen"},ru:{label:"Банки и налоги",sub:"Счета, налоги, финансы"},uk:{label:"Банки та податки",sub:"Рахунки, податки, фінанси"},tr:{label:"Bankacılık ve Vergi",sub:"Hesaplar, vergiler, finans"},bg:{label:"Банки и данъци",sub:"Сметки, данъци, финанси"}},
    articles:[
      {titles:{en:"Opening a bank account as a foreigner",fr:"Ouvrir un compte bancaire en tant qu'étranger",es:"Abrir una cuenta bancaria como extranjero",de:"Ein Bankkonto als Ausländer eröffnen",nl:"Een bankrekening openen als buitenlander"},
       body:`Opening a Bulgarian bank account is straightforward once you have a registered address.\n\n**Most foreigner-friendly banks:**\n\n**DSK Bank** — largest Bulgarian bank, branches everywhere, solid app, English service.\n\n**UniCredit Bulbank** — international, great for international transfers, English staff in center.\n\n**First Investment Bank (FIB)** — good mobile banking, competitive fees.\n\n**Documents needed:**\n• Passport\n• Bulgarian address proof (rental contract)\n• Bulgarian personal number (EGN or LNC)\n• For non-EU: residence permit\n\n**Costs:** Account opening free. Monthly fee €1–3. SEPA transfers free or €1–2.\n\n💡 Go to a branch on Vitosha Blvd in Sofia center — staff there are used to foreigners.`},
      {titles:{en:"Bulgarian tax system explained simply",fr:"Le système fiscal bulgare expliqué simplement",es:"El sistema fiscal búlgaro explicado de forma sencilla",de:"Das bulgarische Steuersystem einfach erklärt",nl:"Het Bulgaarse belastingsysteem eenvoudig uitgelegd"},
       body:`Bulgaria has one of the most attractive tax systems in the EU.\n\n**Personal income tax:** 10% flat — everyone pays the same rate, no brackets.\n\n**Corporate tax (EOOD):** 10% flat on company profits.\n\n**Dividend tax:** 5% — when you pay yourself from your company.\n\n**Total effective tax as company owner:** ~14.5%\n\n**VAT:** 20% standard (9% for hotels, restaurants, tourist services).\n\n**Social & health contributions (self-employed, 2024):** ~€65–100/month.\n\n**Tax residency:** 183+ days/year in Bulgaria = Bulgarian tax resident.\n\n**Filing deadline:** April 30 for the previous calendar year.\n\n💡 Always hire a local accountant (€75–150/month). Best investment you can make.`},
      {titles:{en:"Sending money to Bulgaria — best options",fr:"Envoyer de l'argent en Bulgarie — meilleures options",es:"Enviar dinero a Bulgaria — mejores opciones",de:"Geld nach Bulgarien senden — beste Optionen",nl:"Geld naar Bulgarije sturen — beste opties"},
       body:`Bulgaria joined the Eurozone and uses the Euro (€) as its official currency since 2025.\n\n**Best transfer services:**\n\n**Wise** — best exchange rates, low fees, fast. Most expats' first choice for international transfers.\n\n**Revolut** — great for daily spending and transfers. Get a card as soon as you arrive.\n\n**Bank SWIFT** — works but fees are high (€5–13 per transfer). Avoid for regular use.\n\n**ATMs:** Very common. Use Wise or Revolut card to withdraw Euros. Always pay in local currency — never let the ATM convert for you.\n\n💡 Bulgaria is now in the Eurozone and uses the Euro.`},
    ]
  },
  {
    id:"tourism",icon:"✈️",bg:"#edf2fd",
    labels:{en:{label:"Tourism & Travel",sub:"Places, tips, getting around"},fr:{label:"Tourisme & Voyages",sub:"Lieux, conseils, transports"},es:{label:"Turismo y Viajes",sub:"Lugares, consejos, transporte"},de:{label:"Tourismus & Reisen",sub:"Orte, Tipps, Mobilität"},nl:{label:"Toerisme & Reizen",sub:"Plaatsen, tips, vervoer"},ru:{label:"Туризм и путешествия",sub:"Места, транспорт, советы"},uk:{label:"Туризм та подорожі",sub:"Місця, транспорт, поради"},tr:{label:"Turizm ve Seyahat",sub:"Yerler, ulaşım, ipuçları"},bg:{label:"Туризъм и пътувания",sub:"Места, транспорт, съвети"}},
    articles:[
      {titles:{en:"Top places to visit in Bulgaria",fr:"Les incontournables de la Bulgarie",es:"Los mejores lugares para visitar en Bulgaria",de:"Top-Sehenswürdigkeiten in Bulgarien",nl:"Topbestemmingen in Bulgarije"},
       body:`Bulgaria is one of Europe's most underrated destinations.\n\n**[[travel-sofia|Sofia]]** — the capital. Must-see: Alexander Nevsky Cathedral (free), Vitosha Mountain (15 min from center), Boyana Church (UNESCO), Vitosha Blvd for shopping and coffee.\n\n**[[travel-plovdiv|Plovdiv]]** — older than Rome. Cobblestone Old Town (Stari Grad) with a working Roman amphitheater. 2 hours from Sofia. Very walkable.\n\n**[[travel-bansko|Bansko]]** — best ski resort in Bulgaria (Pirin Mountains). Excellent skiing (Dec–Mar) and hiking (summer). Great restaurants and nightlife.\n\n**[[travel-black-sea|Black Sea]]** — Varna city is beautiful. Sunny Beach is the big resort. Golden Sands is more pleasant. 👉 Tap to explore the coast, its resorts and top places.\n\n**Rila Monastery** — UNESCO site, one of the most beautiful monasteries in the Balkans. Easy day trip from Sofia.\n\n**Veliko Tarnovo** — dramatic medieval capital on a hilltop. Tsarevets Fortress has a famous sound-and-light show.\n\n💡 Best time to visit: May–June or September–October. Warm, not crowded.`},
      {titles:{en:"Getting around Bulgaria",fr:"Se déplacer en Bulgarie",es:"Moverse por Bulgaria",de:"In Bulgarien unterwegs",nl:"Vervoer in Bulgarije",ru:"Передвижение по Болгарии",uk:"Пересування Болгарією",tr:"Bulgaristan'da ulaşım",bg:"Придвижване в България"},
       body:`**By bus (recommended):**\n• Sofia → Plovdiv: 1h45m, €6\n• Sofia → Varna: 6h, €15\n• Book at bus stations or avtogara.bg\n\n**By train:**\n• Sofia → Plovdiv: €5, ~2.5h. Slower but scenic.\n• Book at bdz.bg (English available)\n\n**By car:**\n• Motorway vignette required: €8/week or €15/month\n• Parking in Sofia: €0.80–1/hour (blue zone, pay by SMS)\n\n**In Sofia:**\n• Metro, trams, buses — ticket €0.80, day pass €2\n• Sofia Traffic app for routes\n\n**Taxis:**\n• Use Bolt or Yandex Go apps — cheaper and safer than street taxis\n• Avoid unmarked taxis at airports\n\n💡 Buses are usually faster than trains and similarly priced.`},
    ]
  },
  {
    id:"housing",icon:"🏠",bg:"#f0edf8",
    labels:{en:{label:"Housing & Renting",sub:"Find your home in Bulgaria"},fr:{label:"Logement & Location",sub:"Trouvez votre logement en Bulgarie"},es:{label:"Vivienda y Alquiler",sub:"Encuentra tu hogar en Bulgaria"},de:{label:"Wohnen & Mieten",sub:"Dein Zuhause in Bulgarien finden"},nl:{label:"Wonen & Huren",sub:"Vind uw thuis in Bulgarije"},ru:{label:"Жильё и аренда",sub:"Квартиры, покупка, коммунальные"},uk:{label:"Житло та оренда",sub:"Квартири, купівля, комунальні"},tr:{label:"Konut ve Kiralama",sub:"Daireler, satın alma, faturalar"},bg:{label:"Жилище и наем",sub:"Апартаменти, покупка, комунални"}},
    articles:[
      {titles:{en:"How to rent an apartment as a foreigner",fr:"Comment louer un appartement en tant qu'étranger",es:"Cómo alquilar un apartamento como extranjero",de:"Als Ausländer eine Wohnung mieten",nl:"Een appartement huren als buitenlander"},
       body:`Renting in Bulgaria is still affordable by European standards — but prices have risen since 2022 and again after euro adoption in January 2026.\n\n## Typical prices (2026)\n\nTap any city below for a neighbourhood guide, top places and activities.\n\n**[[travel-sofia|Sofia]] — the capital (most expensive)**\n• Studio/1-bed center: €500–850/month\n• Studio/1-bed suburbs: €350–550/month\n• 2-bed center: €700–1,200/month\n• 2-bed suburbs: €500–750/month\n\n**[[travel-plovdiv|Plovdiv]] — 25–35% cheaper than Sofia**\n• Studio/1-bed: €300–500/month\n• 2-bed: €400–650/month\n\n**[[travel-varna|Varna]] — Black Sea city (higher in summer)**\n• Studio/1-bed: €380–600/month\n• 2-bed: €500–800/month\n\n**[[travel-burgas|Burgas]] — more affordable Black Sea base**\n• Studio/1-bed: €280–450/month\n• 2-bed: €380–600/month\n\n**[[travel-bansko|Bansko]] — mountain resort**\n• Studio/1-bed: €280–500/month\n• Higher in ski season (Dec–Mar), lower in spring/autumn\n\n---\n\n## Where to find apartments\n• [[https://imoti.net|imoti.net]] — main property portal\n• [[https://address.bg|address.bg]] — another large portal\n• Facebook: "Apartments for rent Sofia English"\n• [[agents|Trusted real estate agents]] (charge 1 month rent fee)\n\n## Rental contract\n• Always in writing, in both Bulgarian and English\n• Standard deposit: 1–2 months rent\n• Notice period: usually 1 month\n\n## Utilities\nNOT included in rent. Budget €60–200/month extra (higher in winter for heating).\n\n💡 Best Sofia neighbourhoods for expats: Lozenets, Iztok, Doctor's Garden, Mladost, Oborishte.`},
    ,
      {titles:{en:"Buying property in Bulgaria \u2014 the complete guide",fr:"Acheter un bien immobilier en Bulgarie",es:"Comprar una propiedad en Bulgaria",de:"Immobilienkauf in Bulgarien",nl:"Onroerend goed kopen in Bulgarije"},
       source:"Bulgarian Property Registry",sourceUrl:"https://www.registryagency.bg",readTime:"7 min read",body:`Bulgaria offers some of the most affordable property in the EU — but the buying process and legal framework differ significantly from Western Europe.

## Can foreigners buy property?

**EU citizens:** Full rights to buy any property including land — since 2012.

**Non-EU citizens:** Can buy apartments and buildings freely. **Cannot buy land directly.** Workaround: register a Bulgarian EOOD company and purchase land through the company — very common practice.

---

## Where to search

• [[https://imoti.net|imoti.net]] — largest portal, most listings
• [[https://address.bg|address.bg]] — quality-verified listings, better for Sofia
• **imotbg.com** — additional listings
• **Direct from builders (ново строителство)** — for new builds
• [[agents|Trusted real estate agencies]] — vetted agencies recommended by the BGexpats community

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
• **Frequency:**
  - Passenger cars must pass AVI once a year.
  - Taxi vehicles are required to pass AVI every six months.
  - Cargo vehicles and trucks older than 10 years are also required to pass AVI every six months.
  - New cars have to pass AVI for the first time in their third year, and the second inspection has to take place two years after the first one (after their fifth year they are due for annual inspection).
  - 💡 The passing certificate is valid by the date written on the inspection ticket — do not wait until the last moment.
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

💡 **Tip:** For used cars on mobile.bg, always check the vehicle history at carvertical.com or carjam.bg before viewing. Request the VIN number from the seller first.`},
      {titles:{en:"Buying or importing a car in Bulgaria",fr:"Acheter ou importer une voiture en Bulgarie",es:"Comprar o importar un coche en Bulgaria",de:"Auto kaufen oder importieren in Bulgarien",nl:"Auto kopen of importeren in Bulgarije"},
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
• **Cost:** €15–35 at any approved ГТП station
• Book online or walk in — usually quick (30–45 minutes)
• Checks: lights, brakes, emissions, steering, tyres

**Frequency:**
• Passenger cars must pass AVI once a year.
• Taxi vehicles are required to pass AVI every six months.
• Cargo vehicles and trucks older than 10 years are also required to pass AVI every six months.
• New cars have to pass AVI for the first time in their third year, and the second inspection has to take place two years after the first one (after their fifth year they are due for annual inspection).

💡 The passing certificate is valid by the date written on the inspection ticket — do not wait until the last moment.

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
    labels:{en:{label:"Business Setup",sub:"EOOD, freelance, company"},fr:{label:"Créer son entreprise",sub:"EOOD, freelance, société"},es:{label:"Montar un negocio",sub:"EOOD, autónomo, empresa"},de:{label:"Unternehmensgründung",sub:"EOOD, Freelance, Firma"},nl:{label:"Bedrijf Opzetten",sub:"EOOD, freelance, onderneming"},ru:{label:"Открытие бизнеса",sub:"Компании, налоги, фриланс"},uk:{label:"Відкриття бізнесу",sub:"Компанії, податки, фриланс"},tr:{label:"İş Kurma",sub:"Şirketler, vergiler, serbest çalışma"},bg:{label:"Бизнес регистрация",sub:"Компании, данъци, фрийланс"}},
    articles:[
      {titles:{en:"Setting up an EOOD — your Bulgarian company",fr:"Créer une EOOD — votre société bulgare",es:"Crear una EOOD — su empresa búlgara",de:"Eine EOOD gründen — Ihre bulgarische Firma",nl:"Een EOOD oprichten — uw Bulgaars bedrijf"},
       body:`An EOOD is a single-person limited liability company — the most popular structure for expat entrepreneurs.\n\n**Why EOOD?**\n• 10% corporate tax\n• 5% dividend tax when you pay yourself\n• Total effective tax: ~14.5% (one of lowest in EU)\n• Full EU company — invoice anyone in the world\n• Foreigners can own 100%\n\n**Requirements:**\n• Minimum capital: €1 (literally two lev!)\n• Registered address in Bulgaria\n• You can be both owner and manager\n\n**How to register:**\n1. Choose a company name (check at brra.bg)\n2. Articles of association (notarized)\n3. Open company bank account, deposit capital\n4. Register with BRRA (Commercial Register)\n5. Register with NRA (Tax Authority)\n\n**Cost:** €102–500 in fees + €153–600 if using a lawyer.\n**Time:** 3–7 business days.\n\n**Monthly costs:** Accountant €75–150/month (essential). Health insurance ~€16/month.\n\n💡 Ask expat Facebook groups for accountant recommendations — a good one is worth everything.`},
    ]
  },
]

const makePrompt = (langName) =>
  `You are the BGexpats AI Assistant — a warm, knowledgeable helper for expats and tourists in Bulgaria. IMPORTANT: Always respond in ${langName}. Expert on: visas (Type D, EU registration), healthcare (NHIF, Tokuda/Acibadem/Vita hospitals), banking (DSK, UniCredit, FIB), taxes (10% flat), EOOD company setup (€1 capital, 3-7 days), property (Sofia neighbourhoods: Lozenets, Iztok, Mladost), transport (Bolt/Yandex, buses, trains), tourism (Sofia, Plovdiv, Bansko, Black Sea, Rila). Key facEmergency: 112. Give prices in € and EUR. Be practical, friendly, specific.`

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
        {Object.entries(LANGS).map(([k,v])=>(
          <button key={k} onClick={()=>setLang(k)} title={v.name} aria-label={v.name}
            style={{
              background:lang===k?"#1e5e3f":"transparent",
              border:"none",
              padding:"8px 12px",
              cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              borderRadius:8,
              borderBottom:lang===k?"2px solid #b8792a":"2px solid transparent",
              transition:"all 0.15s",
              flexShrink:0,
            }}
            onMouseEnter={e=>{if(lang!==k){e.currentTarget.style.background="#e8f2eb"}}}
            onMouseLeave={e=>{if(lang!==k){e.currentTarget.style.background="transparent"}}}>
            <img src={`https://flagcdn.com/32x24/${v.cc}.png`} alt={v.name} width="22" height="16" style={{borderRadius:2,display:"block",boxShadow:"0 0 0 1px rgba(0,0,0,0.08)"}}/>
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
  const clean = s => (s||"").replace(/^[^\p{L}]+/u,"")
  const NavIcon = ({d,d2,accent,filled})=>(
    <svg width="16" height="16" viewBox="0 0 24 24" style={{flexShrink:0}}>
      {d2&&<path fill={accent||"#f0c060"} fillOpacity={filled?1:.35} stroke="none" d={d2}/>}
      <path fill={filled?(accent||"#f0c060"):"none"} stroke={filled?"none":"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d={d}/>
    </svg>
  )
  const navBtnStyle=(active,tint)=>({display:"flex",alignItems:"center",gap:6,background:tint?"rgba(240,192,96,0.12)":"transparent",border:"none",color:tint?"#f0c060":"rgba(255,255,255,0.92)",padding:"8px 13px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:active?700:500}
  )

  // ── Dropdown component used for Explore / Community / Partners ──────
  const NavDropdown=({label,active,items})=>{
    const [open,setOpen]=useState(false)
    const ref=useRef(null)
    useEffect(()=>{
      const handler=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)}
      document.addEventListener("mousedown",handler)
      return()=>document.removeEventListener("mousedown",handler)
    },[])
    return(
      <div ref={ref} style={{position:"relative"}}>
        <button
          onClick={()=>setOpen(o=>!o)}
          style={{...navBtnStyle(active),display:"flex",alignItems:"center",gap:5,fontWeight:active?700:500}}>
          {label}
          <svg width="12" height="12" viewBox="0 0 24 24" style={{flexShrink:0,opacity:0.7,transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0deg)"}}>
            <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        {open&&(
          <div style={{position:"absolute",top:44,left:0,background:C.primary,border:`1px solid ${C.primaryDark}`,borderRadius:12,boxShadow:"0 8px 28px rgba(0,0,0,0.22)",minWidth:190,zIndex:9999,overflow:"hidden",padding:"4px 0"}}>
            {items.map((item,i)=>(
              <button key={i} onClick={()=>{setView(item.view);setOpen(false)}}
                style={{width:"100%",background:view===item.view?"rgba(255,255,255,0.15)":"transparent",border:"none",padding:"11px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",gap:10,fontWeight:view===item.view?700:400}}>
                <svg width="15" height="15" viewBox="0 0 24 24" style={{flexShrink:0,opacity:view===item.view?1:0.7}}>
                  <path fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d={item.d}/>
                </svg>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
  return(
    <nav style={{background:C.primary,position:"sticky",top:0,zIndex:100,borderBottom:`1px solid ${C.primaryDark}`}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 12px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8,padding:0,flexShrink:0}}>
          <img src={LOGO_ICON} alt="BGexpats" style={{height:24,width:24}}/>
          <span className="bg-nav-wordmark" style={{color:"#fff",fontSize:16,fontWeight:700,letterSpacing:"-0.3px"}}>BGexpats</span>
          {subscription&&<span style={{background:"#f0c060",color:"#1a3a20",fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:700,marginLeft:4}}>{subscription.plan.toUpperCase()}</span>}
        </button>
        {/* Dropdowns live OUTSIDE nav-links (which has overflow:auto) so their
            panels aren't clipped. Same fix as the user menu. */}
        <div style={{display:"flex",alignItems:"center",gap:2,flexShrink:0}}>
          {/* ── Explore dropdown ───────────────────── */}
          <NavDropdown
            label={clean(t.nav?.explore)||"Explore"}
            active={["tools","map","apps","pricing","tracker"].includes(view)}
            items={[
              {label:clean(t.nav?.tools)||"Tools",   view:"tools",     d:"M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"},
              {label:clean(t.nav?.map)||"Map",       view:"map",       d:"M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"},
              {label:clean(t.nav?.apps)||"Apps",     view:"apps",      d:"M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"},
              {label:"Pricing",                      view:"pricing",   d:"M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8-5.2-4.7 6.9-.7z"},
            ]}
          />
          {/* ── Community dropdown ─────────────────── */}
          <NavDropdown
            label="Community"
            active={["community","connect"].includes(view)}
            items={[
              {label:clean(t.nav?.community)||"Community", view:"community", d:"M4 4h16v12H7l-3 3V4z"},
              {label:clean(t.nav?.connect)||"Connect",     view:"connect",   d:"M12 20.5s-7-4.3-9.3-8.7C1.4 8.7 2.8 5.5 6 5.5c1.9 0 3.2 1.2 6 3.7 2.8-2.5 4.1-3.7 6-3.7 3.2 0 4.6 3.2 3.3 6.3-2.3 4.4-9.3 8.7-9.3 8.7z"},
            ]}
          />
          {/* ── Partners dropdown ──────────────────── */}
          <NavDropdown
            label={clean(t.nav?.partners)||"Partners"}
            active={["advertise","agents"].includes(view)}
            items={[
              {label:"Advertise",              view:"advertise", d:"M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM3 10h18"},
              {label:"Real Estate Agents",     view:"agents",    d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10"},
            ]}
          />
        </div>

        <div className="nav-links" style={{display:"flex",alignItems:"center",gap:2,minWidth:0,flex:"0 0 auto"}}>
          {/* ── AI — always standalone + highlighted ── */}
          <button onClick={()=>setView("chat")} style={{display:"flex",alignItems:"center",gap:6,background:C.accent,border:"none",color:"#fff",padding:"9px 16px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,flexShrink:0,marginLeft:6}}>
            <NavIcon d="M12 2l1.8 4.6L18 8l-4.2 1.9L12 15l-1.8-5.1L6 8l4.2-1.4z" filled accent="#fff"/>
            {aiLabel[lang]||"AI"}
          </button>
          {user&&!subscription&&(
            <button onClick={()=>openCheckout("basic")} style={{...navBtnStyle(false,true),padding:"7px 12px",fontSize:12}}>
              <NavIcon d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" d2="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>
              {clean(t.nav?.upgrade)||"Upgrade"}
            </button>
          )}
        </div>
        {/* User menu lives OUTSIDE the scrolling nav-links container — a parent with
            overflow:auto clips absolutely-positioned dropdowns, which was making the
            "My account" menu unclickable. */}
        <div style={{display:"flex",alignItems:"center",flexShrink:0}}>
          {user?(
            <div style={{position:"relative"}}>
              <button onClick={()=>setUserMenu(!userMenu)}
                style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",padding:"5px 10px 5px 6px",borderRadius:20,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{user.av||user.name.slice(0,2).toUpperCase()}</div>
                <span className="bg-nav-username">{user.name.split(" ")[0]}</span>
              </button>
              {userMenu&&(
                <div style={{position:"absolute",right:0,top:42,background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:190,zIndex:9999,overflow:"hidden"}}>
                  <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:C.page}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.text}}>{user.name}</div>
                    <div style={{fontSize:12,color:C.muted}}>{user.email}</div>
                  </div>
                  <button onClick={()=>{setView("account");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:C.text,display:"flex",alignItems:"center",gap:9,borderTop:`1px solid ${C.border}`}}><svg width="15" height="15" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#1e5e3f" fillOpacity=".28" stroke="none" d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>My account</button>
                  <button onClick={()=>{setView("advertise");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"#b8792a",display:"flex",alignItems:"center",gap:9,borderTop:`1px solid ${C.border}`}}><svg width="15" height="15" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#b8792a" fillOpacity=".3" stroke="none" d="M3 11l18-5v12L3 14v-3z"/><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 11l18-5v12L3 14v-3z"/></svg>Advertise on BGexpats</button>
          <button onClick={()=>{setView("community");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:C.text,display:"flex",alignItems:"center",gap:9}}><svg width="15" height="15" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#f0c060" fillOpacity=".35" stroke="none" d="M4 4h16v12H7l-3 3V4z"/><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v12H7l-3 3V4z"/></svg>My community</button>
                  {(user&&user.isAdmin)&&<button onClick={()=>{setView("analytics");setUserMenu(false)}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"#1d4ed8",display:"flex",alignItems:"center",gap:9,borderTop:"1px solid var(--border)"}}><svg width="15" height="15" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#1d4ed8" fillOpacity=".25" stroke="none" d="M5 20V10h4v10H5zm5 0V4h4v16h-4zm5 0v-7h4v7h-4z"/><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M5 20V10h4v10H5zm5 0V4h4v16h-4zm5 0v-7h4v7h-4z"/></svg>Analytics dashboard</button>}
                  <button onClick={async()=>{await sbSignOut();setUser(null);setUserMenu(false);setView("home")}} style={{width:"100%",background:"none",border:"none",padding:"12px 16px",cursor:"pointer",textAlign:"left",fontSize:13,color:"#c00",display:"flex",alignItems:"center",gap:9,borderTop:`1px solid ${C.border}`}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>Sign out</button>
                </div>
              )}
            </div>
          ):(
            <button onClick={()=>setView("login")} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",padding:"8px 14px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700}}>
              <NavIcon d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 3.6-6 8-6s8 2 8 6" d2="M12 12a4 4 0 100-8 4 4 0 000 8z"/>
              {clean(t.nav?.login)||"Login"}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

function Hero({setView,t,lang}){
  const heroImages=[
    heroImg1, // Rila lakes
    heroImg2, // Sunny Beach, aerial
    heroImg3, // Ivan Vazov National Theatre, Sofia
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
          <button onClick={()=>setView("chat")} style={{background:C.accent,border:"none",color:"#fff",padding:"14px 28px",borderRadius:999,cursor:"pointer",fontSize:15,fontWeight:700,display:"inline-flex",alignItems:"center",gap:9,boxShadow:"0 6px 24px rgba(0,0,0,0.3)"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#fff" d="M12 2l1.8 4.6L18 8l-4.2 1.9L12 15l-1.8-5.1L6 8l4.2-1.4z"/><path fill="#fff" fillOpacity=".55" d="M19 14l.9 2.3L22 17l-2.1 .9-.9 2.3-.9-2.3L16 17l2.1-.7z"/></svg>
            {t.askBtn}
          </button>
          <button onClick={()=>setView("tourism")} style={{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"14px 28px",borderRadius:999,cursor:"pointer",fontSize:15,fontWeight:700,display:"inline-flex",alignItems:"center",gap:9}}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#f0c060" fillOpacity=".4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            {lang==="fr"?"Explorer":(lang==="es"?"Explorar":(lang==="de"?"Entdecken":(lang==="nl"?"Ontdekken":"Explore Bulgaria")))}
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
  tourism:"https://images.unsplash.com/photo-1753529179550-c6aff1b76e6e?w=600&q=75",
  housing:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75",
  business:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75",
}

// Neutral outline icons for the topic cards — thin single-colour line art
// matching the site's nav icon style (no childish coloured emoji).
function TopicIcon({id,size=20,color="#1e5e3f"}){
  const p={fill:"none",stroke:color,strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round"}
  const paths={
    // Legal — scales of justice
    legal:<g {...p}><path d="M12 3v18M7 21h10M5 7h14M12 5l-5 1.5M12 5l5 1.5"/><path d="M7 6.5l-2.5 5a2.5 2.5 0 0 0 5 0L7 6.5zM17 6.5l-2.5 5a2.5 2.5 0 0 0 5 0L17 6.5z"/></g>,
    // Healthcare — medical cross / pulse
    healthcare:<g {...p}><path d="M12 8v8M8 12h8"/><rect x="4" y="4" width="16" height="16" rx="3"/></g>,
    // Banking — bank building with columns
    banking:<g {...p}><path d="M3 9l9-5 9 5M4 9v9M20 9v9M4 21h16M8 12v5M12 12v5M16 12v5"/></g>,
    // Tourism — pin / landmark
    tourism:<g {...p}><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></g>,
    // Housing — house with roof
    housing:<g {...p}><path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/></g>,
    // Business — briefcase
    business:<g {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></g>,
  }
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink:0}}>
      {paths[id]||paths.business}
    </svg>
  )
}

function CategoryGrid({setView,t,lang}){
  useScrollReveal()
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"52px 20px"}}>
      <h2 className="reveal serif" style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:400,color:C.text,margin:"0 0 8px"}}>{t.browse}</h2>
      <p className="reveal" style={{color:C.muted,margin:"0 0 32px",fontSize:16,fontWeight:300}}>{t.browseSub}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {CATEGORIES.map(cat=>{
          const lb=cat.labels[lang]||cat.labels.en
          return(
            <button key={cat.id} onClick={()=>setView(cat.id)}
              className="reveal hover-lift"
              style={{background:C.surface,border:`1px solid #e8e2d6`,borderRadius:22,overflow:"hidden",cursor:"pointer",textAlign:"left",boxShadow:"0 8px 24px rgba(30,50,40,0.09)",padding:0}}>
              <div style={{position:"relative",height:160,overflow:"hidden",background:cat.bg}}>
                <img src={CAT_PHOTOS[cat.id]} alt={lb.label}
                  style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.3s"}}
                  onError={e=>{e.currentTarget.style.display="none"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 60%)"}}/>
                <div style={{position:"absolute",top:12,left:12,width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.95)",display:"flex",alignItems:"center",justifyContent:"center"}}><TopicIcon id={cat.id}/></div>
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

// Quick Facts icons — Icon2c duotone, keyed by position (0-5) so they work
// across all 9 language versions without editing each translated factsList.
const FACTS_ICON_MAP=[
  {d:"M19 5L5 19M8.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.5 17a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",accent:"#16a34a"},   // 10% flat tax
  {d:"M17 6.5a6 6 0 100 11M4 10h8M4 14h8",accent:"#1d4ed8"},                                                              // Euro
  {d:"M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM12 9v5M9.5 11.5h5",accent:"#dc2626"},                              // Emergency 112
  {d:"M12 3a9 9 0 100 18 9 9 0 000-18zM12 6.5v.01M17.5 12v.01M12 17.5v.01M6.5 12v.01",accent:"#f0c060"},                   // EU member
  {d:"M3 19l6-9 4 5 3-4 5 8H3z",accent:"#b8792a"},                                                                        // Cost of living
  {d:"M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",accent:"#f0c060"}, // Sunny days
]

function QuickFacts({t}){
  return(
    <div style={{background:C.primaryLight,padding:"36px 20px",borderTop:`1px solid #bcd4c6`}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <h3 style={{fontSize:17,fontWeight:600,color:C.primary,margin:"0 0 18px"}}>{t.facts}</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:10}}>
          {t.factsList.map(([icon,text],i)=>(
            <div key={text} style={{display:"flex",alignItems:"flex-start",gap:10,background:"#fff",borderRadius:10,padding:"11px 13px",border:`1px solid #bcd4c6`,color:C.primary}}>
              <Icon2c d={(FACTS_ICON_MAP[i]||{}).d} accent={(FACTS_ICON_MAP[i]||{}).accent} size={18}/>
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
    {src:"https://images.unsplash.com/photo-1753529179550-c6aff1b76e6e?w=800&q=80",city:"Sofia",desc:"Alexander Nevsky Cathedral"},
    {src:plovdiv,city:"Plovdiv",desc:"Old Town Plovdiv"},
    {src:"https://images.unsplash.com/photo-1720959622076-a2a09dc4afbc?w=800&q=80",city:"Bansko",desc:"Pirin Mountains"},
    {src:"https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=800&q=80",city:"Black Sea",desc:"Sunny Beach"},
    {src:"https://images.unsplash.com/photo-1722447145262-3ff87e068c95?w=800&q=80",city:"Rila",desc:"Rila Monastery"},
    {src:nessebar,city:"Nessebar",desc:"Ancient Windmill"},
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
        <div className="bg-gallery-main" style={{position:"relative",borderRadius:18,overflow:"hidden",height:420,marginBottom:16,boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
          {photos.map((p,i)=>(
            <div key={i} style={{position:"absolute",inset:0,opacity:active===i?1:0,transition:"opacity 0.7s ease",zIndex:active===i?1:0}}>
              <div style={{position:"relative",width:"100%",height:"100%"}}>
                <div style={{position:"absolute",inset:0,background:["linear-gradient(135deg,#0d3d25,#2a7a52)","linear-gradient(135deg,#1a3a6a,#2a6aaa)","linear-gradient(135deg,#2a1a0a,#8a5a1a)","linear-gradient(135deg,#0a2a4a,#1a5a8a)","linear-gradient(135deg,#1a0a2a,#4a1a6a)","linear-gradient(135deg,#2a0a0a,#7a2a2a)"][i]}}/>
                <img src={p.src} alt={p.city} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}
                  onError={e=>{e.currentTarget.style.display="none"}}/>
              </div>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",bottom:24,left:28,right:28,display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:16}}>
                <div>
                  <div style={{color:"#f0c060",fontSize:13,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{p.city}</div>
                  <div style={{color:"#fff",fontSize:20,fontWeight:700}}>{p.desc}</div>
                </div>
                <button onClick={()=>setView("tourism")} style={{flexShrink:0,background:"#f0c060",border:"none",color:C.primaryDark,padding:"10px 20px",borderRadius:999,cursor:"pointer",fontSize:14,fontWeight:700,zIndex:5}}>
                  {lang==="fr"?"Explorer":lang==="es"?"Explorar":lang==="de"?"Entdecken":lang==="nl"?"Ontdekken":"Explore →"}
                </button>
              </div>
            </div>
          ))}
          <button onClick={()=>setActive(a=>(a-1+photos.length)%photos.length)} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",zIndex:10,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:44,height:44,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <button onClick={()=>setActive(a=>(a+1)%photos.length)} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",zIndex:10,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:44,height:44,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {photos.map((p,i)=>(
            <button key={i} onClick={()=>setActive(i)} className="bg-gallery-thumb" style={{flexShrink:0,width:90,height:60,borderRadius:10,overflow:"hidden",border:active===i?"3px solid #f0c060":"3px solid transparent",cursor:"pointer",padding:0,transition:"border 0.2s"}}>
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
          <div style={{marginBottom:7,display:"flex",justifyContent:"center"}}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f0c060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/></svg>
          </div>
          <h3 className="serif" style={{color:"#fff",fontSize:"clamp(20px,3vw,28px)",fontWeight:400,margin:"0 0 10px"}}>{t.ctaTitle}</h3>
          <p style={{color:"rgba(255,255,255,0.72)",fontSize:14,margin:0,lineHeight:1.6,whiteSpace:"pre-line"}}>{t.ctaSub}</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={()=>setView("chat")} style={{background:"#fff",border:"none",color:C.primary,padding:"12px 24px",borderRadius:999,cursor:"pointer",fontSize:14,fontWeight:700}}>
            {t.ctaBtn}
          </button>
          <button onClick={()=>setView("pricing")} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"12px 24px",borderRadius:999,cursor:"pointer",fontSize:14,fontWeight:600}}>
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
      <img src={LOGO_ICON} alt="BGexpats" style={{height:22,width:22,marginBottom:5}}/>
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
      const res=await fetch("/api/translate",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({text:body,language:LANGS[lang].name})
      })
      const data=await res.json()
      const translated=data?.translated||body
      setCache(prev=>({...prev,[key]:translated}))
    }catch(e){
      console.error("Translation error:",e)
      setCache(prev=>({...prev,[key]:body}))
    }
  }
  // Auto-translate all articles in background when page opens or language changes
  useEffect(()=>{
    if(lang==="en")return
    cat.articles.forEach((art,i)=>{
      const key=`${catId}_${i}_${lang}`
      if(!cache[key])translateArticle(i,art.body)
    })
  },[lang,catId])

  const handleOpen=(i)=>{
    const next=open===i?-1:i
    setOpen(next)
    // Also trigger in case it wasn't cached yet
    if(next>=0&&lang!=="en")translateArticle(next,cat.articles[next].body)
  }

  const renderInline=(str)=>
    // Split on both **bold** and [[view|label]] link markers.
    str.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).map((chunk,k)=>{
      if(chunk.startsWith("**")&&chunk.endsWith("**"))
        return<strong key={k} style={{fontWeight:700,color:C.text}}>{chunk.slice(2,-2)}</strong>
      if(chunk.startsWith("[[")&&chunk.endsWith("]]")){
        const[target,label]=chunk.slice(2,-2).split("|")
        // External URL → open in new tab; internal view → navigate in-app
        if(target.startsWith("http")){
          return<a key={k} href={target} target="_blank" rel="noopener noreferrer"
            style={{color:C.primary,fontWeight:700,textDecoration:"underline",fontFamily:"inherit"}}>{label||target}</a>
        }
        return<button key={k} onClick={()=>setView(target)} style={{background:"none",border:"none",padding:0,color:C.primary,fontWeight:700,cursor:"pointer",textDecoration:"underline",fontSize:"inherit",fontFamily:"inherit"}}>{label||target}</button>
      }
      return<Fragment key={k}>{chunk}</Fragment>
    })

  const formatBody=(text)=>{
    const lines=text.split("\n")
    return lines.map((line,i)=>{
      if(line.startsWith("## "))
        return<div key={i} style={{fontSize:19,fontWeight:600,color:C.text,margin:"22px 0 8px",paddingTop:i===0?0:14,borderTop:i===0?"none":`1px solid ${C.border}`,fontFamily:"'Sora',sans-serif"}}>{line.slice(3)}</div>
      if(line.startsWith("### "))
        return<div key={i} style={{fontSize:16,fontWeight:600,color:C.primary,margin:"16px 0 4px",fontFamily:"'Sora',sans-serif"}}>{line.slice(4)}</div>
      if(line.trim()==="---")
        return<div key={i} style={{height:1,background:C.border,margin:"18px 0"}}/>
      if(line.startsWith("|")&&line.endsWith("|")){
        const cells=line.slice(1,-1).split("|").map(c=>c.trim())
        if(cells.every(c=>/^:?-+:?$/.test(c)))return null
        const isHeader=/^\|(\s*:?-+:?\s*\|)+$/.test(lines[i+1]||"")
        return<div key={i} style={{display:"grid",gridTemplateColumns:`repeat(${cells.length},1fr)`,gap:8,padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontWeight:isHeader?700:400,fontSize:13.5,color:C.text,fontFamily:"'Inter',sans-serif"}}>
          {cells.map((c,ci)=><div key={ci}>{renderInline(c)}</div>)}
        </div>
      }
      if(line.startsWith("• ")||line.startsWith("- "))
        return<div key={i} style={{display:"flex",gap:8,margin:"4px 0",fontSize:14,lineHeight:1.7,color:C.text,fontFamily:"'Inter',sans-serif"}}><span style={{color:C.accent,flexShrink:0}}>•</span><span>{renderInline(line.slice(2))}</span></div>
      if(line.match(/^\d+\./))
        return<div key={i} style={{margin:"4px 0",paddingLeft:4,fontSize:14,lineHeight:1.7,color:C.text,fontFamily:"'Inter',sans-serif"}}>{renderInline(line)}</div>
      if(line.startsWith("💡"))
        return<div key={i} style={{background:"#fff9f0",border:`1px solid #f0d9b0`,borderRadius:8,padding:"9px 12px",margin:"12px 0 0",fontSize:13,color:"#8a5a1a",fontFamily:"'Inter',sans-serif"}}>{renderInline(line)}</div>
      const boldLead=line.match(/^\*\*(.+?)\*\*\s*(.*)$/)
      if(boldLead){
        const[,label,rest]=boldLead
        if(!rest)return<div key={i} style={{fontSize:16,fontWeight:600,color:C.text,margin:"14px 0 4px",lineHeight:1.5,fontFamily:"'Sora',sans-serif"}}>{renderInline(label)}</div>
        return<div key={i} style={{margin:"10px 0 2px",fontSize:14,lineHeight:1.7,color:C.text,fontFamily:"'Inter',sans-serif"}}><span style={{fontWeight:700,color:C.primary}}>{renderInline(label)}</span> {renderInline(rest)}</div>
      }
      if(line.trim()==="")return<div key={i} style={{height:6}}/>
      return<div key={i} style={{lineHeight:1.75,color:C.text,fontSize:14,fontFamily:"'Inter',sans-serif"}}>{renderInline(line)}</div>
    })
  }

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      <div className="bg-article-wrap" style={{maxWidth:820,margin:"0 auto",padding:"32px 20px 60px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:26}}>
          <div style={{width:46,height:46,borderRadius:13,background:cat.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon2c d={(COMMUNITY_ICON_MAP[cat.id]||{}).d} accent={(COMMUNITY_ICON_MAP[cat.id]||{}).accent} size={23}/></div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Sora',sans-serif"}}>{lb.label}</h1>
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
                  <span style={{fontWeight:600,fontSize:14,color:C.text,fontFamily:"'Sora',sans-serif",flex:1}}>{art.titles[lang]||art.titles.en}</span>
                  <span style={{display:"flex",alignItems:"center",gap:8}}>
                    {isLoading&&!isOpen&&<span style={{fontSize:11,color:C.muted,animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>}
                    <span style={{color:C.muted,fontSize:16,flexShrink:0,transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>⌄</span>
                  </span>
                </button>
                {isOpen&&(
                  <div style={{padding:"0 18px 18px",borderTop:`1px solid ${C.border}`,paddingTop:14}}>
                    {isLoading?(
                      <div style={{display:"flex",alignItems:"center",gap:8,color:C.muted,fontSize:13,padding:"20px 0"}}>
                        <span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> {t.translating}
                      </div>
                    ):bodyToShow?(
                      formatBody(bodyToShow)
                    ):(
                      lang!=="en"?(
                        <div style={{display:"flex",alignItems:"center",gap:8,color:C.muted,fontSize:13,padding:"20px 0"}}>
                          <span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> {t.translating}
                        </div>
                      ):<>{formatBody(art.body)}</>
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
          <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c060" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/></svg>
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:600,fontSize:14}}>{t.chatTitle}</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>{t.chatSub}</div>
          </div>
          <div style={{marginLeft:"auto",background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"3px 10px",fontSize:12,color:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",gap:6}}>
            <img src={`https://flagcdn.com/32x24/${LANGS[lang].cc}.png`} alt="" width="16" height="12" style={{borderRadius:2,display:"block"}}/>
            {LANGS[lang].name}
          </div>
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:"18px 16px"}}>
        <div style={{maxWidth:780,margin:"0 auto",display:"flex",flexDirection:"column",gap:12}}>
          {messages.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div className="bg-chat-bubble" style={{maxWidth:"82%",background:m.role==="user"?C.primary:C.surface,color:m.role==="user"?"#fff":C.text,borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"11px 15px",fontSize:14,border:m.role==="assistant"?`1px solid ${C.border}`:"none",boxShadow:m.role==="assistant"?"0 1px 3px rgba(0,0,0,0.04)":"none"}}>
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
// User accounts are now handled by Supabase Auth (passwords hashed server-side).
// The old hardcoded SESSION_USERS array has been removed — it exposed credentials
// in the public JS bundle and did not persist registrations.
const INIT_REVIEWS = {
  legal:[{author:"David K.",av:"DK",rating:5,time:"1 month ago",text:"The Type D visa guide was incredibly detailed. Followed it step by step and got approved first try!"}],
  healthcare:[{author:"Lisa M.",av:"LM",rating:4,time:"2 weeks ago",text:"Great info about Tokuda Hospital. The English-speaking staff really made a difference at my first appointment."}],
  banking:[{author:"Tom R.",av:"TR",rating:5,time:"3 weeks ago",text:"Opened my DSK account following this guide. Very smooth process — about 1 hour total."}],
  tourism:[{author:"Anna B.",av:"AB",rating:5,time:"1 week ago",text:"The Plovdiv recommendation was spot on! Spent a whole day there and it was magical."}],
  housing:[{author:"Chris N.",av:"CN",rating:4,time:"2 months ago",text:"Found my apartment in Lozenets thanks to the imoti.net tip. Great neighbourhood for expats!"}],
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
  const [busy,setBusy]=useState(false)
  const [notice,setNotice]=useState("")
  const [showPass,setShowPass]=useState(false)

  const submit=async()=>{
    setErr("");setNotice("")
    if(!email.includes("@")){setErr("Please enter a valid email address.");return}
    if(pass.length<6){setErr("Password must be at least 6 characters.");return}
    if(mode==="register"&&!name.trim()){setErr("Please enter your full name.");return}

    setBusy(true)
    try{
      if(mode==="register"){
        const {data,error}=await sbSignUp(email,pass,name.trim())
        if(error){
          setErr(error.message||"Could not create your account. Please try again.")
          setBusy(false);return
        }
        // If email confirmation is on, there's no session yet — tell the user to check their inbox.
        if(!data.session){
          setNotice("Almost there! Check your email to confirm your account, then sign in.")
          setMode("login");setPass("");setBusy(false);return
        }
        const u=await sbGetCurrentUser()
        setUser(u);setOk(true);gtrack("sign_up",{method:"email"})
        setTimeout(()=>setView("community"),900)
      } else {
        const {error}=await sbSignIn(email,pass)
        if(error){
          setErr("Incorrect email or password.")
          setBusy(false);return
        }
        const u=await sbGetCurrentUser()
        setUser(u);setOk(true);gtrack("login",{method:"email"})
        setTimeout(()=>setView("community"),900)
      }
    }catch(e){
      setErr("Something went wrong. Please try again.")
      setBusy(false)
    }
  }

  const forgot=async()=>{
    setErr("");setNotice("")
    if(!email.includes("@")){setErr("Enter your email address first, then click 'Forgot password'.");return}
    const {error}=await sbResetPassword(email)
    if(error){setErr("Could not send the reset email. Please try again.");return}
    setNotice("Password reset email sent — check your inbox.")
  }

  return(
    <div style={{minHeight:"calc(100vh - 100px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px",background:C.page}}>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{background:C.surface,borderRadius:22,border:`1px solid ${C.border}`,boxShadow:"0 12px 40px rgba(0,0,0,0.1)",overflow:"hidden"}}>
          <div style={{background:`linear-gradient(135deg,${C.primary} 0%,#2a7a52 100%)`,padding:"36px 32px 30px",textAlign:"center"}}>
            <img src={LOGO_ICON} alt="BGexpats" style={{height:40,width:40,marginBottom:10}}/>
            <h1 style={{color:"#fff",fontSize:24,fontWeight:800,margin:"0 0 6px",letterSpacing:"-0.4px"}}>BGexpats Community</h1>
            <p style={{color:"rgba(255,255,255,0.72)",fontSize:14,margin:0}}>Join expats sharing tips about Bulgaria</p>
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
              <div style={{position:"relative"}}>
                <input value={pass} onChange={e=>setPass(e.target.value)} type={showPass?"text":"password"} placeholder="Minimum 6 characters"
                  onKeyDown={e=>e.key==="Enter"&&submit()}
                  style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 44px 11px 14px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}}/>
                <button type="button" onClick={()=>setShowPass(s=>!s)}
                  style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:4,color:C.muted,display:"flex",alignItems:"center"}}>
                  {showPass?(
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ):(
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {err&&<div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#c00",marginBottom:16}}>⚠️ {err}</div>}
            {notice&&<div style={{background:"#f0f6ff",border:"1px solid #b8d4f0",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#1d4ed8",marginBottom:16}}>✉️ {notice}</div>}
            {ok&&<div style={{background:"#f0fff4",border:"1px solid #9de",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#060",marginBottom:16}}>✅ Welcome! Redirecting to community...</div>}
            <button onClick={submit} disabled={busy}
              style={{width:"100%",background:busy?"#9bb8a8":C.primary,border:"none",color:"#fff",padding:"13px",borderRadius:10,cursor:busy?"default":"pointer",fontSize:15,fontWeight:700,marginBottom:18,boxSizing:"border-box"}}>
              {busy?"Please wait…":(mode==="login"?"Sign in to community":"Join the community →")}
            </button>
            <div style={{textAlign:"center",padding:"14px 0",borderTop:`1px solid ${C.border}`}}>
              {mode==="login"&&(
                <button onClick={forgot} style={{background:"none",border:"none",color:C.primary,cursor:"pointer",fontSize:13,textDecoration:"underline",padding:0}}>
                  Forgot your password?
                </button>
              )}
              {mode==="register"&&(
                <p style={{fontSize:12,color:C.muted,margin:0,lineHeight:1.5}}>
                  By creating an account you agree to our terms and privacy policy.
                </p>
              )}
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
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const onResize=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",onResize)
    return()=>window.removeEventListener("resize",onResize)
  },[])
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
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:isMobile?"18px 14px":"24px 20px",display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 300px",gap:isMobile?16:20,alignItems:"start"}}>
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

          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:10,marginBottom:14,maxWidth:"100%",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
            {tabs.map(c=>(
              <button key={c} onClick={()=>setFilter(c)}
                style={{background:filter===c?C.primary:C.surface,border:`1px solid ${filter===c?C.primary:C.border}`,color:filter===c?"#fff":C.text,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:filter===c?700:400,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>
                <span style={{display:"flex",alignItems:"center",gap:5}}><Icon2c d={(COMMUNITY_ICON_MAP[c]||{}).d} accent={(COMMUNITY_ICON_MAP[c]||{}).accent} size={14}/>{c==="all"?"All":c.charAt(0).toUpperCase()+c.slice(1)}</span>
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
                      <span style={{fontSize:11,background:CAT_COLORS[post.cat],padding:"2px 9px",borderRadius:10,color:C.text,display:"inline-flex",alignItems:"center",gap:4}}><Icon2c d={(COMMUNITY_ICON_MAP[post.cat]||{}).d} accent={(COMMUNITY_ICON_MAP[post.cat]||{}).accent} size={12}/>{post.cat}</span>
                    </div>
                    <p style={{fontSize:14,color:C.text,margin:"0 0 12px",lineHeight:1.65,overflowWrap:"anywhere",wordBreak:"break-word"}}>{post.content}</p>
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
              <img src={LOGO_ICON} alt="BGexpats" style={{height:32,width:32,marginBottom:8}}/>
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
            <div style={{marginBottom:6}}><Icon2c d={CONNECT_ICON_D} accent="#f0c060" size={24}/></div>
            <div style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:4}}>Meet & Connect</div>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:12,margin:"0 0 12px"}}>Find friends or romance with Bulgarians and expats</p>
            <button onClick={()=>setView("connect")} style={{background:"#fff",border:"none",color:"#6b21a8",padding:"8px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,width:"100%"}}>Browse profiles →</button>
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
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const r=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r)
  },[])
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
  const cats=[["rent","Rent","rent"],["food","Groceries","food"],["transport","Transport","transport"],["utilities","Utilities","utilities"],["dining","Dining out","dining"],["health","Health","health"]]

  return(
    <div>
      {/* Mode toggle */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <button onClick={()=>setMode("single")} style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${mode==="single"?C.primary:C.border}`,background:mode==="single"?C.primaryLight:"transparent",color:mode==="single"?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:mode==="single"?600:400}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}><Icon2c d={MAP_PIN_D} accent="#1e5e3f" size={14}/>Single city</span>
        </button>
        <button onClick={()=>isBasic?setMode("compare"):setView("pricing")} style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${mode==="compare"?C.accent:C.border}`,background:mode==="compare"?C.accentLight:"transparent",color:mode==="compare"?C.accent:C.muted,cursor:"pointer",fontSize:13,fontWeight:mode==="compare"?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}><Icon2c d="M12 3v3M5 7l4-1M19 7l-4-1M5 7l-3 6.5a3 3 0 006 0zM19 7l-3 6.5a3 3 0 006 0zM8 21h8M12 6v15" accent="#b8792a" size={14}/>Compare cities</span>
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
                <Icon2c d={MAP_PIN_D} accent={city===id?"#1e5e3f":"#b8792a"} size={13}/><span>{cd.name}</span>
              </button>
            ))}
          </div>
          {/* City vibe */}
          <div style={{background:C.primaryLight,borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.primary}}>
            <strong>{CITY_DATA[city]?.name}</strong> — {CITY_DATA[city]?.vibe}
          </div>
          {/* Breakdown */}
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {cats.map(([icon,label,key])=>(
              <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.page,borderRadius:8,padding:"9px 12px"}}>
                <span style={{fontSize:13,color:C.text,display:"flex",alignItems:"center",gap:6}}><Icon2c d={(EXPENSE_ICON_MAP[icon]||{}).d} accent={(EXPENSE_ICON_MAP[icon]||{}).accent} size={14}/>{label}</span>
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
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:14}}>
            <select value={city} onChange={e=>setCity(e.target.value)} style={{border:`2px solid ${C.primary}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontWeight:600,color:C.primary,background:C.primaryLight,outline:"none"}}>
              {cities.filter(([id])=>id!==city2).map(([id,cd])=><option key={id} value={id}>{cd.flag} {cd.name}</option>)}
            </select>
            <span style={{textAlign:"center",fontWeight:700,color:C.muted,fontSize:18}}>vs</span>
            <select value={city2} onChange={e=>setCity2(e.target.value)} style={{border:`2px solid ${C.accent}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontWeight:600,color:C.accent,background:C.accentLight,outline:"none"}}>
              {cities.filter(([id])=>id!==city).map(([id,cd])=><option key={id} value={id}>{cd.flag} {cd.name}</option>)}
            </select>
          </div>
          {/* Side by side breakdown */}
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <div style={{minWidth:isMobile?420:"auto",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:C.page,padding:"8px 12px",fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              <span>Category</span><span style={{textAlign:"right",color:C.primary}}>{CITY_DATA[city]?.flag} {CITY_DATA[city]?.name}</span>
              <span style={{textAlign:"right",color:C.accent}}>{CITY_DATA[city2]?.flag} {CITY_DATA[city2]?.name}</span>
            </div>
            {cats.map(([icon,label,key])=>{
              const diff=v1[key]-v2[key]
              return(
                <div key={key} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"9px 12px",borderTop:`1px solid ${C.border}`,fontSize:13,alignItems:"center"}}>
                  <span style={{color:C.text,display:"flex",alignItems:"center",gap:6}}><Icon2c d={(EXPENSE_ICON_MAP[icon]||{}).d} accent={(EXPENSE_ICON_MAP[icon]||{}).accent} size={13}/>{label}</span>
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
          </div>
          {/* Summary bars */}
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:10}}>
            {[[city,total1,C.primary],[city2,total2,C.accent]].map(([cid,tot,col])=>(
              <div key={cid} style={{background:`${col}15`,border:`1.5px solid ${col}40`,borderRadius:12,padding:"14px",textAlign:"center"}}>
                <div style={{marginBottom:4,display:"flex",justifyContent:"center"}}><Icon2c d={MAP_PIN_D} accent={col} size={20}/></div>
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
        {[["employee","Employee"],["eood","EOOD Owner"]].map(([k,l])=>(
          <button key={k} onClick={()=>setMode(k)} style={{flex:1,padding:"9px",borderRadius:10,border:`1.5px solid ${mode===k?C.primary:C.border}`,background:mode===k?C.primaryLight:"transparent",color:mode===k?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:mode===k?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon2c d={k==="employee"?"M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7":"M4 8h16v11H4zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2"} accent={k==="employee"?"#1d4ed8":"#b8792a"} size={14}/>{l}</button>
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
          <span style={{display:"flex",alignItems:"center",gap:6}}><Icon2c d={MAP_PIN_D} accent="#1e5e3f" size={14}/>By city</span>
        </button>
        <button onClick={()=>isBasic?setMode("allcities"):setView("pricing")} style={{flex:1,padding:"7px",borderRadius:10,border:`1.5px solid ${mode==="allcities"?C.accent:C.border}`,background:mode==="allcities"?C.accentLight:"transparent",color:mode==="allcities"?C.accent:C.muted,cursor:"pointer",fontSize:12,fontWeight:mode==="allcities"?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}><Icon2c d={MAP_ICON_MAP.all} accent="#b8792a" size={14}/>All cities</span>
          {!isBasic&&<span style={{fontSize:9,background:"#fef3c7",color:"#92400e",padding:"1px 5px",borderRadius:5,fontWeight:700}}>BASIC</span>}
        </button>
      </div>
      {/* City selector (only in city mode) */}
      {mode==="city"&&(
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          {[["sofia","Sofia"],["plovdiv","Plovdiv"],["varna","Varna"],["burgas","Burgas"],["stara","Stara Zagora"],["ruse","Ruse"],["bansko","Bansko"],["velingrad","Velingrad"],["shumen","Shumen"],["yambol","Yambol"],["sliven","Sliven"]].map(([id,label])=>(
            <button key={id} onClick={()=>setHoodCity(id)} style={{padding:"5px 12px",borderRadius:16,border:`1.5px solid ${hoodCity===id?C.primary:C.border}`,background:hoodCity===id?C.primaryLight:"transparent",color:hoodCity===id?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:hoodCity===id?600:400,display:"flex",alignItems:"center",gap:5}}><Icon2c d={MAP_PIN_D} accent={hoodCity===id?"#1e5e3f":"#b8792a"} size={13}/>{label}</button>
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
  // Fallback rates (per 1 EUR) — used if the live fetch fails.
  const FALLBACK={EUR:1,USD:1.09,GBP:0.85,CHF:0.96,SEK:11.2,DKK:7.46,NOK:11.6,PLN:4.28,RON:4.97,TRY:38.2,CAD:1.50,AUD:1.67}
  const CURRENCIES=["EUR","USD","GBP","CHF","SEK","DKK","NOK","PLN","RON","TRY","CAD","AUD"]
  const [rates,setRates]=useState(FALLBACK)
  const [liveRates,setLiveRates]=useState(false)
  const [ratesUpdated,setRatesUpdated]=useState("Indicative rates")

  // Try to pull live rates. If anything fails we silently keep the fallback,
  // so this tool can never crash or go blank.
  useEffect(()=>{
    let cancelled=false
    ;(async()=>{
      try{
        const res=await fetch("https://api.frankfurter.app/latest?from=EUR")
        if(!res.ok)throw new Error("bad response")
        const data=await res.json()
        if(cancelled||!data||!data.rates)return
        setRates({EUR:1,...data.rates})
        setLiveRates(true)
        setRatesUpdated(data.date||"today")
      }catch{
        // keep fallback rates
      }
    })()
    return()=>{cancelled=true}
  },[])

  // Convert `amount` of `base` into currency `c`.
  const convert=(c)=>{
    const from=rates[base]
    const to=rates[c]
    if(!from||!to)return "—"
    const value=(Number(amount)||0)/from*to
    return value.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})
  }

  return(
    <div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value)||0)} style={{flex:1,minWidth:0,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"12px 14px",fontSize:22,fontWeight:600,color:C.text,background:C.page,outline:"none"}}/>
        <select value={base} onChange={e=>setBase(e.target.value)} style={{flexShrink:0,border:`1.5px solid ${C.primary}`,borderRadius:10,padding:"12px 14px",fontSize:15,fontWeight:600,color:C.primary,background:C.primaryLight,outline:"none"}}>
          {CURRENCIES.filter(c=>rates[c]).map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {CURRENCIES.filter(c=>c!==base&&rates[c]).map(c=>(
          <div key={c} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,background:c==="EUR"?C.primaryLight:C.page,border:`1px solid ${c==="EUR"?C.primary:C.border}`,borderRadius:10,padding:"10px 16px"}}>
            <div style={{minWidth:0}}>
              <span style={{fontSize:14,fontWeight:c==="EUR"?700:500,color:c==="EUR"?C.primary:C.text}}>{c}</span>
            </div>
            <span style={{fontSize:16,fontWeight:600,color:c==="EUR"?C.primary:C.text,whiteSpace:"nowrap"}}>{convert(c)}</span>
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
  const cats=[{v:"basics",l:"Basics"},{v:"bank",l:"Banking"},{v:"health",l:"Health"},{v:"transport",l:"Transport"},{v:"emergency",l:"Emergency"}]
  const list=PHRASES[cat]||[]
  const filtered=q?Object.values(PHRASES).flat().filter(p=>p.en.toLowerCase().includes(q.toLowerCase())||p.ph.toLowerCase().includes(q.toLowerCase())):list
  return(
    <div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search phrases in English..." style={{width:"100%",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,outline:"none",color:C.text,background:C.page,marginBottom:12,boxSizing:"border-box"}}/>
      {!q&&(
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {cats.map(c=><button key={c.v} onClick={()=>setCat(c.v)} style={{padding:"5px 12px",borderRadius:16,border:`1.5px solid ${cat===c.v?C.primary:C.border}`,background:cat===c.v?C.primaryLight:"transparent",color:cat===c.v?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:cat===c.v?600:400,display:"flex",alignItems:"center",gap:5}}><Icon2c d={(PHRASE_CAT_ICON_MAP[c.v]||{}).d} accent={(PHRASE_CAT_ICON_MAP[c.v]||{}).accent} size={13}/>{c.l}</button>)}
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


// ── 2C-style duotone icon helper ────────────────────────────────────
function Icon2c({d,accent="#f0c060",size=16}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink:0}}>
      <path fill={accent} fillOpacity=".32" stroke="none" d={d}/>
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d={d}/>
    </svg>
  )
}
const TOOLS_ICON_MAP={
  cost:{d:"M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z M15 12a1.3 1.3 0 102.6 0 1.3 1.3 0 00-2.6 0z",accent:"#f0c060"},
  tax:{d:"M5 20V11h3v9H5zm5.5 0V4h3v16h-3zM16 20v-6h3v6h-3z",accent:"#1d4ed8"},
  visa:{d:"M7 2h8l3 3v17H7V2zM10 8h5M10 12h5M10 16h3",accent:"#16a34a"},
  hood:{d:"M4 21V10l5-4 5 4v11M14 21V6l4 3v12M4 21h16M9 21v-5h2v5",accent:"#b8792a"},
  fx:{d:"M4 7h13M17 7l-3.5-3.5M17 7l-3.5 3.5M20 17H7M7 17l3.5-3.5M7 17l3.5 3.5",accent:"#0891b2"},
  checklist:{d:"M5 4h14v16H5z M8.5 12l2.5 2.5 4.5-5",accent:"#1e5e3f"},
  phrases:{d:"M4 4h16v12H8l-4 4V4z M8 9h8M8 13h5",accent:"#7c3aed"},
  docgen:{d:"M7 2h7l4 4v16H7V2zM11 8h5M11 12h5M11 16h5",accent:"#9333ea"},
  relocate:{d:"M9 3l6 2 6-2v16l-6 2-6-2-6 2V5zM9 3v16M15 5v16",accent:"#f0c060"},
  property:{d:"M4 11l8-7 8 7M6 10v10h12V10",accent:"#b45309"},
  deadlines:{d:"M5 4h14v17H5z M5 9h14M9 2v4M15 2v4",accent:"#dc2626"},
  hoodmatch:{d:"M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",accent:"#db2777"},
  langcoach:{d:"M12 3l9 4-9 4-9-4 9-4zM5 10v4c0 1.5 3 3.2 7 3.2s7-1.7 7-3.2v-4",accent:"#16a34a"},
  budget:{d:"M12 3a9 9 0 109 9h-9z M12 12V3a9 9 0 00-9 9 9 9 0 009 9",accent:"#1d4ed8"},
}
const EXPENSE_ICON_MAP={
  rent:{d:"M4 11l8-7 8 7M6 10v10h12V10",accent:"#b45309"},
  food:{d:"M7 2v8a2 2 0 002 2v10M7 2v8M9.3 2v8M17 2c-2.2 0-3.5 3-3.5 6.5S17 15 17 15v9",accent:"#16a34a"},
  transport:{d:"M4 16l1.5-5A2 2 0 017.4 9.5h9.2a2 2 0 011.9 1.5L20 16v4h-2v-1H6v1H4zM6 16h.01M18 16h.01",accent:"#1d4ed8"},
  utilities:{d:"M9 2h6l-1.5 8H17l-8 12 2-9H7z",accent:"#f0c060"},
  dining:{d:"M8 3h8l-1 6.2a3 3 0 01-3 2.8v0a3 3 0 01-3-2.8L8 3zM12 12v6M9 21h6",accent:"#7c2d12"},
  health:{d:"M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 5.5h2.4v3.8h3.8v2.4h-3.8v3.8h-2.4v-3.8H7v-2.4h3.8V7.5z",accent:"#16a34a"},
  savings:{d:"M12 3a9 9 0 109 9h-9z M12 12V3a9 9 0 00-9 9 9 9 0 009 9",accent:"#1d4ed8"},
  salary:{d:"M4 8h16v11H4zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2",accent:"#dc2626"},
  freelance:{d:"M4 6h16v12H4zM4 10h16M8 14h4",accent:"#9333ea"},
  other:{d:"M12 2l1.2 4.4 4.4-1.2-2.6 3.8 3.8 2.6-4.4 1.2L12 17l-2.4-4.2-4.4-1.2 3.8-2.6L6.4 5.2l4.4 1.2z",accent:"#6b7280"},
}
const PHRASE_CAT_ICON_MAP={
  basics:{d:"M4 4h16v12H8l-4 4V4z M8 9h8M8 13h5",accent:"#7c3aed"},
  bank:{d:"M3 10l9-6 9 6M5 10v9M10 10v9M14 10v9M19 10v9M3 21h18",accent:"#1d4ed8"},
  health:{d:"M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 5.5h2.4v3.8h3.8v2.4h-3.8v3.8h-2.4v-3.8H7v-2.4h3.8V7.5z",accent:"#16a34a"},
  transport:{d:"M4 16l1.5-5A2 2 0 017.4 9.5h9.2a2 2 0 011.9 1.5L20 16v4h-2v-1H6v1H4zM6 16h.01M18 16h.01",accent:"#0891b2"},
  emergency:{d:"M12 2l9 4.5v6c0 5-3.5 8.5-9 9.5-5.5-1-9-4.5-9-9.5v-6L12 2zM12 8v5M12 16h.01",accent:"#dc2626"},
}
const CONNECT_ICON_MAP={
  all:{d:"M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 21c0-3.5 3-6 6-6M22 21c0-3.5-3-6-6-6M8 21c0-3.9 2-6 4-6s4 2.1 4 6",accent:"#9333ea"},
  bulgarian:{d:"M5 3v18M5 4h13l-2.5 3 2.5 3H5",accent:"#00966e"},
  expat:{d:"M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z",accent:"#2563eb"},
  friends:{d:"M9 11a3 3 0 100-6 3 3 0 000 6zm7 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 21c0-3.9 2.8-6 6.5-6M15.5 21c0-3-1.8-5-4-5.5",accent:"#16a34a"},
  networking:{d:"M4 8h16v11H4zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2",accent:"#b8792a"},
  roommate:{d:"M4 11l8-7 8 7M6 10v10h12V10",accent:"#7c3aed"},
  dating:{d:"M12 20.5s-7-4.3-9.3-8.7C1.4 8.7 2.8 5.5 6 5.5c1.9 0 3.2 1.2 6 3.7 2.8-2.5 4.1-3.7 6-3.7 3.2 0 4.6 3.2 3.3 6.3-2.3 4.4-9.3 8.7-9.3 8.7z",accent:"#db2777"},
  shield:{d:"M12 2l9 4.5v6c0 5-3.5 8.5-9 9.5-5.5-1-9-4.5-9-9.5v-6L12 2zM9 12l2 2 4-4",accent:"#f0c060"},
}
const MAP_ICON_MAP={
  all:"M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z",
  health:"M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 5.5h2.4v3.8h3.8v2.4h-3.8v3.8h-2.4v-3.8H7v-2.4h3.8V7.5z",
  bank:"M3 10l9-6 9 6M5 10v9M10 10v9M14 10v9M19 10v9M3 21h18",
  legal:"M12 3v3M5 7l4-1M19 7l-4-1M5 7l-3 6.5a3 3 0 006 0zM19 7l-3 6.5a3 3 0 006 0zM8 21h8M12 6v15",
  work:"M4 8h16v11H4zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2",
  car:"M4 16l1.5-5A2 2 0 017.4 9.5h9.2a2 2 0 011.9 1.5L20 16v4h-2v-1H6v1H4zM6 16h.01M18 16h.01",
  jobs:"M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7",
  art:"M12 3a9 9 0 000 18c1.4 0 2-.9 2-1.8 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1 .8-1.9 1.9-1.9H17a4 4 0 004-4c0-5-4-7.5-9-7.5zM7.5 11a1.3 1.3 0 100-2.6 1.3 1.3 0 000 2.6zm3-4a1.3 1.3 0 100-2.6 1.3 1.3 0 000 2.6zm5 0a1.3 1.3 0 100-2.6 1.3 1.3 0 000 2.6zm2 4a1.3 1.3 0 100-2.6 1.3 1.3 0 000 2.6z",
  dining:"M7 2v8a2 2 0 002 2v10M7 2v8M9.3 2v8M17 2c-2.2 0-3.5 3-3.5 6.5S17 15 17 15v9",
  party:"M12 2l1.2 4.4 4.4-1.2-2.6 3.8 3.8 2.6-4.4 1.2L12 17l-2.4-4.2-4.4-1.2 3.8-2.6L6.4 5.2l4.4 1.2z",
  festival:"M12 3l9 8H3zM7 11v8M17 11v8M3 19h18",
  disco:"M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3v18M6.5 6.5l11 11M17.5 6.5l-11 11",
  piano:"M4 6h16v12H4zM7.5 6v8M11 6v8M13 6v8M16.5 6v8",
  hotel:"M3 18v-7a2 2 0 012-2h6a2 2 0 012 2v1h6a2 2 0 012 2v4M3 18h18M7 11a2 2 0 100-4 2 2 0 000 4z",
  cultural:"M4 21h16M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6",
  tradfest:"M12 3a9 9 0 00-9 9c0 3 2 5 4 6M12 3a9 9 0 019 9c0 3-2 5-4 6M8.5 10a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm7 0a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5",
  wine:"M8 3h8l-1 6.2a3 3 0 01-3 2.8v0a3 3 0 01-3-2.8L8 3zM12 12v6M9 21h6",
  summer:"M12 8a4 4 0 100 8 4 4 0 000-8zM12 3v2M12 19v2M4.2 12H6M18 12h1.8M6 6l1.3 1.3M16.7 16.7L18 18M18 6l-1.3 1.3M7.3 16.7L6 18",
  winter:"M12 2v20M5 5l14 14M19 5L5 19M12 6.5l-2 2M12 6.5l2 2M12 17.5l-2-2M12 17.5l2-2",
  hood:"M4 21V10l5-4 5 4v11M14 21V6l4 3v12M4 21h16",
}
const MAP_PIN_D="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
const COMMUNITY_ICON_MAP={
  all:{d:MAP_ICON_MAP.all,accent:"#1e5e3f"},
  general:{d:"M4 4h16v12H7l-3 3V4z",accent:"#6b7280"},
  legal:{d:MAP_ICON_MAP.legal,accent:"#1d4ed8"},
  healthcare:{d:MAP_ICON_MAP.health,accent:"#16a34a"},
  banking:{d:MAP_ICON_MAP.bank,accent:"#b45309"},
  tourism:{d:"M2 13l20-7-7 20-3-8-8-3z",accent:"#2563eb"},
  housing:{d:"M4 11l8-7 8 7M6 10v10h12V10",accent:"#7c3aed"},
  business:{d:MAP_ICON_MAP.work,accent:"#dc2626"},
}
const CONNECT_ICON_D="M12 20.5s-7-4.3-9.3-8.7C1.4 8.7 2.8 5.5 6 5.5c1.9 0 3.2 1.2 6 3.7 2.8-2.5 4.1-3.7 6-3.7 3.2 0 4.6 3.2 3.3 6.3-2.3 4.4-9.3 8.7-9.3 8.7z"

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
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const onResize=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",onResize)
    return()=>window.removeEventListener("resize",onResize)
  },[])
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
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:isMobile?"26px 16px 42px":"32px 20px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(24px,4vw,38px)",fontWeight:400,margin:"0 0 6px"}}>Expat tools</h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:isMobile?13:15,margin:0,fontWeight:300}}>Free interactive tools to plan your life in Bulgaria</p>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:isMobile?"-24px auto 32px":"-24px auto 48px",padding:isMobile?"0 12px":"0 20px"}}>
        {isMobile ? (
          /* MOBILE: dropdown selector, then the tool at full screen width */
          <>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
              <label style={{display:"block",fontSize:11,fontWeight:600,color:C.muted,letterSpacing:"0.05em",marginBottom:6}}>CHOOSE A TOOL</label>
              <select
                value={active}
                onChange={e=>{setActive(e.target.value);trackEvent("tool",e.target.value)}}
                style={{width:"100%",padding:"11px 12px",fontSize:15,fontWeight:600,color:C.primary,background:C.primaryLight,border:`1px solid ${C.border}`,borderRadius:10,cursor:"pointer",appearance:"none",WebkitAppearance:"none",backgroundImage:"url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e5e3f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",backgroundSize:"18px",paddingRight:36}}>
                <optgroup label="Free tools">
                  {TOOLS_LIST.filter(t=>!t.divider&&!t.premium).map(t=>(
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Premium tools">
                  {TOOLS_LIST.filter(t=>!t.divider&&t.premium).map(t=>(
                    <option key={t.id} value={t.id}>{t.label} (PRO)</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 14px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14,paddingBottom:12,borderBottom:`1px solid ${C.border}`}}>
                {tool&&<Icon2c d={(TOOLS_ICON_MAP[tool.id]||{}).d} accent={(TOOLS_ICON_MAP[tool.id]||{}).accent} size={22}/>}
                <div style={{minWidth:0}}>
                  <h2 className="serif" style={{fontSize:17,fontWeight:400,color:C.text,margin:0,display:"flex",alignItems:"center",gap:6}}>
                    {(tool&&tool.label)}
                    {tool&&tool.premium&&<span style={{fontSize:9,background:"#fef3c7",color:"#92400e",padding:"1px 5px",borderRadius:5,fontWeight:700}}>PRO</span>}
                  </h2>
                  <p style={{fontSize:12,color:C.muted,margin:0}}>{(tool&&tool.desc)}</p>
                </div>
              </div>
              {render()}
            </div>
          </>
        ) : (
          /* DESKTOP: sidebar + tool, unchanged */
          <div style={{display:"grid",gridTemplateColumns:"min(220px,30vw) 1fr",gap:"clamp(8px,2vw,20px)",alignItems:"start"}}>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
              {TOOLS_LIST.map(t=>{
                if(t.divider)return<div key={t.id} style={{padding:"8px 14px",fontSize:10,fontWeight:600,color:C.muted,letterSpacing:"0.06em",borderTop:`1px solid ${C.border}`,marginTop:4}}>{t.label}</div>
                return(
                  <button key={t.id} onClick={()=>{setActive(t.id);trackEvent("tool",t.id)}}
                    style={{width:"100%",background:active===t.id?C.primaryLight:"transparent",border:"none",borderLeft:`3px solid ${active===t.id?C.primary:"transparent"}`,padding:"11px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8,transition:"all 0.15s"}}>
                    <Icon2c d={(TOOLS_ICON_MAP[t.id]||{}).d} accent={(TOOLS_ICON_MAP[t.id]||{}).accent} size={17}/>
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
                {tool&&<Icon2c d={(TOOLS_ICON_MAP[tool.id]||{}).d} accent={(TOOLS_ICON_MAP[tool.id]||{}).accent} size={24}/>}
                <div>
                  <h2 className="serif" style={{fontSize:19,fontWeight:400,color:C.text,margin:0}}>{(tool&&tool.label)}</h2>
                  <p style={{fontSize:13,color:C.muted,margin:0}}>{(tool&&tool.desc)}</p>
                </div>
              </div>
              {render()}
            </div>
          </div>
        )}
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
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const onResize=()=>{
      setIsMobile(window.innerWidth<=768)
      if(mapInst.current)setTimeout(()=>mapInst.current.invalidateSize(),100)
    }
    window.addEventListener("resize",onResize)
    return()=>window.removeEventListener("resize",onResize)
  },[])
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

  // MapTiler API key — renders street/place labels in LATIN script (e.g. "Vitosha Blvd"
  // instead of "бул. Витоша") so non-Cyrillic readers can use the map.
  // Key is domain-locked (bgexpats.com / *.vercel.app) so it's safe in frontend code.
  // If left as the placeholder OR if MapTiler tiles fail to load, the map automatically
  // falls back to standard OpenStreetMap tiles so it never goes blank.
  const MAPTILER_KEY = "nH3oySI2WkMV18HpsJCK"

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
    const map=L.map(mapRef.current,{zoomControl:true,maxZoom:20}).setView([42.6977,23.3219],13)

    // Standard OpenStreetMap tiles (local Cyrillic labels) — used as fallback.
    const osmLayer=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      referrerPolicy:"strict-origin-when-cross-origin",
      maxZoom:20,
      maxNativeZoom:19
    })

    const keySet = MAPTILER_KEY && MAPTILER_KEY!=="YOUR_MAPTILER_KEY"
    if(keySet){
      // MapTiler raster tiles with Latin labels. If a tile errors (bad key, quota,
      // network), swap the whole basemap to OSM so the map still works.
      let fellBack=false
      const mtLayer=L.tileLayer(
        `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}&language=latin`,{
          attribution:'© <a href="https://www.maptiler.com/copyright/">MapTiler</a> © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom:20,
          maxNativeZoom:20,
          crossOrigin:true
        })
      mtLayer.on("tileerror",()=>{
        if(fellBack)return
        fellBack=true
        map.removeLayer(mtLayer)
        osmLayer.addTo(map)
      })
      mtLayer.addTo(map)
    } else {
      osmLayer.addTo(map)
    }

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
              <span style={{display:"flex",alignItems:"center",gap:5}}><Icon2c d={MAP_PIN_D} accent="#f0c060" size={14}/>{c.label}</span>
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
                <Icon2c d={MAP_ICON_MAP[cat.id]} accent={cat.color} size={15}/> {cat.label}
                {locked&&<span style={{fontSize:10,background:PREMIUM_CATS.includes(cat.id)?"#f0c060":"var(--bg-accent)",color:PREMIUM_CATS.includes(cat.id)?"#1a3a20":"var(--text-accent)",padding:"1px 5px",borderRadius:6,fontWeight:700}}>{PREMIUM_CATS.includes(cat.id)?"PRO":"BASIC"}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Map + Sidebar */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:isMobile?"12px":"16px 20px",display:"grid",gridTemplateColumns:isMobile?"1fr":"320px 1fr",gap:16,alignItems:"start"}}>

        {/* Sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:10,order:isMobile?2:1}}>

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
                <button key={loc.id} onClick={()=>{setSelected(loc);mapInst.current&&mapInst.current.setView([loc.lat,loc.lng],15);if(isMobile&&mapRef.current)mapRef.current.scrollIntoView({behavior:"smooth",block:"center"})}}
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
        <div style={{borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`,boxShadow:"0 4px 20px rgba(0,0,0,0.08)",position:isMobile?"relative":"sticky",top:isMobile?0:80,order:isMobile?1:2}}>
          <div ref={mapRef} style={{height:isMobile?"60vh":"calc(100vh - 220px)",minHeight:isMobile?340:500,width:"100%",background:"#e8f0eb"}}/>
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
  const labels={en:{monthly:"Monthly",yearly:"Yearly",save:"Save 33%",mo:"/month",yr:"/year",getfree:"Get started free",getbasic:"Start Basic",getpremium:"Go Premium",popular:"Most popular",billed:"billed annually",permonth:"/month"},fr:{monthly:"Mensuel",yearly:"Annuel",save:"33% d'économie",mo:"/mois",yr:"/an",getfree:"Commencer gratuitement",getbasic:"Choisir Basic",getpremium:"Choisir Premium",popular:"Le plus populaire",billed:"facturé annuellement",permonth:"/mois",features_free:[{ok:true,text:"Articles de base (légal, logement, impôts)"},{ok:true,text:"5 questions IA par jour"},{ok:true,text:"Infos pratiques & urgences"},{ok:true,text:"8 langues"},{ok:false,text:"Communauté — publier, aimer, répondre"},{ok:false,text:"Tous les outils & calculateurs"},{ok:false,text:"Guides & modèles premium"}],features_basic:[{ok:true,text:"Tout du plan Gratuit"},{ok:true,text:"Accès complet à la communauté"},{ok:true,text:"Chat IA illimité"},{ok:true,text:"4 outils de planification (Budget, Déménagement, Quartier, Coach linguistique)"},{ok:true,text:"Toutes les catégories de carte (restaurants, culture, hôtels & plus)"},{ok:true,text:"Newsletter hebdomadaire"},{ok:false,text:"Outils, guides & modèles premium"}],features_premium:[{ok:true,text:"Tout du plan Basic",gold:true},{ok:true,text:"3 outils pro : Générateur de documents, ROI immobilier, Suivi des délais",gold:true},{ok:true,text:"Guides juridiques & fiscaux premium",gold:true},{ok:true,text:"Modèles PDF téléchargeables",gold:true},{ok:true,text:"Annuaire de services vérifiés",gold:true},{ok:true,text:"IA prioritaire — réponses approfondies",gold:true},{ok:true,text:"Badge membre vérifié",gold:true},{ok:true,text:"Accès anticipé aux nouvelles fonctionnalités",gold:true}]},es:{monthly:"Mensual",yearly:"Anual",save:"Ahorra 33%",mo:"/mes",yr:"/año",getfree:"Empezar gratis",getbasic:"Elegir Basic",getpremium:"Elegir Premium",popular:"El más popular",billed:"facturado anualmente",permonth:"/mes",features_free:[{ok:true,text:"Artículos básicos (legal, vivienda, impuestos)"},{ok:true,text:"5 preguntas de chat IA por día"},{ok:true,text:"Datos rápidos e información de emergencia"},{ok:true,text:"8 idiomas"},{ok:false,text:"Comunidad — publicar, dar me gusta, responder"},{ok:false,text:"Todas las herramientas y calculadoras"},{ok:false,text:"Guías y plantillas premium"}],features_basic:[{ok:true,text:"Todo del plan Gratuito"},{ok:true,text:"Acceso completo a la comunidad"},{ok:true,text:"Chat IA ilimitado"},{ok:true,text:"4 herramientas de planificación (Presupuesto, Reubicación, Barrio, Coach de idiomas)"},{ok:true,text:"Todas las categorías del mapa (restaurantes, cultura, hoteles y más)"},{ok:true,text:"Boletín semanal"},{ok:false,text:"Herramientas, guías y plantillas premium"}],features_premium:[{ok:true,text:"Todo del plan Basic",gold:true},{ok:true,text:"3 herramientas pro: Generador de documentos, ROI inmobiliario, Seguimiento de plazos",gold:true},{ok:true,text:"Guías legales y fiscales premium",gold:true},{ok:true,text:"Plantillas PDF descargables",gold:true},{ok:true,text:"Directorio de servicios verificados",gold:true},{ok:true,text:"IA prioritaria — respuestas más profundas",gold:true},{ok:true,text:"Insignia de miembro verificado",gold:true},{ok:true,text:"Acceso anticipado a nuevas funciones",gold:true}]},de:{monthly:"Monatlich",yearly:"Jährlich",save:"33% sparen",mo:"/Monat",yr:"/Jahr",getfree:"Kostenlos starten",getbasic:"Basic wählen",getpremium:"Premium wählen",popular:"Am beliebtesten",billed:"jährlich abgerechnet",permonth:"/Monat",features_free:[{ok:true,text:"Grundlegende Artikel (Recht, Wohnen, Steuern)"},{ok:true,text:"5 KI-Chatfragen pro Tag"},{ok:true,text:"Schnelle Fakten & Notfallinformationen"},{ok:true,text:"8 Sprachen"},{ok:false,text:"Community — posten, liken, antworten"},{ok:false,text:"Alle Tools & Rechner"},{ok:false,text:"Premium-Guides & Vorlagen"}],features_basic:[{ok:true,text:"Alles aus Free"},{ok:true,text:"Voller Community-Zugang"},{ok:true,text:"Unbegrenzter KI-Chat"},{ok:true,text:"4 Planungstools (Budget, Umzug, Stadtviertel, Sprachcoach)"},{ok:true,text:"Alle Kartenkategorien (Restaurants, Kultur, Hotels & mehr)"},{ok:true,text:"Wöchentlicher Newsletter"},{ok:false,text:"Premium-Tools, Guides & Vorlagen"}],features_premium:[{ok:true,text:"Alles aus Basic",gold:true},{ok:true,text:"3 Profi-Tools: Dokumentengenerator, Immobilien-ROI, Fristentracker",gold:true},{ok:true,text:"Premium-Rechts- & Steuerguides",gold:true},{ok:true,text:"Herunterladbare PDF-Vorlagen",gold:true},{ok:true,text:"Geprüftes Dienstleistungsverzeichnis",gold:true},{ok:true,text:"Prioritäts-KI — tiefere Antworten",gold:true},{ok:true,text:"Verifiziertes Mitgliederabzeichen",gold:true},{ok:true,text:"Früher Zugang zu neuen Funktionen",gold:true}]},nl:{monthly:"Maandelijks",yearly:"Jaarlijks",save:"33% besparen",mo:"/maand",yr:"/jaar",getfree:"Gratis beginnen",getbasic:"Basic kiezen",getpremium:"Premium kiezen",popular:"Meest populair",billed:"jaarlijks gefactureerd",permonth:"/maand",features_free:[{ok:true,text:"Basisartikelen (juridisch, wonen, belasting)"},{ok:true,text:"5 AI-chatvragen per dag"},{ok:true,text:"Snelle feiten & noodinformatie"},{ok:true,text:"8 talen"},{ok:false,text:"Community — posten, liken, reageren"},{ok:false,text:"Alle tools & rekenmachines"},{ok:false,text:"Premium gidsen & sjablonen"}],features_basic:[{ok:true,text:"Alles uit Gratis"},{ok:true,text:"Volledige toegang tot community"},{ok:true,text:"Onbeperkte AI-chat"},{ok:true,text:"4 planningstools (Budget, Verhuizing, Buurt, Taalcoach)"},{ok:true,text:"Alle kaartcategorieën (eten, cultuur, hotels & meer)"},{ok:true,text:"Wekelijkse nieuwsbrief"},{ok:false,text:"Premium tools, gidsen & sjablonen"}],features_premium:[{ok:true,text:"Alles uit Basic",gold:true},{ok:true,text:"3 pro-tools: Documentgenerator, Vastgoed-ROI, Deadlinetracker",gold:true},{ok:true,text:"Premium juridische & belastinggidsen",gold:true},{ok:true,text:"Downloadbare PDF-sjablonen",gold:true},{ok:true,text:"Geverifieerde servicegids",gold:true},{ok:true,text:"Prioriteit AI — diepere antwoorden",gold:true},{ok:true,text:"Geverifieerd ledenbadge",gold:true},{ok:true,text:"Vroege toegang tot nieuwe functies",gold:true}]},ru:{monthly:"Ежемесячно",yearly:"Ежегодно",save:"Скидка 33%",mo:"/месяц",yr:"/год",getfree:"Начать бесплатно",getbasic:"Выбрать Basic",getpremium:"Выбрать Premium",popular:"Самый популярный",billed:"оплата ежегодно",permonth:"/месяц",features_free:[{ok:true,text:"Базовые статьи (юридические, жильё, налоги)"},{ok:true,text:"5 вопросов к ИИ в день"},{ok:true,text:"Быстрые факты и экстренная информация"},{ok:true,text:"8 языков"},{ok:false,text:"Сообщество — публикации, лайки, ответы"},{ok:false,text:"Все инструменты и калькуляторы"},{ok:false,text:"Премиум-руководства и шаблоны"}],features_basic:[{ok:true,text:"Всё из бесплатного плана"},{ok:true,text:"Полный доступ к сообществу"},{ok:true,text:"Безлимитный чат с ИИ"},{ok:true,text:"4 инструмента планирования (Бюджет, Переезд, Район, Языковой коуч)"},{ok:true,text:"Все категории карты (рестораны, культура, отели и др.)"},{ok:true,text:"Еженедельная рассылка"},{ok:false,text:"Премиум-инструменты, руководства и шаблоны"}],features_premium:[{ok:true,text:"Всё из Basic",gold:true},{ok:true,text:"3 про-инструмента: Генератор документов, ROI недвижимости, Трекер дедлайнов",gold:true},{ok:true,text:"Премиум юридические и налоговые руководства",gold:true},{ok:true,text:"Загружаемые PDF-шаблоны",gold:true},{ok:true,text:"Каталог проверенных сервисов",gold:true},{ok:true,text:"Приоритетный ИИ — углублённые ответы",gold:true},{ok:true,text:"Значок верифицированного участника",gold:true},{ok:true,text:"Ранний доступ к новым функциям",gold:true}]},uk:{monthly:"Щомісячно",yearly:"Щорічно",save:"Знижка 33%",mo:"/місяць",yr:"/рік",getfree:"Почати безкоштовно",getbasic:"Вибрати Basic",getpremium:"Вибрати Premium",popular:"Найпопулярніший",billed:"оплата щорічно",permonth:"/місяць",features_free:[{ok:true,text:"Базові статті (юридичні, житло, податки)"},{ok:true,text:"5 запитань до ШІ на день"},{ok:true,text:"Швидкі факти та екстрена інформація"},{ok:true,text:"8 мов"},{ok:false,text:"Спільнота — публікації, лайки, відповіді"},{ok:false,text:"Всі інструменти та калькулятори"},{ok:false,text:"Преміум-посібники та шаблони"}],features_basic:[{ok:true,text:"Все з безкоштовного плану"},{ok:true,text:"Повний доступ до спільноти"},{ok:true,text:"Безлімітний чат зі ШІ"},{ok:true,text:"4 інструменти планування (Бюджет, Переїзд, Район, Мовний коуч)"},{ok:true,text:"Всі категорії карти (ресторани, культура, готелі та ін.)"},{ok:true,text:"Щотижнева розсилка"},{ok:false,text:"Преміум-інструменти, посібники та шаблони"}],features_premium:[{ok:true,text:"Все з Basic",gold:true},{ok:true,text:"3 про-інструменти: Генератор документів, ROI нерухомості, Трекер дедлайнів",gold:true},{ok:true,text:"Преміум юридичні та податкові посібники",gold:true},{ok:true,text:"Завантажувані PDF-шаблони",gold:true},{ok:true,text:"Каталог перевірених сервісів",gold:true},{ok:true,text:"Пріоритетний ШІ — поглиблені відповіді",gold:true},{ok:true,text:"Значок верифікованого учасника",gold:true},{ok:true,text:"Ранній доступ до нових функцій",gold:true}]},tr:{monthly:"Aylık",yearly:"Yıllık",save:"33% tasarruf",mo:"/ay",yr:"/yıl",getfree:"Ücretsiz başla",getbasic:"Basic seç",getpremium:"Premium seç",popular:"En popüler",billed:"yıllık faturalandırılır",permonth:"/ay",features_free:[{ok:true,text:"Temel makaleler (hukuki, konut, vergi)"},{ok:true,text:"Günde 5 yapay zeka sohbet sorusu"},{ok:true,text:"Hızlı bilgiler ve acil durum bilgileri"},{ok:true,text:"8 dil"},{ok:false,text:"Topluluk — gönderi, beğeni, yanıt"},{ok:false,text:"Tüm araçlar ve hesaplayıcılar"},{ok:false,text:"Premium rehberler ve şablonlar"}],features_basic:[{ok:true,text:"Ücretsiz plandaki her şey"},{ok:true,text:"Tam topluluk erişimi"},{ok:true,text:"Sınırsız yapay zeka sohbeti"},{ok:true,text:"4 planlama aracı (Bütçe, Taşınma, Mahalle, Dil Koçu)"},{ok:true,text:"Tüm harita kategorileri (yemek, kültür, oteller ve daha fazlası)"},{ok:true,text:"Haftalık bülten"},{ok:false,text:"Premium araçlar, rehberler ve şablonlar"}],features_premium:[{ok:true,text:"Basic plandaki her şey",gold:true},{ok:true,text:"3 pro araç: Belge Oluşturucu, Mülk ROI, Süre Takibi",gold:true},{ok:true,text:"Premium hukuki ve vergi rehberleri",gold:true},{ok:true,text:"İndirilebilir PDF şablonları",gold:true},{ok:true,text:"Doğrulanmış hizmetler dizini",gold:true},{ok:true,text:"Öncelikli yapay zeka — daha derin yanıtlar",gold:true},{ok:true,text:"Doğrulanmış üye rozeti",gold:true},{ok:true,text:"Yeni özelliklere erken erişim",gold:true}]},bg:{monthly:"Месечно",yearly:"Годишно",save:"33% отстъпка",mo:"/месец",yr:"/година",getfree:"Започни безплатно",getbasic:"Избери Basic",getpremium:"Избери Premium",popular:"Най-популярен",billed:"таксувано годишно",permonth:"/месец",features_free:[{ok:true,text:"Основни статии (правни, жилище, данъци)"},{ok:true,text:"5 въпроса към ИИ на ден"},{ok:true,text:"Бързи факти и спешна информация"},{ok:true,text:"8 езика"},{ok:false,text:"Общност — публикации, харесвания, отговори"},{ok:false,text:"Всички инструменти и калкулатори"},{ok:false,text:"Премиум наръчници и шаблони"}],features_basic:[{ok:true,text:"Всичко от безплатния план"},{ok:true,text:"Пълен достъп до общността"},{ok:true,text:"Неограничен чат с ИИ"},{ok:true,text:"4 инструмента за планиране (Бюджет, Преместване, Квартал, Езиков коуч)"},{ok:true,text:"Всички категории на картата (ресторанти, култура, хотели и др.)"},{ok:true,text:"Седмичен бюлетин"},{ok:false,text:"Премиум инструменти, наръчници и шаблони"}],features_premium:[{ok:true,text:"Всичко от Basic",gold:true},{ok:true,text:"3 про инструмента: Генератор на документи, ROI на имоти, Проследяване на срокове",gold:true},{ok:true,text:"Премиум правни и данъчни наръчници",gold:true},{ok:true,text:"Изтегляеми PDF шаблони",gold:true},{ok:true,text:"Каталог с проверени услуги",gold:true},{ok:true,text:"Приоритетен ИИ — задълбочени отговори",gold:true},{ok:true,text:"Значка на верифициран член",gold:true},{ok:true,text:"Ранен достъп до нови функции",gold:true}]}}
  const L=labels[lang]||labels.en

  const tiers=[
    {
      id:"free",color:C.surface,border:C.border,nameColor:C.text,subColor:C.muted,btnBg:C.page,btnColor:C.text,btnBorder:C.border,
      features:(L.features_free||[
        {ok:true,text:"Basic articles (legal, housing, tax)"},
        {ok:true,text:"5 AI chat questions per day"},
        {ok:true,text:"Quick facts & emergency info"},
        {ok:true,text:"8 languages"},
        {ok:false,text:"Community — post, like, reply"},
        {ok:false,text:"All tools & calculators"},
        {ok:false,text:"Premium guides & templates"},
      ])
    },
    {
      id:"basic",popular:true,color:C.surface,border:C.primary,nameColor:C.text,subColor:C.muted,btnBg:C.primary,btnColor:"#fff",btnBorder:C.primary,
      features:(L.features_basic||[
        {ok:true,text:"Everything in Free"},
        {ok:true,text:"Full community access"},
        {ok:true,text:"Unlimited AI chat"},
        {ok:true,text:"4 planning tools (Budget, Relocation, Neighbourhood Match, Language Coach)"},
        {ok:true,text:"All map categories (dining, culture, hotels & more)"},
        {ok:true,text:"Weekly newsletter"},
        {ok:false,text:"Premium tools, guides & templates"},
      ])
    },
    {
      id:"premium",color:C.primary,border:C.primaryDark,nameColor:"#fff",subColor:"rgba(255,255,255,0.6)",btnBg:"#f0c060",btnColor:"#1a3a20",btnBorder:"#f0c060",
      features:(L.features_premium||[
        {ok:true,text:"Everything in Basic",gold:true},
        {ok:true,text:"3 pro tools: Document Generator, Property ROI, Deadline Tracker",gold:true},
        {ok:true,text:"Premium legal & tax guides",gold:true},
        {ok:true,text:"Downloadable PDF templates",gold:true},
        {ok:true,text:"Vetted services directory",gold:true},
        {ok:true,text:"Priority AI — deeper answers",gold:true},
        {ok:true,text:"Verified member badge",gold:true},
        {ok:true,text:"Early access to new features",gold:true},
      ])
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
            // Always show the per-month price so users can compare like-for-like.
            // Yearly: show monthly equivalent (e.g. €2.66/month), then total below.
            const price=billing==="monthly"?plan.monthly:plan.yearly
            const period=L.mo  // always /month
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

// ── Account / Profile Page ───────────────────────────────────────
const PROFILE_CITIES=["Sofia","Plovdiv","Varna","Burgas","Bansko","Ruse","Stara Zagora","Sunny Beach","Nessebar","Other"]
const PROFILE_LANGS=["English","Bulgarian","Russian","German","French","Spanish","Dutch","Turkish","Ukrainian","Italian","Polish","Romanian"]

function AccountPage({user,setUser,setView}){
  const [name,setName]=useState("")
  const [bio,setBio]=useState("")
  const [origin,setOrigin]=useState("")
  const [city,setCity]=useState("")
  const [lookingFor,setLookingFor]=useState("")
  const [interests,setInterests]=useState([])
  const [languages,setLanguages]=useState([])
  const [avatarUrl,setAvatarUrl]=useState("")
  const [inConnect,setInConnect]=useState(false)
  const [loading,setLoading]=useState(true)
  const [saving,setSaving]=useState(false)
  const [joining,setJoining]=useState(false)
  const [uploading,setUploading]=useState(false)
  const [msg,setMsg]=useState("")
  const [err,setErr]=useState("")
  const fileRef=useRef(null)
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const onResize=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",onResize)
    return()=>window.removeEventListener("resize",onResize)
  },[])

  // Load the current profile
  useEffect(()=>{
    if(!user){setLoading(false);return}
    let cancelled=false
    ;(async()=>{
      const {data}=await sbGetProfile(user.id)
      if(cancelled)return
      if(data){
        setName(data.name||user.name||"")
        setBio(data.bio||"")
        setOrigin(data.origin||"")
        setCity(data.city||"")
        setLookingFor(data.looking_for||"")
        setInterests(data.interests||[])
        setLanguages(data.languages||[])
        setAvatarUrl(data.avatar_url||"")
        setInConnect(!!data.in_connect)
      }
      setLoading(false)
    })()
    return()=>{cancelled=true}
  },[user])

  const toggle=(list,setList,item)=>
    setList(list.includes(item)?list.filter(i=>i!==item):[...list,item])

  const save=async()=>{
    setErr("");setMsg("")
    if(!name.trim()){setErr("Please enter a name.");return}
    setSaving(true)
    const {error}=await sbUpdateProfile(user.id,{
      name:name.trim(),
      bio:bio.trim()||null,
      origin:origin||null,
      city:city||null,
      looking_for:lookingFor||null,
      interests:interests.length?interests:null,
      languages:languages.length?languages:null,
    })
    setSaving(false)
    if(error){
      console.error("Profile save error:",error)
      setErr("Could not save: "+(error.message||"unknown error"))
      return
    }
    setUser(u=>u?{...u,name:name.trim()}:u)
    setMsg("Profile saved.")
    setTimeout(()=>setMsg(""),3000)
  }

  // Join or leave Meet & Connect (the opt-in that makes a profile visible to others).
  const toggleConnect=async()=>{
    setErr("");setMsg("")
    // Require a bit of profile before joining, so listings aren't empty.
    if(!inConnect&&!bio.trim()){
      setErr("Add a short bio first, then you can join Meet & Connect.");return
    }
    setJoining(true)
    const next=!inConnect
    const {error}=await sbUpdateProfile(user.id,{in_connect:next})
    setJoining(false)
    if(error){setErr("Could not update. Please try again.");return}
    setInConnect(next)
    setMsg(next?"You're now visible in Meet & Connect.":"You've left Meet & Connect — your profile is hidden there.")
    setTimeout(()=>setMsg(""),3500)
  }

  const pickFile=()=>fileRef.current&&fileRef.current.click()

  const onFile=async(e)=>{
    const file=e.target.files&&e.target.files[0]
    if(!file)return
    setErr("");setMsg("")
    if(file.size>3*1024*1024){setErr("Image must be under 3 MB.");return}
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){
      setErr("Please use a JPG, PNG or WebP image.");return
    }
    setUploading(true)
    const {url,error}=await sbUploadAvatar(user.id,file)
    setUploading(false)
    if(error){setErr("Upload failed. Please try again.");return}
    setAvatarUrl(url)
    setUser(u=>u?{...u,avatarUrl:url}:u)
    setMsg("Photo updated.")
    setTimeout(()=>setMsg(""),3000)
  }

  if(!user){
    return(
      <div style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px",background:C.page}}>
        <div style={{textAlign:"center",maxWidth:380}}>
          <h2 className="serif" style={{fontSize:22,color:C.text,margin:"0 0 8px"}}>Sign in to view your account</h2>
          <p style={{fontSize:14,color:C.muted,margin:"0 0 18px"}}>Create a profile so other members can get to know you.</p>
          <button onClick={()=>setView("login")} style={{background:C.primary,border:"none",color:"#fff",padding:"11px 22px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>Sign in →</button>
        </div>
      </div>
    )
  }

  const inputStyle={width:"100%",border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 12px",fontSize:14,outline:"none",color:C.text,background:C.page,boxSizing:"border-box"}

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:isMobile?"26px 16px 42px":"32px 20px 48px"}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(24px,4vw,34px)",fontWeight:400,margin:"0 0 6px"}}>My account</h1>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:isMobile?13:15,margin:0,fontWeight:300}}>Your profile is visible to other signed-in members</p>
        </div>
      </div>

      <div style={{maxWidth:760,margin:isMobile?"-24px auto 32px":"-24px auto 48px",padding:isMobile?"0 12px":"0 20px"}}>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:isMobile?"18px 16px":"24px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>

          {loading?(
            <div style={{textAlign:"center",padding:"40px 0",color:C.muted,fontSize:14}}>Loading your profile…</div>
          ):(
            <>
              {/* Avatar + name */}
              <div style={{display:"flex",alignItems:"center",gap:16,paddingBottom:20,marginBottom:20,borderBottom:`1px solid ${C.border}`}}>
                <div style={{position:"relative",flexShrink:0}}>
                  {avatarUrl?(
                    <img src={avatarUrl} alt="" style={{width:76,height:76,borderRadius:"50%",objectFit:"cover",border:`2px solid ${C.border}`}}/>
                  ):(
                    <Av initials={user.av||"?"} size={76}/>
                  )}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:18,fontWeight:700,color:C.text,marginBottom:2}}>{name||user.name}</div>
                  <div style={{fontSize:13,color:C.muted,marginBottom:8,overflow:"hidden",textOverflow:"ellipsis"}}>{user.email}</div>
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} style={{display:"none"}}/>
                  <button onClick={pickFile} disabled={uploading}
                    style={{background:"transparent",border:`1.5px solid ${C.primary}`,color:C.primary,padding:"6px 14px",borderRadius:8,cursor:uploading?"default":"pointer",fontSize:12,fontWeight:600}}>
                    {uploading?"Uploading…":(avatarUrl?"Change photo":"Add photo")}
                  </button>
                </div>
              </div>

              {/* Name */}
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:5}}>NAME OR NICKNAME</label>
                <input value={name} onChange={e=>setName(e.target.value.slice(0,40))}
                  placeholder="How you'd like to appear"
                  style={inputStyle}/>
                <div style={{fontSize:11,color:C.muted,marginTop:3}}>This is shown across BGexpats, including in Meet & Connect if you join.</div>
              </div>

              {/* I am — Bulgarian or Expat */}
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:6}}>I AM</label>
                <div style={{display:"flex",gap:8}}>
                  {[["expat","🌍 Expat"],["bulgarian","🇧🇬 Bulgarian"]].map(([v,l])=>(
                    <button key={v} onClick={()=>setOrigin(v)}
                      style={{flex:1,padding:"10px",borderRadius:10,border:`1.5px solid ${origin===v?C.primary:C.border}`,background:origin===v?C.primaryLight:"transparent",color:origin===v?C.primary:C.muted,cursor:"pointer",fontSize:14,fontWeight:origin===v?700:400}}>{l}</button>
                  ))}
                </div>
                <div style={{fontSize:11,color:C.muted,marginTop:3}}>Helps others in Meet & Connect find locals or fellow expats.</div>
              </div>

              {/* About you */}
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:5}}>ABOUT YOU</label>
                <textarea value={bio} onChange={e=>setBio(e.target.value.slice(0,300))}
                  placeholder="Tell other members a bit about yourself — what brought you to Bulgaria, what you enjoy…"
                  style={{...inputStyle,height:90,resize:"none",fontFamily:"inherit",lineHeight:1.6}}/>
                <div style={{fontSize:11,color:C.muted,textAlign:"right",marginTop:2}}>{bio.length}/300</div>
              </div>

              {/* City + Looking for */}
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12,marginBottom:16}}>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:5}}>CITY</label>
                  <select value={city} onChange={e=>setCity(e.target.value)} style={inputStyle}>
                    <option value="">Select a city…</option>
                    {PROFILE_CITIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:5}}>LOOKING FOR</label>
                  <select value={lookingFor} onChange={e=>setLookingFor(e.target.value)} style={inputStyle}>
                    <option value="">Select…</option>
                    <option value="friends">Friends</option>
                    <option value="networking">Networking</option>
                    <option value="language">Language exchange</option>
                    <option value="activities">Activity partners</option>
                    <option value="relationship">Relationship</option>
                  </select>
                </div>
              </div>

              {/* Languages */}
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:6}}>LANGUAGES I SPEAK</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {PROFILE_LANGS.map(l=>{
                    const sel=languages.includes(l)
                    return<button key={l} onClick={()=>toggle(languages,setLanguages,l)}
                      style={{padding:"5px 12px",borderRadius:14,border:`1.5px solid ${sel?C.primary:C.border}`,background:sel?C.primaryLight:"transparent",color:sel?C.primary:C.muted,cursor:"pointer",fontSize:12,fontWeight:sel?600:400}}>{l}</button>
                  })}
                </div>
              </div>

              {/* Interests */}
              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,fontWeight:600,color:C.muted,display:"block",marginBottom:6}}>INTERESTS</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {INTEREST_TAGS.map(t=>{
                    const sel=interests.includes(t)
                    return<button key={t} onClick={()=>toggle(interests,setInterests,t)}
                      style={{padding:"5px 12px",borderRadius:14,border:`1.5px solid ${sel?"#9333ea":C.border}`,background:sel?"#f3e8ff":"transparent",color:sel?"#6b21a8":C.muted,cursor:"pointer",fontSize:12,fontWeight:sel?600:400}}>{t}</button>
                  })}
                </div>
              </div>

              {err&&<div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#c00",marginBottom:14}}>⚠️ {err}</div>}
              {msg&&<div style={{background:"#f0fff4",border:"1px solid #9de",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#060",marginBottom:14}}>✅ {msg}</div>}

              <button onClick={save} disabled={saving}
                style={{width:"100%",background:saving?"#9bb8a8":C.primary,border:"none",color:"#fff",padding:"12px",borderRadius:10,cursor:saving?"default":"pointer",fontSize:15,fontWeight:700}}>
                {saving?"Saving…":"Save profile"}
              </button>

              {/* Meet & Connect opt-in — separate from having a BGexpats account */}
              <div style={{marginTop:22,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,background:inConnect?"#f0fff4":"#f9f6ff",border:`1px solid ${inConnect?"#bce8cd":"#e9d5ff"}`,borderRadius:12,padding:"16px"}}>
                  <div style={{flexShrink:0,width:38,height:38,borderRadius:10,background:inConnect?"#dcfce7":"#f3e8ff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Icon2c d={CONNECT_ICON_D} accent={inConnect?"#16a34a":"#9333ea"} size={20}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:3}}>Meet &amp; Connect</div>
                    <p style={{fontSize:13,color:C.muted,margin:"0 0 12px",lineHeight:1.6}}>
                      {inConnect
                        ? "Your profile is visible to other members in Meet & Connect. You can leave anytime."
                        : "Optional — join to appear in Meet & Connect so other members can find you. Your BGexpats account works with or without this."}
                    </p>
                    <button onClick={toggleConnect} disabled={joining}
                      style={{background:inConnect?"transparent":"#9333ea",border:inConnect?`1.5px solid ${C.border}`:"none",color:inConnect?C.muted:"#fff",padding:"9px 18px",borderRadius:9,cursor:joining?"default":"pointer",fontSize:14,fontWeight:700}}>
                      {joining?"…":(inConnect?"Leave Meet & Connect":"Join Meet & Connect →")}
                    </button>
                  </div>
                </div>
              </div>

              <p style={{fontSize:11,color:C.muted,textAlign:"center",margin:"14px 0 0",lineHeight:1.5}}>
                Only signed-in members can see your profile. Never share your home address, phone number or financial details.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Travel Guide Pages ───────────────────────────────────────────
function TravelRegionPage({regionId,setView}){
  const region=TRAVEL_GUIDE[regionId]
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const r=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r)
  },[])
  if(!region)return<div style={{padding:40,textAlign:"center",color:C.muted}}>Region not found.</div>

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Hero */}
      <div style={{position:"relative",overflow:"hidden",minHeight:isMobile?180:230,display:"flex",alignItems:"flex-end",padding:isMobile?"20px 16px":"28px 20px"}}>
        {region.hero?<img src={region.hero} alt="" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${C.primary},#2a7a52)`}}/>}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.75),rgba(0,0,0,0.15))"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:1000,margin:"0 auto",width:"100%"}}>
          <button onClick={()=>setView("tourism")} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.35)",color:"#fff",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,marginBottom:12}}>← Back to Tourism</button>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(24px,4.5vw,38px)",fontWeight:400,margin:"0 0 4px",textShadow:"0 2px 12px rgba(0,0,0,0.4)"}}>{region.name}</h1>
          <p style={{color:"rgba(255,255,255,0.9)",fontSize:isMobile?13:15,margin:0,fontWeight:300,textShadow:"0 1px 8px rgba(0,0,0,0.4)"}}>{region.tagline}</p>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"0 auto",padding:isMobile?"20px 14px 40px":"28px 20px 48px"}}>
        {region.intro&&<p style={{fontSize:15,color:C.text,lineHeight:1.7,margin:"0 0 22px",maxWidth:700}}>{region.intro}</p>}
        <h2 className="serif" style={{fontSize:18,fontWeight:600,color:C.text,margin:"0 0 14px"}}>Destinations</h2>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
          {region.cities.map(city=>(
            <button key={city.id} onClick={()=>setView(`travel-${regionId}-${city.id}`)}
              style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",textAlign:"left",padding:0,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{height:130,background:C.primaryLight,position:"relative",overflow:"hidden"}}>
                {city.hero?<img src={city.hero} alt={city.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:C.primary,fontSize:32,fontWeight:700,opacity:0.3}}>{city.name.slice(0,2)}</div>}
              </div>
              <div style={{padding:"14px 16px"}}>
                <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:2}}>{city.name}</div>
                <div style={{fontSize:13,color:C.muted,marginBottom:8}}>{city.tagline}</div>
                <span style={{fontSize:13,color:C.primary,fontWeight:600}}>Explore {city.name} →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TravelCityPage({regionId,cityId,setView}){
  const region=TRAVEL_GUIDE[regionId]
  const city=region&&region.cities.find(c=>c.id===cityId)
  const [filter,setFilter]=useState("all")
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const r=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r)
  },[])
  if(!city)return<div style={{padding:40,textAlign:"center",color:C.muted}}>Place not found.</div>

  const typesPresent=[...new Set(city.places.map(p=>p.type))]
  const shown=filter==="all"?city.places:city.places.filter(p=>p.type===filter)

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Hero */}
      <div style={{position:"relative",overflow:"hidden",minHeight:isMobile?190:250,display:"flex",alignItems:"flex-end",padding:isMobile?"20px 16px":"30px 20px"}}>
        {city.hero?<img src={city.hero} alt="" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${C.primary},#2a7a52)`}}/>}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.78),rgba(0,0,0,0.15))"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:1000,margin:"0 auto",width:"100%"}}>
          <button onClick={()=>setView(`travel-${regionId}`)} style={{background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.35)",color:"#fff",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,marginBottom:12}}>← Back to {region.name}</button>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(26px,5vw,42px)",fontWeight:400,margin:"0 0 4px",textShadow:"0 2px 12px rgba(0,0,0,0.4)"}}>{city.name}</h1>
          <p style={{color:"rgba(255,255,255,0.9)",fontSize:isMobile?13:15,margin:0,fontWeight:300,textShadow:"0 1px 8px rgba(0,0,0,0.4)"}}>{city.tagline}</p>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"0 auto",padding:isMobile?"20px 14px 40px":"28px 20px 48px"}}>
        {city.intro&&<p style={{fontSize:15,color:C.text,lineHeight:1.7,margin:"0 0 20px",maxWidth:700}}>{city.intro}</p>}

        {/* Type filter */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:18,scrollbarWidth:"none"}}>
          <button onClick={()=>setFilter("all")} style={{padding:"6px 14px",borderRadius:16,border:`1.5px solid ${filter==="all"?C.primary:C.border}`,background:filter==="all"?C.primaryLight:"transparent",color:filter==="all"?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:filter==="all"?700:400,flexShrink:0}}>All</button>
          {typesPresent.map(t=>{
            const pt=PLACE_TYPES[t]||{label:t,color:C.muted}
            return<button key={t} onClick={()=>setFilter(t)} style={{padding:"6px 14px",borderRadius:16,border:`1.5px solid ${filter===t?pt.color:C.border}`,background:filter===t?pt.bg:"transparent",color:filter===t?pt.color:C.muted,cursor:"pointer",fontSize:13,fontWeight:filter===t?700:400,flexShrink:0}}>{pt.label}s</button>
          })}
        </div>

        {/* Places grid */}
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {shown.map((place,i)=>{
            const pt=PLACE_TYPES[place.type]||{label:place.type,color:C.muted,bg:C.page}
            return(
              <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                <div style={{height:150,background:C.primaryLight,position:"relative",overflow:"hidden"}}>
                  {place.img?<img src={place.img} alt={place.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:pt.color,fontSize:13,opacity:0.5}}>No photo yet</div>}
                  <span style={{position:"absolute",top:10,left:10,background:pt.bg,color:pt.color,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:12}}>{pt.label}</span>
                </div>
                <div style={{padding:"14px 16px"}}>
                  <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:3}}>{place.name}</div>
                  {place.area&&<div style={{fontSize:12,color:C.muted,marginBottom:6,display:"flex",alignItems:"center",gap:4}}>📍 {place.area}</div>}
                  <p style={{fontSize:13,color:C.text,lineHeight:1.6,margin:0}}>{place.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// TRUSTED REAL ESTATE AGENTS DIRECTORY
// To add an agency: copy one of the objects below and fill in the fields.
// logo: a URL to their logo image, or "" to show initials instead.
// cities: which city filter buttons this agency appears under.
// ═══════════════════════════════════════════════════════════════════
const AGENTS = [
  {
    id: 1,
    name: "Bulgarian Properties",
    logo: "",
    initials: "BP",
    color: "#1e5e3f",
    cities: ["Sofia","Plovdiv","Varna","Burgas","Bansko","All Bulgaria"],
    desc: "One of Bulgaria's largest and most established agencies. Offices across the country. English-speaking staff. Specialists in both rentals and sales for expats.",
    phone: "+359 2 911 50",
    email: "info@bulgarianproperties.com",
    website: "https://www.bulgarianproperties.com",
    services: ["Rentals","Sales","New builds","Property management"],
  },
  {
    id: 2,
    name: "Address Real Estate",
    logo: "",
    initials: "AR",
    color: "#1d4ed8",
    cities: ["Sofia","Plovdiv","Varna"],
    desc: "Premium quality-verified listings. Strong focus on Sofia's expat-popular neighbourhoods — Lozenets, Iztok, Oborishte. Known for vetted, accurate listings.",
    phone: "",
    email: "",
    website: "https://www.address.bg",
    services: ["Rentals","Sales"],
  },
  {
    id: 3,
    name: "INDRA Real Estate",
    logo: "data:image/jpeg;base64,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",
    initials: "IN",
    color: "#1e4a4a",
                cities: ["Burgas","St Vlas","Sunny Beach","Ravda","Sozopol","Pomorie"],
    desc: "INDRA is a real estate agency built on the principles of trust, transparency, and professional responsibility. We operate with a clear focus on security, well-structured processes, and creating long-term value for every client.\n\nWe believe that a successful real estate transaction should never be the result of pressure or improvisation, but of a carefully planned and professionally managed process. That is why we approach every property and every client with personalized attention, expert knowledge, and clear communication at every stage.\n\nOur goal is to help our clients make informed decisions with confidence and peace of mind, knowing that their interests are fully protected. This commitment to excellence is what sets INDRA apart and makes us a trusted partner for buying, selling, renting, and leasing real estate.",
    phone: "+359 878 788 748",
    email: "indraimoti@abv.bg",
    website: "https://www.alo.bg/users/indrarealestates",
    services: ["Rentals","Sales","Leasing","Property management"],
    languages: ["English","Spanish","Russian"],
  },
  // ── ADD YOUR AGENCIES BELOW ──────────────────────────────────────
  // {
  //   id: 4,
  //   name: "Your Agency Name",
  //   logo: "https://yoursite.com/logo.png",  // or "" for initials
  //   initials: "YA",
  //   color: "#7c3aed",
  //   cities: ["Sofia"],   // must match city filter options exactly
  //   desc: "A short description of the agency and what makes them trustworthy.",
  //   phone: "+359 ...",
  //   email: "info@youragency.com",
  //   website: "https://youragency.com",
  //   services: ["Rentals","Sales"],
  // },
]

const AGENT_CITIES = ["All Bulgaria","Sofia","Plovdiv","Varna","Burgas","Bansko","Other"]

function AgentsPage({setView}){
  const [city,setCity]=useState("All Bulgaria")
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const r=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r)
  },[])

  const visible=city==="All Bulgaria"
    ? AGENTS
    : AGENTS.filter(a=>a.cities.includes(city)||a.cities.includes("All Bulgaria"))

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${C.primary},#2a7a52)`,padding:isMobile?"28px 16px 44px":"36px 20px 52px"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <button onClick={()=>setView("housing")} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"rgba(255,255,255,0.9)",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,marginBottom:16}}>← Housing &amp; Renting</button>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(24px,4.5vw,38px)",fontWeight:400,margin:"0 0 8px"}}>Trusted Real Estate Agents</h1>
          <p style={{color:"rgba(255,255,255,0.8)",fontSize:isMobile?13:15,margin:"0 0 6px",fontWeight:300}}>Vetted agencies recommended by the BGexpats community</p>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:12,margin:0}}>Always verify credentials independently before signing contracts or transferring money.</p>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:isMobile?"-24px auto 40px":"-28px auto 52px",padding:isMobile?"0 14px":"0 20px"}}>
        {/* City filter */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",marginBottom:18,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:11,fontWeight:600,color:C.muted,letterSpacing:"0.05em",marginBottom:8}}>FILTER BY CITY</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {AGENT_CITIES.map(c=>(
              <button key={c} onClick={()=>setCity(c)}
                style={{padding:"6px 14px",borderRadius:16,border:`1.5px solid ${city===c?C.primary:C.border}`,background:city===c?C.primaryLight:"transparent",color:city===c?C.primary:C.muted,cursor:"pointer",fontSize:13,fontWeight:city===c?700:400}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Agent cards */}
        {visible.length===0?(
          <div style={{background:C.surface,border:`1px dashed ${C.border}`,borderRadius:14,padding:"32px 20px",textAlign:"center"}}>
            <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:6}}>No agencies listed for {city} yet</div>
            <p style={{fontSize:13,color:C.muted,margin:0}}>Know a trustworthy agent in this area? Contact us to recommend them.</p>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(420px,1fr))",gap:14}}>
            {visible.map(a=>(
              <div key={a.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                {/* Card header */}
                <div style={{background:`linear-gradient(135deg,${a.color}18,${a.color}08)`,borderBottom:`1px solid ${C.border}`,padding:"16px 18px",display:"flex",alignItems:"center",gap:14}}>
                  {a.logo?(
                    <img src={a.logo} alt={a.name} style={{width:52,height:52,borderRadius:10,objectFit:"contain",background:"#fff",padding:4,border:`1px solid ${C.border}`}}/>
                  ):(
                    <div style={{width:52,height:52,borderRadius:10,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",flexShrink:0}}>
                      {a.initials}
                    </div>
                  )}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:17,fontWeight:700,color:C.text,marginBottom:3}}>{a.name}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {a.cities.slice(0,3).map(c=>(
                        <span key={c} style={{fontSize:11,background:`${a.color}18`,color:a.color,padding:"2px 8px",borderRadius:10,fontWeight:600}}>{c}</span>
                      ))}
                      {a.cities.length>3&&<span style={{fontSize:11,color:C.muted}}>+{a.cities.length-3} more</span>}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{padding:"14px 18px"}}>
                  {a.desc.split("\n\n").map((para,pi)=>(
                    <p key={pi} style={{fontSize:13,color:C.text,lineHeight:1.6,margin:"0 0 10px"}}>{para}</p>
                  ))}

                  {/* Services */}
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:a.languages?8:14}}>
                    {a.services.map(s=>(
                      <span key={s} style={{fontSize:11,background:C.page,border:`1px solid ${C.border}`,borderRadius:8,padding:"3px 8px",color:C.muted}}>{s}</span>
                    ))}
                  </div>

                  {/* Languages */}
                  {a.languages&&(
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
                      <span style={{fontSize:11,color:C.muted,marginRight:2}}>🗣️</span>
                      {a.languages.map(l=>(
                        <span key={l} style={{fontSize:11,background:"#f0f6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"3px 8px",color:"#1d4ed8",fontWeight:600}}>{l}</span>
                      ))}
                    </div>
                  )}

                  {/* Contact */}
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {a.website&&(
                      <a href={a.website} target="_blank" rel="noopener noreferrer"
                        style={{flex:1,minWidth:120,background:a.color,color:"#fff",borderRadius:9,padding:"9px 14px",fontSize:13,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                        🌐 Visit website
                      </a>
                    )}
                    {a.phone&&(
                      <a href={`tel:${a.phone}`}
                        style={{flex:1,minWidth:120,background:C.page,border:`1.5px solid ${C.border}`,color:C.text,borderRadius:9,padding:"9px 14px",fontSize:13,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                        📞 {a.phone}
                      </a>
                    )}
                    {a.email&&(
                      <a href={`mailto:${a.email}`}
                        style={{flex:1,minWidth:120,background:C.page,border:`1.5px solid ${C.border}`,color:C.text,borderRadius:9,padding:"9px 14px",fontSize:13,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                        ✉️ {a.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA for agencies to get listed */}
        <div style={{marginTop:24,background:C.primaryLight,border:`1px solid #bcd4c6`,borderRadius:14,padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:3}}>Are you a real estate agent?</div>
            <div style={{fontSize:13,color:C.muted}}>Get listed here and reach expats looking for property in Bulgaria.</div>
          </div>
          <a href="mailto:partners@bgexpats.com?subject=Agency listing request — BGexpats&body=Hi BGexpats team,%0A%0AAgency name:%0ACity/cities covered:%0AWebsite:%0APhone:%0AEmail:%0AShort description:%0A%0AThanks!"
            style={{background:C.primary,color:"#fff",padding:"10px 20px",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none",flexShrink:0}}>
            Request listing →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [view,setViewState]=useState(()=>{
    // On first load, honour a hash like #map so refresh/shared links work.
    if(typeof window!=="undefined"&&window.location.hash){
      const h=window.location.hash.replace(/^#/,"")
      if(h)return h
    }
    return "home"
  })
  // Wrapped navigation: updates the view AND pushes a browser history entry so
  // the browser Back/Forward buttons work between pages.
  const setView=(v)=>{
    setViewState(v)
    if(typeof window!=="undefined"){
      const target="#"+v
      if(window.location.hash!==target){
        window.history.pushState({view:v},"",target)
      }
    }
  }
  // React to browser Back/Forward: read the hash and update the view.
  useEffect(()=>{
    // Establish a baseline history entry on first load so the first Back press works.
    if(typeof window!=="undefined"){
      window.history.replaceState({view},"",window.location.hash||"#home")
    }
    const onPop=()=>{
      const h=(window.location.hash||"").replace(/^#/,"")
      setViewState(h||"home")
      window.scrollTo(0,0)
    }
    window.addEventListener("popstate",onPop)
    return()=>window.removeEventListener("popstate",onPop)
  },[])
  // Scroll to top whenever the page/view changes.
  useEffect(()=>{ if(typeof window!=="undefined") window.scrollTo(0,0) },[view])
  const [installPrompt,setInstallPrompt]=useState(null)
  const [showInstall,setShowInstall]=useState(false)
  const [showIosHelp,setShowIosHelp]=useState(false)
  // Detect iPhone/iPad (they can't use the native install prompt) and whether the
  // app is already installed (running standalone) so we don't show the button then.
  const isIos = typeof navigator!=="undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent)
  const isStandalone = typeof window!=="undefined" && (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone===true)

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
  // Fixed button tap: iPhone → show Add-to-Home-Screen steps; others → native prompt.
  const handleInstallClick=()=>{
    if(isIos){setShowIosHelp(true);return}
    if(installPrompt){installApp();return}
    // No prompt available yet (browser hasn't offered it) — guide the user.
    setShowIosHelp(true)
  }
  const [lang,setLang]=useState("en")
  const [cache,setCache]=useState({})
  const [user,setUser]=useState(null)
  // Restore the logged-in user on page load / refresh. Supabase keeps the session
  // in the browser, so returning visitors stay signed in.
  useEffect(()=>{
    let cancelled=false
    ;(async()=>{
      try{
        const u=await sbGetCurrentUser()
        if(!cancelled&&u)setUser(u)
      }catch(e){/* not signed in — fine */}
    })()
    return()=>{cancelled=true}
  },[])
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
    <div style={{fontFamily:"'Figtree',system-ui,-apple-system,sans-serif",background:C.page,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Figtree:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body,button,input,textarea,select{font-family:'Figtree',system-ui,sans-serif}
        h1,h2,h3,.serif{font-family:'Bricolage Grotesque','Figtree',sans-serif;letter-spacing:-0.02em}
        button:focus-visible{outline:2px solid ${C.accent};outline-offset:2px}
        @media (max-width: 768px){.bg-install-fab{display:flex !important}}
        /* Nav on small screens: keep the logo AND wordmark visible, drop only the
           user's first name so the avatar button always has room. */
        .nav-links::-webkit-scrollbar{display:none}
        @media (max-width: 560px){
          .bg-nav-username{display:none}
        }
        @media (max-width: 420px){
          .bg-nav-wordmark{font-size:14px}
        }
        @media (max-width: 360px){
          .bg-nav-wordmark{font-size:13px}
        }
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        /* ── Responsive utility classes ───────────────────────────── */
        /* Two-column grid that stacks on mobile */
        .rg-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        /* Three-column grid that stacks on mobile */
        .rg-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
        /* Pricing grid — 3 cols on desktop, stacks on mobile */
        .rg-pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        /* Gallery thumbnails row */
        .rg-thumbs{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
        .rg-thumbs::-webkit-scrollbar{display:none}
        /* Page padding that shrinks on mobile */
        .rp{padding:52px 20px}
        @media(max-width:768px){
          .rg-2{grid-template-columns:1fr}
          .rg-3{grid-template-columns:1fr}
          .rg-pricing{grid-template-columns:1fr}
          .rp{padding:28px 14px}
          /* Discover gallery: shorter on phones */
          .bg-gallery-main{height:220px !important}
          .bg-gallery-thumb{width:64px !important;height:44px !important}
          /* Cost calc compare grid stays 3-col but smaller text */
          .rg-3-keep{font-size:11px}
          /* Article padding on mobile */
          .bg-article-wrap{padding:20px 14px 40px !important}
          /* Chat bubbles full width on mobile */
          .bg-chat-bubble{max-width:95% !important}
        }
        @media(max-width:480px){
          .rg-pricing{grid-template-columns:1fr}
        }
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
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><img src={LOGO_ICON} alt="BGexpats" style={{height:22,width:22}}/></div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Install BGexpats</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)"}}>Add to home screen — works offline</div>
          </div>
          <button onClick={installApp} style={{background:"#f0c060",border:"none",color:"#1a3a20",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,flexShrink:0}}>Install</button>
          <button onClick={()=>setShowInstall(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:20,padding:"0 4px",flexShrink:0}}>×</button>
        </div>
      )}
      {/* Always-visible mobile install button (hidden once app is installed) */}
      {!isStandalone && !showInstall && (
        <button onClick={handleInstallClick} className="bg-install-fab" style={{position:"fixed",right:16,bottom:16,zIndex:9998,background:"#1e5e3f",color:"#fff",border:"none",borderRadius:30,padding:"12px 18px",display:"none",alignItems:"center",gap:8,cursor:"pointer",fontSize:14,fontWeight:700,boxShadow:"0 6px 20px rgba(0,0,0,0.28)"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
          Install App
        </button>
      )}
      {/* iPhone / fallback install instructions */}
      {showIosHelp && (
        <div onClick={()=>setShowIosHelp(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:10000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:"18px 18px 0 0",padding:"22px 20px 28px",maxWidth:440,width:"100%",boxShadow:"0 -8px 30px rgba(0,0,0,0.25)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:10,background:"#e6f2eb",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><img src={LOGO_ICON} alt="BGexpats" style={{height:22,width:22}}/></div>
              <div style={{fontSize:16,fontWeight:800,color:"#1e5e3f"}}>Install BGexpats</div>
              <button onClick={()=>setShowIosHelp(false)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:22,color:"#888",cursor:"pointer"}}>×</button>
            </div>
            {isIos ? (
              <div style={{fontSize:14,color:"#333",lineHeight:1.6}}>
                <p style={{margin:"0 0 12px"}}>Add BGexpats to your home screen so it works like an app — no App Store needed:</p>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <span style={{background:"#1e5e3f",color:"#fff",width:24,height:24,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>1</span>
                  <span>Tap the <b>Share</b> button <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e5e3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle"}}><path d="M12 3v13M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg> at the bottom of Safari</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <span style={{background:"#1e5e3f",color:"#fff",width:24,height:24,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>2</span>
                  <span>Scroll down and tap <b>Add to Home Screen</b></span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{background:"#1e5e3f",color:"#fff",width:24,height:24,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>3</span>
                  <span>Tap <b>Add</b> — done!</span>
                </div>
              </div>
            ) : (
              <div style={{fontSize:14,color:"#333",lineHeight:1.6}}>
                <p style={{margin:"0 0 12px"}}>To install BGexpats as an app:</p>
                <p style={{margin:"0 0 8px"}}>Open your browser menu (⋮) and choose <b>Install app</b> or <b>Add to Home screen</b>.</p>
                <p style={{margin:0,fontSize:13,color:"#666"}}>If you don't see the option, your browser may not support installing — try Chrome or Edge.</p>
              </div>
            )}
          </div>
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
      ):view==="account"?(
        <AccountPage user={user} setUser={setUser} setView={setView}/>
      ):view==="agents"?(
        <AgentsPage setView={setView}/>
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
      ):view.startsWith("travel-")?(
        (()=>{
          // travel-<region>  or  travel-<region>-<city>
          const parts=view.slice(7).split("-")
          // region ids may contain a hyphen (e.g. "black-sea"), so match against known regions
          const regionId=Object.keys(TRAVEL_GUIDE).find(r=>view.slice(7)===r||view.slice(7).startsWith(r+"-"))
          if(!regionId)return<div style={{padding:40,textAlign:"center",color:C.muted}}>Not found.</div>
          const rest=view.slice(7+regionId.length+1)
          return rest
            ? <TravelCityPage regionId={regionId} cityId={rest} setView={setView}/>
            : <TravelRegionPage regionId={regionId} setView={setView}/>
        })()
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
                <Icon2c d={(EXPENSE_ICON_MAP[c.k]||{}).d} accent={(EXPENSE_ICON_MAP[c.k]||{}).accent} size={15}/>
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
                <Icon2c d={(EXPENSE_ICON_MAP[c.k]||{}).d} accent={(EXPENSE_ICON_MAP[c.k]||{}).accent} size={15}/>
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

  // ── BLACK SEA ─────────────────────────────────────────────────
  {id:51,cat:"transport",name:"MySpot",icon:"🏖️",color:"#f97316",bg:"#fff7ed",desc:"Check live beach conditions along the entire Bulgarian Black Sea coast — water temperature, waves, wind, UV index. Reserve a sunbed and umbrella in advance at selected beaches.",tip:"Use MySpot before heading to the coast — it shows which beaches are calm or rough today, so you pick the right one for swimming vs sunbathing.",ios:"https://apps.apple.com/bg/app/myspot-book-your-dream-spot/id6453559634",android:"https://play.google.com/store/apps/details?id=bg.myspot",web:"https://myspot.bg/en/beaches",rating:4.5,free:true,cities:["varna","burgas"]},
]

// ── Apps Directory Page ───────────────────────────────────────────
const APP_CITIES=[
  {id:"all",     label:"All Bulgaria",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>},
  {id:"sofia",   label:"Sofia",         icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>},
  {id:"plovdiv", label:"Plovdiv",        icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 00-8 8c0 5.4 8 13 8 13s8-7.6 8-13a8 8 0 00-8-8z"/></svg>},
  {id:"varna",   label:"Varna",          icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 12c0 5.5 4.5 10 10 10S22 17.5 22 12M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10M8 12a8 8 0 008 0"/></svg>},
  {id:"burgas",  label:"Burgas",         icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-3.07-8.63A2 2 0 0110.11 8h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L14.09 16a16 16 0 006.29 3.56l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>},
  {id:"bansko",  label:"Bansko",         icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 20 12 4 21 20 3 20"/><line x1="3" y1="20" x2="21" y2="20"/></svg>},
]

function AppsPage(){
  const [cat,setCat]=useState("all")
  const [city,setCity]=useState("all")
  const [search,setSearch]=useState("")

  const filtered=BG_APPS.filter(a=>{
    const matchCat=cat==="all"||a.cat===cat
    const matchCity=city==="all"||a.cities.includes("all")||a.cities.includes(city)
    const matchSearch=!search||a.name.toLowerCase().includes(search.toLowerCase())||a.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat&&matchCity&&matchSearch
  })
  const catObj=BG_APP_CATS.find(c=>c.id===cat)
  const cityObj=APP_CITIES.find(c=>c.id===city)

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#3730a3)",padding:"32px 20px 44px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h1 className="serif" style={{color:"#fff",fontSize:"clamp(22px,4vw,36px)",fontWeight:400,margin:"0 0 6px"}}>📱 Bulgaria App Directory</h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:15,margin:"0 0 18px",fontWeight:300}}>Essential apps for expat life — filter by your city and category</p>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search apps..." style={{width:"100%",maxWidth:400,border:"none",borderRadius:12,padding:"11px 16px",fontSize:14,outline:"none",background:"rgba(255,255,255,0.15)",color:"#fff",boxSizing:"border-box"}}/>
        </div>
      </div>

      {/* City filter */}
      <div style={{background:"#2d2a5e",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"10px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:6,alignItems:"center"}}>
          <span style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",flexShrink:0,marginRight:4}}>City</span>
          {APP_CITIES.map(c=>(
            <button key={c.id} onClick={()=>setCity(c.id)}
              style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${city===c.id?"#fcd34d":"rgba(255,255,255,0.15)"}`,background:city===c.id?"rgba(252,211,77,0.15)":"transparent",color:city===c.id?"#fcd34d":"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:12,fontWeight:city===c.id?700:400,whiteSpace:"nowrap",flexShrink:0,display:"flex",alignItems:"center",gap:5}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div style={{background:"#1e1b4b",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:"10px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:6,alignItems:"center"}}>
          <span style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",flexShrink:0,marginRight:4}}>Type</span>
          {BG_APP_CATS.map(c=>(
            <button key={c.id} onClick={()=>{setCat(c.id);setSearch("")}}
              style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${cat===c.id?"#a5b4fc":"rgba(255,255,255,0.15)"}`,background:cat===c.id?"rgba(165,180,252,0.15)":"transparent",color:cat===c.id?"#a5b4fc":"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:12,fontWeight:cat===c.id?700:400,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><Icon2c d={MAP_PIN_D} accent="#f0c060" size={14}/>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 20px"}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>
          {filtered.length} apps
          {city!=="all"&&<span> available in <strong>{cityObj?.label}</strong></span>}
          {cat!=="all"&&<span> · {catObj?.label}</span>}
          {search&&<span> matching "{search}"</span>}
        </div>
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
                    {!app.cities.includes("all")&&<span style={{fontSize:10,color:"#0891b2",background:"#ecfeff",padding:"1px 6px",borderRadius:6,fontWeight:600}}>{app.cities.map(c=>APP_CITIES.find(x=>x.id===c)?.label||c).join(", ")}</span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:4}}>
                  {app.ios&&<div style={{width:20,height:20,borderRadius:4,background:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 12.94c-.03-2.68 2.19-3.97 2.29-4.03-1.25-1.83-3.19-2.08-3.88-2.11-1.65-.17-3.22.97-4.06.97-.84 0-2.13-.95-3.5-.92-1.8.03-3.46 1.05-4.39 2.66-1.87 3.25-.48 8.06 1.35 10.69.89 1.29 1.96 2.73 3.36 2.68 1.35-.05 1.86-.87 3.49-.87 1.63 0 2.09.87 3.51.84 1.45-.02 2.37-1.31 3.26-2.6 1.03-1.49 1.45-2.94 1.47-3.01-.03-.01-2.82-1.08-2.85-4.3M14.4 4.66c.74-.9 1.24-2.14 1.1-3.39-1.07.04-2.37.71-3.13 1.61-.68.79-1.28 2.06-1.12 3.27 1.19.09 2.41-.61 3.15-1.49"/></svg>
                  </div>}
                  {app.android&&<div style={{width:20,height:20,borderRadius:4,background:"#fff",border:"1px solid #e0dbd0",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#00D4FF" d="M3.6 1.8a1.5 1.5 0 00-.5 1.1v18.2c0 .44.19.83.5 1.1l10-10.2-10-10.2z"/><path fill="#FFCE00" d="M17.4 8.6l-3.8-2.2-2.5 2.6 2.5 2.6 3.8-2.2c.7-.4.7-1.4 0-1.8z"/><path fill="#FF3A44" d="M3.6 1.8c-.3.3-.5.7-.5 1.1l7.5 7.6 2.5-2.6L3.6 1.8z"/><path fill="#00F076" d="M3.1 21.1c0 .44.19.83.5 1.1l9.5-6.1-2.5-2.6-7.5 7.6z"/></svg>
                  </div>}
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
                  {app.ios&&<a href={app.ios} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"#000",color:"#fff",borderRadius:8,padding:"7px",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff" style={{flexShrink:0}}><path d="M17.05 12.94c-.03-2.68 2.19-3.97 2.29-4.03-1.25-1.83-3.19-2.08-3.88-2.11-1.65-.17-3.22.97-4.06.97-.84 0-2.13-.95-3.5-.92-1.8.03-3.46 1.05-4.39 2.66-1.87 3.25-.48 8.06 1.35 10.69.89 1.29 1.96 2.73 3.36 2.68 1.35-.05 1.86-.87 3.49-.87 1.63 0 2.09.87 3.51.84 1.45-.02 2.37-1.31 3.26-2.6 1.03-1.49 1.45-2.94 1.47-3.01-.03-.01-2.82-1.08-2.85-4.3M14.4 4.66c.74-.9 1.24-2.14 1.1-3.39-1.07.04-2.37.71-3.13 1.61-.68.79-1.28 2.06-1.12 3.27 1.19.09 2.41-.61 3.15-1.49"/></svg>
                    App Store
                  </a>}
                  {app.android&&<a href={app.android} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"#000",color:"#fff",borderRadius:8,padding:"7px",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#00D4FF" d="M3.6 1.8a1.5 1.5 0 00-.5 1.1v18.2c0 .44.19.83.5 1.1l10-10.2-10-10.2z"/><path fill="#FFCE00" d="M17.4 8.6l-3.8-2.2-2.5 2.6 2.5 2.6 3.8-2.2c.7-.4.7-1.4 0-1.8z"/><path fill="#FF3A44" d="M3.6 1.8c-.3.3-.5.7-.5 1.1l7.5 7.6 2.5-2.6L3.6 1.8z"/><path fill="#00F076" d="M3.1 21.1c0 .44.19.83.5 1.1l9.5-6.1-2.5-2.6-7.5 7.6z"/></svg>
                    Google Play
                  </a>}
                  {app.web&&<a href={app.web} target="_blank" rel="noopener noreferrer" style={{flex:!app.ios&&!app.android?2:1,background:"#6366f1",color:"#fff",borderRadius:8,padding:"7px",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>🌐 Open website</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"60px",color:C.muted}}><div style={{fontSize:32,marginBottom:8}}>📱</div><p>No apps found for {cityObj?.label||"this city"}. Try "All Bulgaria" or a different category.</p></div>}
      </div>
    </div>
  )
}

// ── Connect / Dating data ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
// TRAVEL GUIDE — expandable three-level structure:
//   region → cities → places (bars/restaurants/clubs/attractions)
//
// TO ADD CONTENT: copy an existing block and edit it. To add a city to a
// region, copy a city object. To add a place, copy a place object. Photos
// can be Unsplash URLs or left as "" (a coloured placeholder shows instead).
// ═══════════════════════════════════════════════════════════════════
const TRAVEL_GUIDE = {
  "black-sea": {
    name: "Black Sea Coast",
    tagline: "Bulgaria's beaches, resorts and seaside towns",
    hero: "https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=1200&q=80",
    intro: "Bulgaria's Black Sea coast stretches from Romania to Turkey, with sandy beaches, lively resorts and ancient seaside towns. Pick a destination below.",
    cities: [
      {
        id: "sunny-beach",
        name: "Sunny Beach",
        tagline: "Bulgaria's biggest party resort",
        hero: "https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=1200&q=80",
        intro: "Sunny Beach (Slanchev Bryag) is Bulgaria's largest and liveliest seaside resort — 8 km of sandy beach, endless bars and clubs, and budget-friendly nightlife. Busiest June–September.",
        places: [
          // ── PLACEHOLDERS — replace with real venues you know ──
          { name: "Example Beach Bar", type: "bar", desc: "Short description of this bar — vibe, what it's known for.", img: "", area: "Beachfront" },
          { name: "Example Restaurant", type: "restaurant", desc: "Cuisine, price range, why it's worth visiting.", img: "", area: "Center" },
          { name: "Example Nightclub", type: "club", desc: "Music style, crowd, opening hours.", img: "", area: "Cacao Beach" },
          { name: "Example Attraction", type: "attraction", desc: "What to see or do here.", img: "", area: "" },
        ],
      },
      // ── ADD MORE CITIES HERE (copy the block above) ──
      // { id:"nessebar", name:"Nessebar", tagline:"...", hero:"", intro:"...", places:[...] },
      // { id:"varna", name:"Varna", tagline:"...", hero:"", intro:"...", places:[...] },
    ],
  },
  // ── ADD MORE REGIONS HERE (copy the whole "black-sea" block) ──
  // "rila-pirin": { name:"Rila & Pirin Mountains", ... },
  "sofia": {
    name: "Sofia",
    tagline: "Bulgaria's capital — culture, mountains and expat life",
    hero: "https://images.unsplash.com/photo-1753529179550-c6aff1b76e6e?w=1200&q=80",
    intro: "Sofia is the cheapest EU capital and one of Europe's most underrated cities. Mountains 30 minutes from the center, a buzzing café culture, and a fast-growing expat community.",
    cities: [
      { id:"sofia-center", name:"Sofia Center", tagline:"Embassies, cafés, nightlife", hero:"https://images.unsplash.com/photo-1753529179550-c6aff1b76e6e?w=1200&q=80",
        intro:"The heart of Sofia — walkable, vibrant, close to everything. Home to Alexander Nevsky Cathedral, Vitosha Blvd and most expat-friendly services.",
        places:[
          {name:"Add a place",type:"attraction",desc:"Tap 'Edit' in your code to add real places here.",img:"",area:"Center"},
        ]},
    ],
  },
  "plovdiv": {
    name: "Plovdiv",
    tagline: "Older than Rome — cobblestones, culture and great coffee",
    hero: plovdiv,
    intro: "Bulgaria's second city and a growing expat favourite. The cobblestone Old Town (Stari Grad) sits above a Roman amphitheatre still used for concerts. Rents are 25–35% below Sofia.",
    cities: [
      { id:"plovdiv-old-town", name:"Old Town", tagline:"Cobblestones & Roman ruins", hero:plovdiv,
        intro:"The hilltop Old Town is Plovdiv's showpiece — restored Revival-era houses, galleries and the Roman theatre. The flat Kapana district below is the creative hub.",
        places:[
          {name:"Add a place",type:"attraction",desc:"Add real places from Plovdiv here.",img:"",area:"Old Town"},
        ]},
    ],
  },
  "varna": {
    name: "Varna",
    tagline: "Bulgaria's sea capital — beaches, nightlife and sea views",
    hero: "https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=1200&q=80",
    intro: "Varna is Bulgaria's third city and Black Sea capital. Larger and more sophisticated than Sunny Beach — a proper city with beaches, the Sea Garden park, and a lively summer scene. Rents are seasonal.",
    cities: [
      { id:"varna-center", name:"Varna Center", tagline:"Sea Garden, beach & city life", hero:"https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=1200&q=80",
        intro:"Varna's center runs from the Cathedral down to the famous Sea Garden and beach. The Briz and Chayka districts are popular with expats for their sea views.",
        places:[
          {name:"Add a place",type:"beach",desc:"Add real Varna places here.",img:"",area:"Sea Garden"},
        ]},
    ],
  },
  "burgas": {
    name: "Burgas",
    tagline: "Underrated Black Sea city — lakes, beaches and low rents",
    hero: "https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=1200&q=80",
    intro: "Burgas is the most affordable of Bulgaria's main cities. Its flat center is easy to walk, and it's surrounded by four lakes. A relaxed base for exploring the Southern Black Sea coast.",
    cities: [
      { id:"burgas-center", name:"Burgas Center", tagline:"Lakes, beach and a relaxed vibe", hero:"https://images.unsplash.com/photo-1683653417751-ea68aa8bc289?w=1200&q=80",
        intro:"Burgas is flat, walkable and unpretentious. The pedestrian Aleko Bogoridi street is the main artery. The beach is a 10-minute walk from the center.",
        places:[
          {name:"Add a place",type:"beach",desc:"Add real Burgas places here.",img:"",area:"Center"},
        ]},
    ],
  },
  "bansko": {
    name: "Bansko",
    tagline: "Bulgaria's top ski resort — and a great year-round base",
    hero: "https://images.unsplash.com/photo-1720959622076-a2a09dc4afbc?w=1200&q=80",
    intro: "Bansko is a small mountain town at the foot of the Pirin Mountains. World-class skiing Dec–Mar, hiking and biking in summer. A strong expat and digital nomad community has built up here.",
    cities: [
      { id:"bansko-center", name:"Bansko Town", tagline:"Ski, hike and après",hero:"https://images.unsplash.com/photo-1720959622076-a2a09dc4afbc?w=1200&q=80",
        intro:"The old cobblestone town meets a modern ski resort. The gondola is walkable from the center, and the main strip has dozens of mehanas (taverns) and bars.",
        places:[
          {name:"Add a place",type:"bar",desc:"Add real Bansko places here.",img:"",area:"Center"},
        ]},
    ],
  },
}

// Place-type styling (icon + colour). Add new types here if you need them.
const PLACE_TYPES = {
  bar:        { label: "Bar",         color: "#b45309", bg: "#fef3c7" },
  restaurant: { label: "Restaurant",  color: "#b91c1c", bg: "#fee2e2" },
  club:       { label: "Club",        color: "#7c3aed", bg: "#f3e8ff" },
  attraction: { label: "Attraction",  color: "#0891b2", bg: "#cffafe" },
  hotel:      { label: "Hotel",       color: "#1d4ed8", bg: "#dbeafe" },
  beach:      { label: "Beach",       color: "#0d9488", bg: "#ccfbf1" },
}

const INIT_PROFILES = [
  {id:1,name:"BGexpats",age:0,from:"Team",city:"sofia",flag:"🇧🇬",bio:"Official BGexpats account. We connect expats and Bulgarians across Bulgaria. Create your profile to be one of the first members!",lookingFor:"friends",languages:["English","Bulgarian"],interests:["travel","community","culture"],gender:"X",av:"BG",verified:true,online:true,team:true},
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
  const [loadingProfiles,setLoadingProfiles]=useState(true)
  const [myAvatar,setMyAvatar]=useState(()=>user?loadAvatar(user.email):null)
  const [avatarUploading,setAvatarUploading]=useState(false)
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const onResize=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",onResize)
    return()=>window.removeEventListener("resize",onResize)
  },[])

  // Load real member profiles from the database. Only signed-in members can read
  // them (enforced by RLS), so signed-out visitors just see the team card.
  useEffect(()=>{
    if(!user){setLoadingProfiles(false);return}
    let cancelled=false
    ;(async()=>{
      const {data,error}=await sbListProfiles()
      if(cancelled)return
      if(error||!data){setLoadingProfiles(false);return}
      // Only show profiles people have actually filled in (a bio is the signal).
      const real=data
        .filter(p=>p.bio&&p.bio.trim())
        .map(p=>({
          id:p.id,
          name:p.name||"Member",
          city:(p.city||"").toLowerCase(),
          bio:p.bio,
          lookingFor:p.looking_for||"friends",
          origin:p.origin||null,
          languages:p.languages||[],
          interests:p.interests||[],
          av:p.av||"?",
          avatarUrl:p.avatar_url||null,
          isMe:user&&p.id===user.id,
        }))
      setProfiles([...INIT_PROFILES,...real])
      setLoadingProfiles(false)
    })()
    return()=>{cancelled=true}
  },[user])

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
    // Real origin field (team cards have no origin and always show)
    if(!p.team&&filterFrom==="expat"&&p.origin!=="expat")return false
    if(!p.team&&filterFrom==="bulgarian"&&p.origin!=="bulgarian")return false
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
  const fromOpts=[{v:"all",l:"Everyone"},{v:"bulgarian",l:"Bulgarians"},{v:"expat",l:"Expats"}]

  return(
    <div style={{minHeight:"100vh",background:C.page}}>

      {/* Header — full-bleed hero: photo covers the whole banner, text sits on top */}
      <div style={{position:"relative",overflow:"hidden",minHeight:260,display:"flex",alignItems:"center",padding:"48px 20px 56px"}}>
        {/* Background photo */}
        <img src={connectHeroImg} alt="" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 35%"}}/>
        {/* Purple tint + darkening gradient so the white text stays readable */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(107,33,168,0.88),rgba(147,51,234,0.62))"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.25) 45%,rgba(0,0,0,0) 75%)"}}/>
        {/* Content */}
        <div style={{position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",width:"100%"}}>
          <div style={{maxWidth:620}}>
            <h1 className="serif" style={{color:"#fff",fontSize:"clamp(26px,4.4vw,42px)",fontWeight:400,margin:"0 0 8px",display:"flex",alignItems:"center",gap:12,textShadow:"0 2px 12px rgba(0,0,0,0.35)"}}><Icon2c d={CONNECT_ICON_D} accent="#f0c060" size={30}/>Meet &amp; Connect</h1>
            <p style={{color:"rgba(255,255,255,0.9)",fontSize:16,margin:"0 0 16px",fontWeight:300,textShadow:"0 1px 8px rgba(0,0,0,0.35)"}}>Connect expats and Bulgarians across Bulgaria</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {user?(
              <button onClick={()=>setView("account")} style={{background:"rgba(255,255,255,0.18)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,0.35)",color:"#fff",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                ✏️ Edit my profile
              </button>
            ):(
              <button onClick={()=>setView("login")} style={{background:"#fff",border:"none",color:"#6b21a8",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700,boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>
                Sign in to create your profile →
              </button>
            )}
            <button onClick={()=>setShowSafety(!showSafety)} style={{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,0.28)",color:"rgba(255,255,255,0.92)",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:14}}>
              <span style={{display:"flex",alignItems:"center",gap:6}}><Icon2c d={CONNECT_ICON_MAP.shield.d} accent="#f0c060" size={14}/>Safety tips</span>
            </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:isMobile?"20px 14px 40px":"28px 20px 48px"}}>

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
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 88px":"1fr 1fr",gap:12,marginBottom:12}}>
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
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:10,marginBottom:12}}>
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
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:isMobile?"14px 14px":"16px 18px",marginBottom:20,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
          <div style={{display:"flex",flexDirection:"column",gap:isMobile?12:14}}>
            <div style={{display:"flex",flexDirection:isMobile?"column":"row",flexWrap:"wrap",alignItems:isMobile?"stretch":"center",gap:isMobile?7:10}}>
              <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",flexShrink:0,width:isMobile?"auto":78}}>Show</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {fromOpts.map(o=><button key={o.v} onClick={()=>setFilterFrom(o.v)} style={{padding:"6px 12px",borderRadius:16,border:`1.5px solid ${filterFrom===o.v?"#9333ea":C.border}`,background:filterFrom===o.v?"#f3e8ff":"transparent",color:filterFrom===o.v?"#6b21a8":C.muted,cursor:"pointer",fontSize:12,fontWeight:filterFrom===o.v?700:400,display:"flex",alignItems:"center",gap:5}}><Icon2c d={(CONNECT_ICON_MAP[o.v]||{}).d} accent={(CONNECT_ICON_MAP[o.v]||{}).accent} size={13}/>{o.l}</button>)}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:isMobile?"column":"row",flexWrap:"wrap",alignItems:isMobile?"stretch":"center",gap:isMobile?7:10}}>
              <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",flexShrink:0,width:isMobile?"auto":78}}>Looking for</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {LOOKING_FOR_OPTS.map(o=>{
                  const isDating=o.v==="dating"
                  const locked=isDating&&!isPremium
                  return(
                    <button key={o.v}
                      onClick={()=>locked?setView("pricing"):setFilterLooking(o.v)}
                      style={{padding:"6px 14px",borderRadius:16,border:`1.5px solid ${filterLooking===o.v?"#9333ea":C.border}`,background:filterLooking===o.v?"#f3e8ff":"transparent",color:filterLooking===o.v?"#6b21a8":C.muted,cursor:"pointer",fontSize:12,fontWeight:filterLooking===o.v?700:400,display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                      <Icon2c d={(CONNECT_ICON_MAP[o.v]||{}).d} accent={(CONNECT_ICON_MAP[o.v]||{}).accent} size={13}/> {o.l}
                      {locked&&<span style={{fontSize:9,color:"#9333ea",fontWeight:600}}>· Premium</span>}
                    </button>
                  )
                })}
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flex:isMobile?1:"none",minWidth:0}}>
                <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",flexShrink:0,width:isMobile?"auto":78}}>City</div>
                <select value={filterCity} onChange={e=>setFilterCity(e.target.value)} style={{flex:isMobile?1:"none",minWidth:0,border:`1px solid ${C.border}`,borderRadius:10,padding:"7px 12px",fontSize:12,color:C.text,background:C.page,outline:"none"}}>
                  {cities.map(c=><option key={c.v} value={c.v}>{c.l}</option>)}
                </select>
              </div>
              <span style={{fontSize:12,color:C.muted,fontWeight:500,flexShrink:0}}>{visible.filter(p=>!p.team).length > 0 ? `${visible.length} members` : "Be the first member!"}</span>
            </div>
          </div>
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

        {/* Loading / empty states */}
        {user&&loadingProfiles&&(
          <div style={{textAlign:"center",padding:"30px 0",color:C.muted,fontSize:14}}>Loading members…</div>
        )}
        {user&&!loadingProfiles&&profiles.filter(p=>!p.team).length===0&&(
          <div style={{background:C.surface,border:`1px dashed ${C.border}`,borderRadius:16,padding:"28px 20px",textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:6}}>No member profiles yet</div>
            <p style={{fontSize:13,color:C.muted,margin:"0 0 14px",lineHeight:1.6}}>Be the first — add a photo and a short bio so others can find you.</p>
            <button onClick={()=>setView("account")} style={{background:"#9333ea",border:"none",color:"#fff",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>Create my profile →</button>
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
                  {p.avatarUrl?(
                    <img src={p.avatarUrl} alt="" style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",border:"2.5px solid rgba(255,255,255,0.4)",flexShrink:0}}/>
                  ):(
                    <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"2.5px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"#fff",flexShrink:0}}>
                      {p.av}
                    </div>
                  )}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
                      <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>{p.name}{p.age?`, ${p.age}`:""}</span>
                      {p.isMe&&<span style={{fontSize:11,background:"rgba(255,255,255,0.25)",color:"#fff",padding:"1px 6px",borderRadius:8}}>You</span>}
                      {p.verified&&<span style={{fontSize:11,background:"rgba(255,255,255,0.2)",color:"#fff",padding:"1px 6px",borderRadius:8}}>✓ verified</span>}
                    </div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      {p.origin==="bulgarian"&&<span>🇧🇬 Bulgarian</span>}
                      {p.origin==="expat"&&<span>🌍 Expat</span>}
                      {p.from&&<span>{p.flag} {p.from}</span>}
                      {(p.origin||p.from)&&p.city&&<span>·</span>}
                      {p.city&&<span style={{textTransform:"capitalize"}}>{p.city}</span>}
                      {p.online&&<span>·</span>}
                      {p.online&&<span style={{color:"#4ade80"}}>● online</span>}
                    </div>
                  </div>
                </div>

                <div style={{padding:"14px 16px"}}>
                  {/* Looking for badge */}
                  <div style={{display:"inline-flex",alignItems:"center",gap:4,background:`${lookColor}12`,border:`1px solid ${lookColor}30`,borderRadius:10,padding:"3px 10px",marginBottom:10,fontSize:12,fontWeight:600,color:lookColor}}>
                    <Icon2c d={(CONNECT_ICON_MAP[p.lookingFor]||CONNECT_ICON_MAP.all).d} accent={(CONNECT_ICON_MAP[p.lookingFor]||CONNECT_ICON_MAP.all).accent} size={13}/> {p.lookingFor==="friends"?"Expat Friends":p.lookingFor==="networking"?"Networking":p.lookingFor==="roommate"?"Roommate":p.lookingFor==="dating"?"Dating":p.lookingFor}
                  </div>

                  {/* Bio */}
                  <p style={{fontSize:13,color:C.text,margin:"0 0 12px",lineHeight:1.6,overflowWrap:"anywhere"}}>{(p.bio||"").slice(0,120)}{(p.bio||"").length>120?"...":""}</p>

                  {/* Languages */}
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                    {(p.languages||[]).slice(0,3).map(l=>(
                      <span key={l} style={{fontSize:11,background:C.page,border:`1px solid ${C.border}`,borderRadius:8,padding:"2px 7px",color:C.muted}}>🗣️ {l}</span>
                    ))}
                  </div>

                  {/* Interests */}
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                    {(p.interests||[]).slice(0,4).map(i=>(
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
            <div style={{marginBottom:10}}><Icon2c d={CONNECT_ICON_D} accent="#f0c060" size={28}/></div>
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

const AD_TIER_ICONS={
  pin:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  featured:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  sponsor:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/><circle cx="12" cy="12" r="3" fill="none"/></svg>,
}

const AD_TIERS = [
  {
    id:"pin",
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
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined"&&window.innerWidth<=768)
  useEffect(()=>{
    const r=()=>setIsMobile(window.innerWidth<=768)
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r)
  },[])
  const chosen=AD_TIERS.find(t=>t.id===sel)
  const chosenPrice=chosen?(billing==="yearly"?chosen.yearly:chosen.monthly):0
  const chosenUnit=billing==="yearly"?"/year":"/month"
  const mailto=`mailto:${AD_CONTACT_EMAIL}?subject=${encodeURIComponent("Advertising enquiry — "+(chosen?chosen.name:"BGexpats"))}&body=${encodeURIComponent("Hi BGexpats team,\n\nWe'd like to advertise on BGexpats.\n\nBusiness name:\nCity:\nCategory (e.g. legal, healthcare, dining):\nWebsite:\nInterested in: "+(chosen?chosen.name+" (€"+chosenPrice+chosenUnit+")":"")+"\n\nOur question / goal:\n\nThanks!")}`

  return(
    <div style={{minHeight:"100vh",background:C.page}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(150deg,${C.primary},#2a7a52 70%)`,padding:"52px 20px 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
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
                <div style={{color:tier.accent,marginBottom:10,display:"flex",alignItems:"center"}}>{AD_TIER_ICONS[tier.id]}</div>
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


