const reponse = [
    "Si je suis fidèle c'est à ce trône peu importe qui monte dessus",
    "Il faut chercher en Arctique la cité perdue d'Atlantis. Ce sera un défi de taille pour ceux qui sont prêts à partir à la recherche de cette ancienne civilisation",
    "Le Roi Lion"
  ]
  
  //selection des élements necessaires
  const input = document.querySelector('.enigme input')
  const checkButton = document.querySelector('.enigme button')
  const feedbackElement = document.createElement('div')
  feedbackElement.style.marginTop = '10px'
  feedbackElement.style.fontFamily = 'texte'
  feedbackElement.style.fontWeight = 'bold'
  
 input.parentNode.insertBefore(feedbackElement, input.nextSibling)
  
  
  const enigmes = [
    { div: document.getElementById('first'), hint: document.getElementById('one') },
    { div: document.getElementById('second'), hint: document.getElementById('two') },
    { div: document.getElementById('third'), hint: document.getElementById('three') }
  ]
  
  let currentEnigmeIndex = 0
  
  // function show Message pour connaitre si la réponse est vrai ou fausse
  function showMessage(message, color) {
    feedbackElement.style.color = color
    feedbackElement.textContent = message
  
    // Effacer le feedback après 4s 
    setTimeout(function () {
      feedbackElement.textContent = ''
    }, 4000)
  }
  
  // Function pour l'Ecnigme suivante
  function showNextEnigma() {
    // verification s'il y a encore des enigmes
    if (currentEnigmeIndex < enigmes.length) {
      const currentEnigma = enigmes[currentEnigmeIndex]
  
      //Cacher toute les enigmes
      enigmes.forEach(enigma => {
        enigma.div.style.display = 'none'
        enigma.hint.style.display = 'none'
      })
  
      // afficher le current enigme
      currentEnigma.div.style.display = 'block'
      currentEnigma.hint.style.display = 'block'
  
      // incrementer l'index de currentEnigmeIndex
      currentEnigmeIndex++
    }
  }
  
  // congrats popup
  function showCongratsPopup() {
    const congratsPopup = document.getElementById('congratsPopup')
    congratsPopup.style.display = 'block'
  }
  
  // second popup
  function showSecondPopup() {
    const secondPopup = document.getElementById('secondPopup')
    secondPopup.style.display = 'block'
  }
  
  //decompte dans le sécond popup 
  function startTimer(duration) {
    const timerElement = document.getElementById('timer')
  
    let timer = duration
    let hours, minutes, seconds
  
    const intervalId = setInterval(function () {
      hours = Math.floor(timer / 3600)
      minutes = Math.floor((timer % 3600) / 60)
      seconds = Math.floor(timer % 60)
  
      hours = hours.toString().padStart(2, '0')
      minutes = minutes.toString().padStart(2, '0')
      seconds = seconds.toString().padStart(2, '0')
  
      timerElement.textContent = hours + ':' + minutes + ':' + seconds
  
      if (--timer < 0) {
        clearInterval(intervalId)
      }
    }, 1000)
  }
  
  // Action de check button
  checkButton.addEventListener('click', function () {
    const inputValue = input.value.toLowerCase().trim()
  
    const currentReponse = reponse[currentEnigmeIndex - 1].toLowerCase()
  
    if (inputValue === currentReponse) {
      showMessage("Bonne réponse!", 'green')
      if (currentEnigmeIndex === enigmes.length) {
        showCongratsPopup()
        setTimeout(showSecondPopup, 5000)
        startTimer(40)
      }
  
      showNextEnigma()
    } else {
      showMessage("reponse incorrect! Réesayez", 'red')
    }
   input.value = ''
  })
  
  // Function pour redemarer le jeux
  function restartGame() {
    currentEnigmeIndex = 0
    showNextEnigma()
    hidePopup('secondPopup')
    hidePopup('congratsPopup')
  }
  
  function redirectHomepage() {
    currentEnigmeIndex = 0
    showNextEnigma()
    hidePopup('congratsPopup')
    hidePopup('secondPopup')
    window.location.href = 'index.html' 
  }
  
  // Function pour cacher le popup 
  function hidePopup(popupId) {
    const popup = document.getElementById(popupId)
    popup.style.display = 'none'
  }
  
  const restartButton = document.getElementById('restartButton')
  restartButton.addEventListener('click', restartGame)
  
  const redirectButton = document.getElementById('redirectButton')
  redirectButton.addEventListener('click', redirectHomepage)
  
  // decompte pour le sécond popup
  function startTimer(duration) {
    const timerElement = document.getElementById('timer')
  
    let timer = duration
    let hours, minutes, seconds
  
    const intervalId = setInterval(function () {
      hours = Math.floor(timer / 3600)
      minutes = Math.floor((timer % 3600) / 60)
      seconds = Math.floor(timer % 60)
  
      hours = hours.toString().padStart(2, '0')
      minutes = minutes.toString().padStart(2, '0')
      seconds = seconds.toString().padStart(2, '0')
  
      timerElement.textContent = hours + ':' + minutes + ':' + seconds
  
      if (--timer < 0) {
        clearInterval(intervalId)
        redirectHomepage()
      }
    }, 1000)
  }
  
  showNextEnigma()  
