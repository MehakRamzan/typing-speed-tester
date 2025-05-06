const quotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. Each setback is a lesson in disguise, and every failure plants the seed of resilience. Remember, persistence in the face of adversity is what transforms ordinary people into legends. Never fear falling—fear not trying again.",

  "Time is more valuable than money. You can get more money, but you cannot get more time. Every second that passes is a moment you will never retrieve, so spend it wisely. Invest your time in experiences, in growth, and in people who uplift you. The clock is always ticking; make sure it ticks in your favor.",

  "Courage doesn’t always roar. Sometimes courage is the quiet voice at the end of the day whispering, ‘I will try again tomorrow.’ Life does not require you to be the fastest or the strongest; it only asks that you keep going. Through steady steps and quiet persistence, we accomplish things that once felt impossible.",

  "Success is not born of luck or convenience—it is born of consistent effort and determination. The people who achieve great things are those who show up daily, embrace discomfort, and persevere when no one is watching. It’s the habit of pushing forward, even when motivation fades, that separates winners from wishers.",

  "The mind is everything. What you think, you become. Thoughts have the power to shape our reality, guide our choices, and form our destiny. Fill your mind with possibility, not limitation. Plant the seeds of positivity, nurture them with action, and watch your life transform as your thoughts become things.",

  "Technology is best when it brings people together. From the first written language to the internet age, every leap forward has been about connection. While we may be miles apart physically, the power of technology can bridge our hearts, share our stories, and unite us in ways never before imagined.",

  "Do not fear mistakes, for they are the footprints of progress. Every error holds a lesson, and every misstep teaches you how to walk straighter. The path to mastery is never a straight line—it’s a winding road filled with trial, reflection, and growth. Learn fast, forgive faster, and keep moving forward.",

  "Growth never comes from comfort. You must challenge your limits, embrace the unknown, and trust the process. The moments that scare you most often lead to the breakthroughs that change everything. Comfort may feel safe, but it rarely yields progress. Step out, stumble, learn, repeat. That is how growth unfolds.",

  "In a world of noise and haste, stillness is a power. It is in silence that we hear our thoughts clearly and reconnect with our intentions. Taking a moment to breathe, to pause, and to reflect is not weakness—it is wisdom. Don’t let the chaos outside drown the voice within.",

  "Hard work beats talent when talent doesn't work hard. Natural ability is only the beginning; discipline is what sharpens it into greatness. Show up on the hard days. Push when it's inconvenient. Your competition might be smarter or faster, but if you’re relentless, no one will outlast you.",
];

let start = document.getElementById("start-btn")
let quoteText = document.getElementById("quote-text")
let typedText = document.getElementById("typed-text")
let timeDisplay = document.getElementById("time")
let wpm = document.getElementById("wpm")
let accuracy = document.getElementById("accuracy")


if(localStorage.getItem("lastQuote")){
    quoteText.innerText = localStorage.getItem("lastQuote")
}

start.addEventListener('click' , function(){
    let randomQuoteNum = Math.floor(Math.random()*quotes.length)
    let selectedQoute = quotes[randomQuoteNum]
    quoteText.innerText = selectedQoute;

    localStorage.setItem("lastQuote" , selectedQoute)


})

let startTime = null;
let timeInterval = null;

function startTimer() {
    
    if (!startTime) {
        startTime = Date.now();
        localStorage.setItem("startTime", startTime);
        timeInterval = setInterval(() => {
            let timeTaken = Math.floor((Date.now() - startTime) / 1000);
            timeDisplay.innerText = `${timeTaken}s`;
        }, 1000);
    }
}


typedText.addEventListener("keydown", startTimer);


function resetTest() {
    // Clear previous timer & remove stored startTime
    clearInterval(timeInterval);
    startTime = null;
    localStorage.removeItem("startTime");
    timeDisplay.innerText = "0s";
    typedText.value = ""
    typedText.removeAttribute("disabled");

}


start.addEventListener("click", resetTest);

let currentText = quoteText.innerText;
let typed = typedText.value;
let accuracyResult
let wordpermin 


function stopTimer(){
    clearInterval(timeInterval);

    let totalTime = Math.floor((Date.now() - startTime) / 1000);
    let wordCount = typedText.value.trim().split(/\s+/).length;

    wordpermin = Math.round((wordCount / totalTime) * 60);
    wpm.innerText = wordpermin;

    let currentText = quoteText.innerText; // ✅ Get latest quote
    let typed = typedText.value; // ✅ Get latest typed text

    let correctedChars = 0;
    let originalChars = currentText.length;
    let typedChars = typed.length;

    for (let i = 0; i < Math.min(originalChars, typedChars); i++) {
        if (typed.charAt(i) === currentText.charAt(i)) {
            correctedChars++;
        }
    }

    accuracyResult = Math.round((correctedChars / originalChars) * 100); // ✅ FIXED

    accuracy.innerText = `${accuracyResult}%`;

    updateHighScores(wordpermin, accuracyResult);

    alert("✅ Test Completed! Your typing speed has been recorded."); 

 
}


typedText.addEventListener('input', function(){
    let typedWords = typedText.value.trim().split(/\s+/).length;
    let originalWords = quoteText.innerText.trim().split(/\s+/).length;

    if (typedWords >= originalWords + 1) {
        stopTimer();
        typedText.setAttribute("disabled", "true");
    }
})


function updateHighScores(currentWPM, currentAccuracy) {
    let storedHighWPM = parseInt(localStorage.getItem("highestWPM")) || 0;
    let storedHighAccuracy = parseInt(localStorage.getItem("highestAccuracy")) || 0;

    if (currentWPM > storedHighWPM) {
        localStorage.setItem("highestWPM", currentWPM);
        document.getElementById("hightwpm").innerText = currentWPM;
    } else {
        document.getElementById("hightwpm").innerText = storedHighWPM;
    }

    if (currentAccuracy > storedHighAccuracy) {
        localStorage.setItem("highestAccuracy", currentAccuracy);
        document.getElementById("highesAccuracy").innerText = `${currentAccuracy}%`;
    } else {
        document.getElementById("highesAccuracy").innerText = `${storedHighAccuracy}%`;
    }
}