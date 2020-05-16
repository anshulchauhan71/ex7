

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["Achalpur","Achhnera","Adalaj","Adilabad","Adityapur","Adoni","Adoor","Adyar","Adra","Afzalpur","Agartala","Agra","Ahmedabad","Ahmednagar","Aizawl","Ajmer","Akola","Akot","Alappuzha","Aligarh","Alipurduar","Alirajpur","Allahabad","Alwar","Amalapuram","Amalner","Ambejogai","Ambikapur","Amravati","Amreli","Amritsar","Amroha","Anakapalle","Anand","Anantapur","Anantnag","Anjar","Anjangaon","Ankleshwar","Arakkonam","Araria","Arambagh","Arsikere","Arrah","Aruppukkottai","Arvi","Arwal","Asansol","Asarganj","Ashok Nagar","Athni","Attingal","Aurangabad","Aurangabad","Azamgarh","Bikaner","Bhiwandi","Bagaha","Bageshwar","Bahadurgarh","Baharampur","Bahraich","Balaghat","Balangir","Baleshwar Town","Bengaluru","Bankura","Bapatla","Baramula","Barbil","Bargarh","Barh","Baripada Town","Barnala","Barpeta","Batala","Bathinda","Begusarai","Belagavi","Bellampalle","Ballari","Belonia","Bettiah","Bhabua","Bhadrachalam","Bhadrak","Bhagalpur","Bhainsa","Bharuch","Bhatapara","Bhavnagar","Bhawanipatna","Bheemunipatnam","Bhilai Nagar","Bhilwara","Bhimavaram","Bhiwani","Bhongir","Bhopal","Bhubaneswar","Bhuj","Bilaspur","Bobbili","Bodhan","Bokaro Steel City","Bongaigaon City","Brahmapur","Buxar","Byasanagar","Chandausi","Chaibasa","Chandigarh","Charkhi Dadri","Chatra","Chalakudy","Changanassery","Chennai","Cherthala","Chikkamagaluru","Chhapra","Chilakaluripet","Chirala","Chirkunda","Chirmiri","Chittur-Thathamangalam","Chittoor","Coimbatore","Cuttack","Dalli-Rajhara","Medininagar (Daltonganj)","Darbhanga","Darjiling","Davanagere","Deesa","Dehradun","Dehri-on-Sone","Delhi","Deoghar","Dhamtari","Dhanbad","Dharmanagar","Dharmavaram","Dhenkanal","Dhoraji","Dhubri","Dhule","Dhuri","Dibrugarh","Dimapur","Diphu","Kalyan-Dombivali","Dumka","Dumraon","Durg","Eluru","Erode","English Bazar","Etawah","Faridabad","Faridkot","Firozabad","Farooqnagar","Fatehabad","Fazilka","Forbesganj","Firozpur","Firozpur Cantt.","Fatehpur Sikri","Gadwal","Ganjbasoda","Gaya","Giridih","Goalpara","Gobichettipalayam","Gobindgarh","Godhra","Gohana","Gokak","Gooty","Gopalganj","Gudivada","Gudur","Gumia","Guntakal","Guntur","Gurdaspur","Gurgaon","Guruvayoor","Guwahati","Gwalior","Habra","Hajipur","Haldwani","Hansi","Hapur","Hardwar","Hazaribag","Hindupur","Hisar","Hoshiarpur","Hubli-Dharwad","Hugli-Chinsurah","Hyderabad","Ichalkaranji","Imphal","Indore","Itarsi","Jabalpur","Jagdalpur","Jaggaiahpet","Jagraon","Jagtial","Jaipur","Jalandhar Cantt.","Jalandhar","Jalpaiguri","Jamalpur","Jammalamadugu","Jammu","Jamnagar","Jamshedpur","Jamui","Jangaon","Jatani","Jehanabad","Jhansi","Jhargram","Jharsuguda","Jhumri Tilaiya","Jind","Jorhat","Jodhpur","Kadapa","Kadi","Kadiri","Kagaznagar","Kailasahar","Kaithal","Kakinada","Kalpi","Kalyan-Dombivali","Kamareddy","Kancheepuram","Kandukur","Kanhangad","Kannur","Kanpur","Kapadvanj","Kapurthala","Karaikal","Karimganj","Karimnagar","Karjat","Karnal","Karur","Karwar","Kasaragod","Kashipur","Kathua","Katihar","Kavali","Kayamkulam","Kendrapara","Kendujhar","Keshod","Khair","Khambhat","Khammam","Khanna","Kharagpur","Kharar","Khowai","Kishanganj","Kochi","Kodungallur","Kohima","Kolar","Kolkata","Kollam","Korba","Koratla","Kot Kapura","Kothagudem","Kottayam","Kovvur","Kozhikode","Kunnamkulam","Kurnool","Kyathampalle","Lachhmangarh","Ladnu","Ladwa","Lahar","Laharpur","Lakheri","Lakhimpur","Lakhisarai","Lakshmeshwar","Lal Gopalganj Nindaura","Lalganj","Lalgudi","Lalitpur","Lalganj","Lalsot","Lanka","Lar","Lathi","Latur","Lilong","Limbdi","Lingsugur","Loha","Lohardaga","Lonar","Lonavla","Longowal","Loni","Losal","Lucknow","Ludhiana","Lumding","Lunawada","Lunglei","Macherla","Machilipatnam","Madanapalle","Maddur","Madhepura","Madhubani","Madhugiri","Madhupur","Madikeri","Madurai","Magadi","Mahad","Mahbubnagar","Mahalingapura","Maharajganj","Maharajpur","Mahasamund","Mahe","Manendragarh","Mahendragarh","Mahesana","Mahidpur","Mahnar Bazar","Mahuva","Maihar","Mainaguri","Makhdumpur","Makrana","Malda","Malaj Khand","Malappuram","Malavalli","Malegaon","Malerkotla","Malkangiri","Malkapur","Malout","Malpura","Malur","Manachanallur","Manasa","Manavadar","Manawar","Mancherial","Mandalgarh","Mandamarri","Mandapeta","Mandawa","Mandi","Mandi Dabwali","Mandideep","Mandla","Mandsaur","Mandvi","Mandya","Maner","Mangaldoi","Mangaluru","Mangalvedhe","Manglaur","Mangrol","Mangrol","Mangrulpir","Manihari","Manjlegaon","Mankachar","Manmad","Mansa","Mansa","Manuguru","Manvi","Manwath","Mapusa","Margao","Margherita","Marhaura","Mariani","Marigaon","Markapur","Marmagao","Masaurhi","Mathabhanga","Mattannur","Mathura","Mauganj","Mavelikkara","Mavoor","Mayang Imphal","Medak","Medinipur","Meerut","Mehkar","Mahemdabad","Memari","Merta City","Mhaswad","Mhow Cantonment","Mhowgaon","Mihijam","Mira-Bhayandar","Mirganj","Miryalaguda","Modasa","Modinagar","Moga","Mohali","Mokameh","Mokokchung","Monoharpur","Moradabad","Morena","Morinda","Morshi","Morvi","Motihari","Motipur","Mount Abu","Mudalagi","Mudabidri","Muddebihal","Mudhol","Mukerian","Mukhed","Muktsar","Mul","Mulbagal","Multai","Greater Mumbai","Mundi","Mumbai","Mundargi","Mungeli","Munger","Murliganj","Murshidabad","Murtijapur","Murwara","Musabani","Mussoorie","Muvattupuzha","Muzaffarpur","Nabadwip","Nabarangapur","Nabha","Nadbai","Nadiad","Nagaon","Nagapattinam","Nagar","Nagari","Nagarkurnool","Nagaur","Nagda","Nagercoil","Nagina","Nagla","Nagpur","Nahan","Naharlagun","Naidupet","Naihati","Naila Janjgir","Nainital","Nainpur","Najibabad","Nakodar","Nakur","Nalbari","Namagiripettai","Namakkal","Nanded-Waghala","Nandgaon","Nandivaram-Guduvancheri","Nandura","Nandurbar","Nandyal","Nangal","Nanjangud","Nanjikottai","Nanpara","Narasapuram","Narasaraopet","Naraura","Narayanpet","Nargund","Narkatiaganj","Narkhed","Narnaul","Narsinghgarh","Narsinghgarh","Narsipatnam","Narwana","Nashik","Nasirabad","Natham","Nathdwara","Naugachhia","Naugawan Sadat","Nautanwa","Navalgund","Navi Mumbai","Navsari","Nawabganj","Nawada","Nawanshahr","Nawapur","Nedumangad","Neem-Ka-Thana","Neemuch","Nehtaur","Nelamangala","Nellikuppam","Nellore","Nepanagar","New Delhi","Neyveli (TS)","Neyyattinkara","Nidadavole","Nilanga","Nilambur","Nimbahera","Nirmal","Niwari","Niwai","Nizamabad","Nohar","Noida","Nokha","Nokha","Nongstoin","Noorpur","North Lakhimpur","Nowgong","Nowrozabad (Khodargama)","Nuzvid","O' Valley","Oddanchatram","Obra","Ongole","Orai","Osmanabad","Ottappalam","Ozar","P.N.Patti","Pachora","Pachore","Pacode","Padmanabhapuram","Padra","Padrauna","Paithan","Pakaur","Palacole","Palai","Palakkad","Palani","Palanpur","Palasa Kasibugga","Palghar","Pali","Pali","Palia Kalan","Palitana","Palladam","Pallapatti","Pallikonda","Palwal","Palwancha","Panagar","Panagudi","Panaji","Panamattom","Panchkula","Panchla","Pandharkaoda","Pandharpur","Pandhurna","Pandua","Panipat","Panna","Panniyannur","Panruti","Panvel","Pappinisseri","Paradip","Paramakudi","Parangipettai","Parasi","Paravoor","Parbhani","Pardi","Parlakhemundi","Parli","Partur","Parvathipuram","Pasan","Paschim Punropara","Pasighat","Patan","Pathanamthitta","Pathankot","Pathardi","Pathri","Patiala","Patna","Pattran","Patratu","Pattamundai","Patti","Pattukkottai","Patur","Pauni","Pauri","Pavagada","Pedana","Peddapuram","Pehowa","Pen","Perambalur","Peravurani","Peringathur","Perinthalmanna","Periyakulam","Periyasemur","Pernampattu","Perumbavoor","Petlad","Phagwara","Phalodi","Phaltan","Phillaur","Phulabani","Phulera","Phulpur","Phusro","Pihani","Pilani","Pilibanga","Pilibhit","Pilkhuwa","Pindwara","Pinjore","Pipar City","Pipariya","Piro","Piriyapatna","Pithampur","Pithapuram","Pithoragarh","Pollachi","Polur","Pondicherry","Ponnani","Ponneri","Ponnur","Porbandar","Porsa","Port Blair","Powayan","Prantij","Pratapgarh","Pratapgarh","Prithvipur","Proddatur","Pudukkottai","Pudupattinam","Pukhrayan","Pulgaon","Puliyankudi","Punalur","Punch","Pune","Punjaipugalur","Punganur","Puranpur","Purna","Puri","Purnia","Purquazi","Purulia","Purwa","Pusad","Puttur","Puthuppally","Puttur","Qadian","Koyilandy","Rabkavi Banhatti","Radhanpur","Rae Bareli","Rafiganj","Raghogarh-Vijaypur","Raghunathpur","Raghunathganj","Rahatgarh","Rahuri","Raayachuru","Raiganj","Raigarh","Ranebennuru","Ranipet","Raikot","Raipur","Rairangpur","Raisen","Raisinghnagar","Rajagangapur","Rajahmundry","Rajakhera","Rajaldesar","Rajam","Rajampet","Rajapalayam","Rajauri","Rajgarh (Alwar)","Rajgarh (Churu)","Rajgarh","Rajgir","Rajkot","Rajnandgaon","Rajpipla","Rajpura","Rajsamand","Rajula","Rajura","Ramachandrapuram","Ramagundam","Ramanagaram","Ramanathapuram","Ramdurg","Rameshwaram","Ramganj Mandi","Ramgarh","Ramngarh","Ramnagar","Ramnagar","Rampur","Rampur Maniharan","Rampur Maniharan","Rampura Phul","Rampurhat","Ramtek","Ranaghat","Ranavav","Ranchi","Rangia","Rania","Ranibennur","Rapar","Rasipuram","Rasra","Ratangarh","Rath","Ratia","Ratlam","Ratnagiri","Rau","Raurkela","Raver","Rawatbhata","Rawatsar","Raxaul Bazar","Rayachoti","Rayadurg","Rayagada","Reengus","Rehli","Renigunta","Renukoot","Reoti","Repalle","Revelganj","Rewa","Rewari","Rishikesh","Risod","Robertsganj","Robertson Pet","Rohtak","Ron","Roorkee","Rosera","Rudauli","Rudrapur","Rudrapur","Rupnagar","Sabalgarh","Sadabad","Sadalagi","Sadasivpet","Sadri","Sadulshahar","Sadulpur","Safidon","Safipur","Sagar","Sagara","Sagwara","Saharanpur","Saharsa","Sahaspur","Sahaswan","Sahawar","Sahibganj","Sahjanwa","Saidpur","Saiha","Sailu","Sainthia","Sakaleshapura","Sakti","Salaya","Salem","Salur","Samalkha","Samalkot","Samana","Samastipur","Sambalpur","Sambhal","Sambhar","Samdhan","Samthar","Sanand","Sanawad","Sanchore","Sarsod","Sindagi","Sandi","Sandila","Sanduru","Sangamner","Sangareddy","Sangaria","Sangli","Sangole","Sangrur","Sankarankoil","Sankari","Sankeshwara","Santipur","Sarangpur","Sardarshahar","Sardhana","Sarni","Sasaram","Sasvad","Satana","Satara","Satna","Sathyamangalam","Sattenapalle","Sattur","Saunda","Saundatti-Yellamma","Sausar","Savarkundla","Savanur","Savner","Sawai Madhopur","Sawantwadi","Sedam","Sehore","Sendhwa","Seohara","Seoni","Seoni-Malwa","Hardoi","Shahabad","Rampur","Shahade","Shahbad","Shahdol","Shahganj","Shahjahanpur","Shahpur","Shahpura","Shajapur","Shamgarh","Shamli","Shamsabad, Agra","Shamsabad", "Farrukhabad","Shegaon","Sheikhpura","Shendurjana","Shenkottai","Sheoganj","Sheohar","Sheopur","Sherghati","Sherkot","Shiggaon","Shikaripur","Shikarpur, Bulandshahr","Shikohabad","Shillong","Shimla","Shivamogga","Shirdi","Shirpur-Warwade","Shirur","Shishgarh","Shivpuri","Sholavandan","Sholingur","Shoranur","Surapura","Shrigonda","Shrirampur","Shrirangapattana","Shujalpur","Siana","Sibsagar","Siddipet","Sidhi","Sidhpur","Sidlaghatta","Sihor","Sihora","Sikanderpur","Sikandra Rao","Sikandrabad","Sikar","Silao","Silapathar","Silchar","Siliguri","Sillod","Silvassa","Simdega","Sindhagi","Sindhnur","Singrauli","Sinnar","Sira","Sircilla","Sirhind Fatehgarh Sahib","Sirkali","Sirohi","Sironj","Sirsa","Sirsaganj","Sirsi","Sirsi","Siruguppa","Sitamarhi","Sitapur","Sitarganj","Sivaganga","Sivagiri","Sivakasi","Siwan","Sohagpur","Sohna","Sojat","Solan","Solapur","Sonamukhi","Sonepur","Songadh","Sonipat","Sopore","Soro","Soron","Soyagaon","Sri Madhopur","Srikakulam","Srikalahasti","Srinagar","Srinagar","Srinivaspur","Srisailam Project (Right Flank Colony) Township","Srirampore","Srivilliputhur","Suar","Sugauli","Sujangarh","Sujanpur","Sultanganj","Sullurpeta","Sultanpur","Sumerpur","Sumerpur","Sunabeda","Sunam","Sundargarh","Sundarnagar","Supaul","Surandai","Surat","Suratgarh","Suri","Suriyampalayam","Suryapet","Tadepalligudem","Tadpatri","Taki","Talaja","Talcher","Talegaon Dabhade","Talikota","Taliparamba","Talode","Talwara","Tamluk","Tanda","Tandur","Tanuku","Tarakeswar","Tarana","Taranagar","Taraori","Tarbha","Tarikere","Tarn Taran","Tasgaon","Tehri","Tekkalakote","Tenali","Tenkasi","Tenu dam-cum-Kathhara","Terdal","Tezpur","Thakurdwara","Thammampatti","Thana Bhawan","Thane","Thanesar","Thangadh","Thanjavur","Tharad","Tharamangalam","Tharangambadi","Theni Allinagaram","Thirumangalam","Thirupuvanam","Thiruthuraipoondi","Thiruvalla","Thiruvallur","Thiruvananthapuram","Thiruvarur","Thodupuzha","Thoubal","Thrissur","Thuraiyur","Tikamgarh","Tilda Newra","Tilhar","Talikota","Tindivanam","Tinsukia","Tiptur","Tirora","Tiruchendur","Tiruchengode","Tiruchirappalli","Tirukalukundram","Tirukkoyilur","Tirunelveli","Tirupathur","Tirupathur","Tirupati","Tiruppur","Tirur","Tiruttani","Tiruvannamalai","Tiruvethipuram","Tiruvuru","Tirwaganj","Titlagarh","Tittakudi","Todabhim","Todaraisingh","Tohana","Tonk","Tuensang","Tuljapur","Tulsipur","Tumkur","Tumsar","Tundla","Tuni","Tura","Uchgaon","Udaipur","Udaipur","Udaipurwati","Udgir","Udhagamandalam","Udhampur","Udumalaipettai","Udupi","Ujhani","Ujjain","Umarga","Umaria","Umarkhed","Umbergaon","Umred","Umreth","Una","Unjha","Unnamalaikadai","Unnao","Upleta","Uran","Uran Islampur","Uravakonda","Urmar Tanda","Usilampatti","Uthamapalayam","Uthiramerur","Utraula","Vadakkuvalliyur","Vadalur","Vadgaon Kasba","Vadipatti","Vadnagar","Vadodara","Vaijapur","Vaikom","Valparai","Valsad","Vandavasi","Vaniyambadi","Vapi","Vapi","Varanasi","Varkala","Vasai-Virar","Vatakara","Vedaranyam","Vellakoil","Vellore","Venkatagiri","Veraval","Vidisha","Vijainagar, Ajmer","Vijapur","Vijaypur","Vijayapura","Vijayawada","Vikarabad","Vikramasingapuram","Viluppuram","Vinukonda","Viramgam","Virudhachalam","Virudhunagar","Visakhapatnam","Visnagar","Viswanatham","Vita","Vizianagaram","Vrindavan","Vyara","Wadgaon Road","Wadhwan","Wadi","Wai","Wanaparthy","Wani","Wankaner","Wara Seoni","Warangal","Wardha","Warhapur","Warisaliganj","Warora","Warud","Washim","Wokha","Yadgir","Yamunanagar","Yanam","Yavatmal","Yawal","Yellandu","Yemmiganur","Yerraguntla","Yevla","Zaidpur","Zamania","Zira","Zirakpur","Zunheboto"];

autocomplete(document.getElementById("locationgets"), countries);
autocomplete(document.getElementById("locationgetsmobile"), countries);
autocomplete(document.getElementById("locationgetsmob2"), countries);
autocomplete(document.getElementById("locationgets2"), countries);
