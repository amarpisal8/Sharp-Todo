
// charAt : या मध्ये आपण स्ट्रिंग चे स्थानिक number टाकले असता तो string मिळतो
const str = "Amar Pisal";
for(let i=0; i<str.length; i++){
const charAtMeth = str.charAt(i);
console.log(charAtMeth);
}

// concat : या मध्ये दोन string मध्ये जोडू शकतो
const str1 = "Amar";
const str2 = "Pisal";
const concatStr = str1.concat(" " +str2);
console.log(concatStr);


// includes : याचा वापर करून आपण string मध्ये उपलब्श असलेले words ची उपस्थिती बघू शकतो
const str3 = "Amar Pisal";
const includeAmar = str3.includes("Amar");
if(includeAmar){
    console.log("Amar Present");
}else{
    console.log("Amar Not Present");
}

// indexOf : दिलेल्या string मध्ये तो word कुटुन चालू होतो आहे ते सांगत
const str4  = str3;
console.log(str4.indexOf("Amar"));


// slice : या मध्ये आपण दिलेल्या string मध्ये modified न करता हवा तसा काप काडून नवीन string बनवू शकतो
const str5 = "pisalamar8";
const str6 = str5.slice(5, 9);
console.log(str6);


// toLowerCase toUpperCase : string ला small लिपी मध्ये किवा मोठ्या लिपी मध्ये convert करू शकतो
const str7 = "Amar Pisal";
console.log(str7.toLowerCase());
console.log(str7.toUpperCase());



//trim : या मध्ये नको असलेले white space remove होतो
const str8 = "  Amar Pisal  " ;
console.log(str8.trim()); 

const str9 = "Lorem ipsum dolor sit amet consectetur";
const words = str9.split();
console.log(words);
// toString : 
const str10 = words.toString()
console.log(str10);


const padVar = "5";
console.log(padVar.padStart(5 , "0"));
console.log(padVar.padEnd(4,"x"));

const matchStr = "color";
console.log();