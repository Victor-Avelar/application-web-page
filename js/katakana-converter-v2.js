//Convert this into a library in the structure of jQuery and the Greeter mini framework so that we can set html elements to have katakana values by calling this framework as an IIFE.
//Implement Hiragana


//English string to Katakana converter


;(function(global, $){
    
    //makes a new instance of the jpConvert.init() function so that when we use the Greeter framework, it returns a new object that points to the greetr function constructor.    
    var jpConvert = function(romaji, kana) {
        return new jpConvert.init(romaji, kana);
    }
    
//Variables accessable within the scope of this framework/library
    
    //katakana list
    var kList = ['ア','イ','ウ','エ','オ',
                 'カ','キ','ク','ケ','コ','ガ','ギ','グ','ゲ','ゴ',
                 'サ','シ','ス','セ','ソ','ザ','ジ','ズ','ゼ','ゾ',
                 'タ','チ','ツ','テ','ト','ダ','ヂ','ヅ','ヅ','デ','ド',
                 'ナ','ニ','ヌ','ネ','ノ',
                 'ハ','ヒ','フ','ヘ','ホ','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ',
                 'マ','ミ','ム','メ','モ',
                 'ヤ','イ','ユ','イェ','ヨ',
                 'ラ','リ','ル','レ','ロ',
                 'ワ','ヲ','ン','ー',' ', 'ッ',//NOTE: small tsu is written as '/' in romaji
                 'キャ','キュ','キョ','ギャ','ギュ','ギョ','チャ','チュ','チョ',
                 'ジャ','ジュ','ジョ',
                 'ニャ','ニュ','ニョ','ミャ','ミュ','ミョ','リャ','リュ','リョ']
    
    var hList = ['あ','い','う','え','お','か','き','く','け','こ','が','ぎ','ぐ','げ','ご','さ','し','す','せ','そ','ざ','じ','ず','ぜ','ぞ','た','ち','つ','て','と','だ','ぢ','づ','づ','で','ど','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ','ま','み','む','め','も','や','い','ゆ','いぇ','よ','ら','り','る','れ','ろ','わ','を','ん','ー',' ','っ','きゃ','きゅ','きょ','ぎゃ','ぎゅ','ぎょ','ちゃ','ちゅ','ちょ','じゃ','じゅ','じょ','にゃ','にゅ','にょ','みゃ','みゅ','みょ','りゃ','りゅ','りょ'];

    //romaji list 
    var kListEn = ['a','i','u','e','o',
                     'ka','ki','ku','ke','ko','ga','gi','gu','ge','go',
                     'sa','shi','su','se','so','za','ji','zu','ze','zo',
                     'ta','chi','tsu','te','to','da','di','dsu','du','de','do',
                     'na','ni','nu','ne','no',
                     'ha','hi','fu','he','ho','ba','bi','bu','be','bo',
                     'pa','pi','pu','pe','po',
                     'ma','mi','mu','me','mo',
                     'ya','yi','yu','ye','yo',
                     'ra','ri','ru','re','ro',
                     'wa','wo','n','-',' ', '/',
                     'kya','kyu','kyo','gya','gyu','gyo','cya','cyu','cyo',
                     'jya','jyu','jyo',
                     'nya','nyu','nyo','mya','myu','myo','rya','ryu','ryo'];
    
    //Here we will put any methods that we might want to use inside the object that is returned from jpConvert. (saves memory by adding to prototype instead of new object)
    jpConvert.prototype = {

        // Takes a string and returns an array composed of the individual characters of the string.
        breakString: function(str) {
            var arr = [];
            for (i = 0; i < str.length; i++) {
            // substr() takes in the starting index and how many characters you want to return  
            arr.push(str.substr(i, 1));
            }
            return arr;
        },

        //takes an array and returns a single string of the array components. (undoes breakString())
        arrayToString: function(arr){
            var str = '';
            for(i = 0; i < arr.length; i++) {
                str += arr[i];
            }
            return str;
        },

        //breaks the romaji string into parts coresponding to the length of the matching katakana character 
        seperateRomaji: function(romaji) {
            
            /*
            //I changed the code so that we use kListEn instead of these redundant arrays. 
            var singleCharacters = ['a', 'i', 'u', 'e', 'o', 'n', '-', '/', ' '];
            var naExeptions = ['na', 'ni', 'nu', 'ne', 'no']   
            var tripleCharacters = ['shi','dzu','chi','tsu','dsu',
                                    'cya','cyu','cyo','kya','kyu','kyo','gya','gyu','gyo',
                                    'nya','nyu','nyo','mya','myu','myo','rya','ryu','ryo'];
            */
            
            //I changed the name of the parameter so instead of changing it all below I changed it here.
            var str = romaji;
            var arr = [];

            for (i = 0; i < str.length; i++) {

                //checks if we iterated upon a tripleCharacter
                if(kListEn.indexOf(str.substr(i,3)) != -1) {
                    arr.push(str.substr(i, 3));
                    i+=2 //we need to move 3 indexes in the string array. (i++ moves 1, +2 = 3)
                }   

                //checks if we iterated upon the naExeptions. Important to do this before singleCharacters because 'n' is in singleCharacters.
                else if(kListEn.indexOf(str.substr(i,2)) != -1) {
                    arr.push(str.substr(i, 2));
                    i +=1;
                }

                //checks if we iterated upon the singleCharacters
                else if(kListEn.indexOf(str.substr(i,1)) != -1) {
                    arr.push(str.substr(i, 1));
                }        

                //in every other case we will land upon a double english character construct. 
                else if(kListEn.indexOf(str.substr(i,2)) != -1) {
                    arr.push(str.substr(i, 2));
                    i +=1; //we need to move two indexes in the string array
                }
                else{
                    arr.push(str.substr(i, 1));
                }
            }
            return arr;
        },

        //converts a broken english array to an index number pair matching kListEn and kList
        convertToIndex: function(brokenEnglishArray){
            var indexArr = [];
            for (i = 0; i < brokenEnglishArray.length; i++){
                
                //checks if we get undefined so romaji "yyatori" returns "ｙヤトリ” and not "undefinedヤトリ"
                if (kListEn.indexOf(brokenEnglishArray[i]) === -1){
                    indexArr[i] = brokenEnglishArray[i];
                }
                else{
                    indexArr[i] = kListEn.indexOf(brokenEnglishArray[i]);
                }
            }
            return indexArr;
        },


        //takes a Japanese string written in English and converts it to Katakana
        romajiToKana: function(romaji, kana){
            //converts romaji to an array of seperated parts
            var seperatedRomajiArray = this.seperateRomaji(romaji);
            
            /*
            //this is here for debugging, remove later
            console.log(seperatedRomajiArray); 
            console.log('-------------------------------------------------------')
            */
            
            //converts seperatedRomajiArray  to the index numbers of kListEn
            var indexedArray = this.convertToIndex(seperatedRomajiArray);

            //now we need to use indexedArray (points to the indexes of kListEn[]) to create a new array that converts the indexes of kListEn to the values of kList
            var convertedArray = [];
            for (i=0; i< indexedArray.length; i++){
                
                if (kana === "kata"){
                //if we get a string instead of an index from convertToIndex, return the string. Else, proceed to convert the index to the katakana value.
                    if (indexedArray[i]%1 == 0){
                        convertedArray[i] = kList[indexedArray[i]];
                    }
                    else{
                        convertedArray[i] = indexedArray[i];
                    }
                }
                else if(kana === "hira"){
                    if (indexedArray[i]%1 == 0){
                        convertedArray[i] = hList[indexedArray[i]];
                    }
                    else{
                        convertedArray[i] = indexedArray[i];
                    }  
                }
                else{
                    throw 'expected either "hira" or "kata"';
                }
            }
            return this.arrayToString(convertedArray);
            //if we want to return the seperated katakana in an array just return convertedArray
        }
    }
    
    //sets properties and builds this new object that is returned by the jpConvert function.
    jpConvert.init = function(romaji, kana) {
        var self = this;
        self.romaji = romaji ||  'Default';
        self.kana = kana || 'Default';
        self.kata = self.romajiToKana(romaji, 'kata');
        self.hira = self.romajiToKana(romaji, 'hira');
    }
    
    //sets the jpConvert.init's prototype reference to the jpConvert's prototype so we have easy access to it's methods.
    jpConvert.init.prototype = jpConvert.prototype;
   
    //attatches our framework/library to the global object and sets the tags we can access greetr by.
    global.jpConvert = global.V = jpConvert;    
    
    //logs your name Paulo Henrique Avelar in Japanese Katakana, if you are reading this xD
    //console.log(jpConvert('seikaidesuka'));
    //console.log(jpConvert);
}(window, jQuery));





//this function is used within the jquery .bind to set the value of the html katakanaBox tag to what the romajiInputBox is at any given time                      
var updateKataBox = function(input) {
    $("#katakanaBox").html(V(input).kata);
}

var updateHiraBox = function(input) {
    $("#hiraganaBox").html(V(input).hira);
    
}

$('#romajiInputBox').bind('input', function() { 
    $(this).val();// get the current value of the input field.
    updateKataBox($(this).val());
    updateHiraBox($(this).val());
});






$("#btn3").click(function(){
    $("#jpc").text(V("seikaidesuka").kata);
}); 
$("#btn2").click(function(){
    $("#btn1").val(V("seikaidesuka").kata);
}); 



/*
// lets use our object on the click of the login button
$('#login').click(function() {
   
    // create a new 'Greetr' object (let's pretend we know the name from the login)
    var kana = V('seikaidesuka', 'kata');
   
    // hide the login on the screen
    $('#logindiv').hide();
    
    // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
    //loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
 });
*/


        