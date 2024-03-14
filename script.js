
const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");
const rotatingImage = document.getElementById("rotating-image");
const zoomEffectImage = document.querySelector(".zoom-effect");
const zoomCopyButtom = document.querySelector(".copy-2");

let passwordLength = 6

function generatePassword(){
   let chars="abcdefghjkmnpqrstuvwxyz";
   const upperCaseChars = "ABCDEFGHJLMNPQRSTUVWXZ";
   const numberChars = "123456789";
   const symbolChars="?!@#$%&()[]";

   if(upperCaseCheckEl.checked){
      chars+=upperCaseChars
   }
   
   if(numberCheckEl.checked){
      chars+=numberChars
   }
   
   if(symbolCheckEl.checked){
      chars+=symbolChars
   }
   
   let password = ""
   for (let i=0 ; i<passwordLength ; i++){
      const randomNumber=Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber,randomNumber + 1)
   }    
   inputEl.value = password

   calculateQuality()
   calculateFontSize()
}

function calculateQuality(){

   const percent = Math.round(
      (passwordLength/20) * 30 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numberCheckEl.checked ? 25 : 0)+  
      (symbolCheckEl.checked ? 30 : 0)                        
   )

   securityIndicatorBarEl.style.width = `${percent}%`;

   if(percent>50){
      securityIndicatorBarEl.classList.remove("critical");
      securityIndicatorBarEl.classList.remove("warning");
      securityIndicatorBarEl.classList.add("save")

   }else if (percent>25){
      securityIndicatorBarEl.classList.remove("critical");
      securityIndicatorBarEl.classList.add("warning");
      securityIndicatorBarEl.classList.remove("save")

   }else{
      securityIndicatorBarEl.classList.add("critical");
      securityIndicatorBarEl.classList.remove("warning");
      securityIndicatorBarEl.classList.remove("save")
   }

   if(percent>= 100){
      securityIndicatorBarEl.classList.add("completed")
   }else{
      securityIndicatorBarEl.classList.remove("completed")
   }

}

rotatingImage.addEventListener('click', () => {
   rotatingImage.style.transform += 'rotate(120deg)';
   
   setTimeout(() => {
     rotatingImage.style.transform = '';
   }, 500);
 });

zoomEffectImage.addEventListener('click', () => {
  zoomEffectImage.classList.add('zoomed');
  
  setTimeout(() => {
    zoomEffectImage.classList.remove('zoomed');
  }, 500);
});

zoomCopyButtom.addEventListener('click', () => {
   zoomCopyButtom.classList.add('copyZomm');
   
   setTimeout(() => {
     zoomCopyButtom.classList.remove('copyZomm');
   }, 500);
 });

function calculateFontSize(){
   if(passwordLength > 19){
      inputEl.classList.remove("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.add("font-xxs")
   }else if(passwordLength>13){
      inputEl.classList.remove("font-sm")
      inputEl.classList.add("font-xs")
      inputEl.classList.remove("font-xxs")
   }else if(passwordLength>3){
      inputEl.classList.add("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.remove("font-xxs")
   }else{
      inputEl.classList.remove("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.remove("font-xxs")
   }
}

function copy(){
   navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", () => {
   passwordLength = passwordLengthEl.value
   document.querySelector("#password-langth-text").innerText = passwordLength
   generatePassword()
})

upperCaseCheckEl.addEventListener("click",generatePassword)
numberCheckEl.addEventListener("click",generatePassword)
symbolCheckEl.addEventListener("click",generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click",generatePassword)

generatePassword()
