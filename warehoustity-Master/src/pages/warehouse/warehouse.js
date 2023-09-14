import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout/Layout";
import {
  searchWarehouse,
  warehouseFilterByType,
  warehouseByPage,
  filterofwarehouse,
} from "../../store/actions/warehouseAction";
import Pagination from "react-js-pagination";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WarehouseList from "../../wrapper/customer/WH/WarehouseList";
import { CardLoader } from "../../components/helper/CustomLoader";
import Maps from "./Maps";
// import BreadcrumbLayout from "../../layout/BreadcrumbLayout";
import ShopColor from "./shopColor";
import { favoriteIds } from "../../store/actions/customer/favoriteAction";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import StateList from "../../json/pincode.json";
import ContactForm from "../../components/helper/ContactForm";
import { itOfficeData, mhOfficeData, saftySecurity } from "../../json/dropdownData";

const Warehouse = () => {
  const myRefname = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [filterTag, setFilterTag] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };
  const handleClick2 = () => {
    // myRefname.current.focus();
    myRefname.current.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    );
  };
  const [advanceSearch, setadvanceSearch] = useState({
    state: "",
    city: "",
    "Floor Type": "",
    Rack: "",
    "Parking Area": "",
    "IT & Office Infra": "",
    "MH Infra": "",
    "Safety & Security": "",
    "Total Area": "",
    "Total Available Space": "",
  });
  const handleChange5 = (name) => (event) => {
    setadvanceSearch({
      ...advanceSearch,
      error: false,
      [name]: event.target.value,
    });
  };

  const items = useSelector((state) => state.WAREHOUSEINFO);
  // const[selectedvalue,setselectedvalue]=useState(null)
  const pageCount = new URLSearchParams(window.location.search).get("page");
  const homeLocation = new URLSearchParams(window.location.search).get(
    "location"
  );
  const homeTotalArea = new URLSearchParams(window.location.search).get(
    "totalArea"
  );
  const homePallet = new URLSearchParams(window.location.search).get("pallet");
  const warehouseType = new URLSearchParams(window.location.search).get(
    "warehouseType"
  );
  const filterType = new URLSearchParams(window.location.search).get(
    "filterType"
  );

  var stateArr = new Set();
  StateList.map((state) => {
    stateArr.add(state.stateName);
    return state;
  });

  const options = Array.from(stateArr).map((stateObj, index) => {
    return { id: index, name: stateObj };
  });

  const options1 = [
    { value: "0", label: "Select State" },

    { value: "1", label: "Andaman & Nicobar" },
    { value: "2", label: "Andhra Pradesh" },
    { value: "3", label: "Arunachal Pradesh" },
    { value: "4", label: "Assam" },
    { value: "5", label: "Bihar" },
    { value: "6", label: "Chandigarh" },
    { value: "7", label: "Chhattisgarh" },
    { value: "8", label: "Dadra & Nagar Haveli" },
    { value: "9", label: "Daman & Diu" },
    { value: "10", label: "Delhi" },
    { value: "11", label: "Goa" },
    { value: "12", label: "Gujarat" },
    { value: "13", label: "Haryana" },
    { value: "14", label: "Himachal Pradesh" },
    { value: "15", label: "Jammu & Kashmir" },
    { value: "16", label: "Jharkhand" },
    { value: "17", label: "Karnataka" },
    { value: "18", label: "Kerala" },
    { value: "19", label: "Lakshadweep" },
    { value: "20", label: "Madhya Pradesh" },
    { value: "21", label: "Maharashtra" },
    { value: "22", label: "Manipur" },
    { value: "23", label: "Meghalaya" },
    { value: "24", label: "Mizoram" },
    { value: "25", label: "Nagaland" },
    { value: "26", label: "Orissa" },
    { value: "27", label: "Pondicherry" },
    { value: "28", label: "Punjab" },
    { value: "29", label: "Rajasthan" },
    { value: "30", label: "Sikkim" },
    { value: "31", label: "Tamil Nadu" },
    { value: "32", label: "Tripura" },
    { value: "33", label: "Uttar Pradesh" },
    { value: "34", label: "Uttaranchal" },
    { value: "35", label: "West Bengal" },
  ];
  const [optioncity, setoptioncity] = useState([
    {
      value: 0,
      label: "Select City",
    },
  ]);
  const handleChange555 = (event) => {
    setoptioncity([]);
    setadvanceSearch({
      ...advanceSearch,
      state: event.target.value,
    });
    console.log("dsds", searchForm);
    var productIndex = options1.findIndex(
      (x) => x.label === event.target.value
    );
    var options3 = [
      {
        value: 0,
        label: "Select City",
      },
    ];
    var city_arr = s_a[productIndex].split("|");
    for (var i = 0; i < city_arr.length; i++) {
      options3.push({
        value: city_arr[i],
        label: city_arr[i],
      });
    }
    setoptioncity(options3);
  };
  var s_a = [];
  s_a[0] = "";
  s_a[1] =
    " Alipur | Andaman Island | Anderson Island | Arainj-Laka-Punga | Austinabad | Bamboo Flat | Barren Island | Beadonabad | Betapur | Bindraban | Bonington | Brookesabad | Cadell Point | Calicut | Chetamale | Cinque Islands | Defence Island | Digilpur | Dolyganj | Flat Island | Geinyale | Great Coco Island | Haddo | Havelock Island | Henry Lawrence Island | Herbertabad | Hobdaypur | Ilichar | Ingoie | Inteview Island | Jangli Ghat | Jhon Lawrence Island | Karen | Kartara | KYD Islannd | Landfall Island | Little Andmand | Little Coco Island | Long Island | Maimyo | Malappuram | Manglutan | Manpur | Mitha Khari | Neill Island | Nicobar Island | North Brother Island | North Passage Island | North Sentinel Island | Nothen Reef Island | Outram Island | Pahlagaon | Palalankwe | Passage Island | Phaiapong | Phoenix Island | Port Blair | Preparis Island | Protheroepur | Rangachang | Rongat | Rutland Island | Sabari | Saddle Peak | Shadipur | Smith Island | Sound Island | South Sentinel Island | Spike Island | Tarmugli Island | Taylerabad | Titaije | Toibalawe | Tusonabad | West Island | Wimberleyganj | Yadita";
  s_a[2] =
    " Achampet | Adilabad | Adoni | Alampur | Allagadda | Alur | Amalapuram | Amangallu | Anakapalle | Anantapur | Andole | Araku | Armoor | Asifabad | Aswaraopet | Atmakur | B. Kothakota | Badvel | Banaganapalle | Bandar | Bangarupalem | Banswada | Bapatla | Bellampalli | Bhadrachalam | Bhainsa | Bheemunipatnam | Bhimadole | Bhimavaram | Bhongir | Bhooragamphad | Boath | Bobbili | Bodhan | Chandoor | Chavitidibbalu | Chejerla | Chepurupalli | Cherial | Chevella | Chinnor | Chintalapudi | Chintapalle | Chirala | Chittoor | Chodavaram | Cuddapah | Cumbum | Darsi | Devarakonda | Dharmavaram | Dichpalli | Divi | Donakonda | Dronachalam | East Godavari | Eluru | Eturnagaram | Gadwal | Gajapathinagaram | Gajwel | Garladinne | Giddalur | Godavari | Gooty | Gudivada | Gudur | Guntur | Hindupur | Hunsabad | Huzurabad | Huzurnagar | Hyderabad | Ibrahimpatnam | Jaggayyapet | Jagtial | Jammalamadugu | Jangaon | Jangareddygudem | Jannaram | Kadiri | Kaikaluru | Kakinada | Kalwakurthy | Kalyandurg | Kamalapuram | Kamareddy | Kambadur | Kanaganapalle | Kandukuru | Kanigiri | Karimnagar | Kavali | Khammam | Khanapur (AP) | Kodangal | Koduru | Koilkuntla | Kollapur | Kothagudem | Kovvur | Krishna | Krosuru | Kuppam | Kurnool | Lakkireddipalli | Madakasira | Madanapalli | Madhira | Madnur | Mahabubabad | Mahabubnagar | Mahadevapur | Makthal | Mancherial | Mandapeta | Mangalagiri | Manthani | Markapur | Marturu | Medachal | Medak | Medarmetla | Metpalli | Mriyalguda | Mulug | Mylavaram | Nagarkurnool | Nalgonda | Nallacheruvu | Nampalle | Nandigama | Nandikotkur | Nandyal | Narasampet | Narasaraopet | Narayanakhed | Narayanpet | Narsapur | Narsipatnam | Nazvidu | Nelloe | Nellore | Nidamanur | Nirmal | Nizamabad | Nuguru | Ongole | Outsarangapalle | Paderu | Pakala | Palakonda | Paland | Palmaneru | Pamuru | Pargi | Parkal | Parvathipuram | Pathapatnam | Pattikonda | Peapalle | Peddapalli | Peddapuram | Penukonda | Piduguralla | Piler | Pithapuram | Podili | Polavaram | Prakasam | Proddatur | Pulivendla | Punganur | Putturu | Rajahmundri | Rajampeta | Ramachandrapuram | Ramannapet | Rampachodavaram | Rangareddy | Rapur | Rayachoti | Rayadurg | Razole | Repalle | Saluru | Sangareddy | Sathupalli | Sattenapalle | Satyavedu | Shadnagar | Siddavattam | Siddipet | Sileru | Sircilla | Sirpur Kagaznagar | Sodam | Sompeta | Srikakulam | Srikalahasthi | Srisailam | Srungavarapukota | Sudhimalla | Sullarpet | Tadepalligudem | Tadipatri | Tanduru | Tanuku | Tekkali | Tenali | Thungaturthy | Tirivuru | Tirupathi | Tuni | Udaygiri | Ulvapadu | Uravakonda | Utnor | V.R. Puram | Vaimpalli | Vayalpad | Venkatgiri | Venkatgirikota | Vijayawada | Vikrabad | Vinjamuru | Vinukonda | Visakhapatnam | Vizayanagaram | Vizianagaram | Vuyyuru | Wanaparthy | Warangal | Wardhannapet | Yelamanchili | Yelavaram | Yeleswaram | Yellandu | Yellanuru | Yellareddy | Yerragondapalem | Zahirabad ";
  s_a[3] =
    " Along | Anini | Anjaw | Bameng | Basar | Changlang | Chowkhem | Daporizo | Dibang Valley | Dirang | Hayuliang | Huri | Itanagar | Jairampur | Kalaktung | Kameng | Khonsa | Kolaring | Kurung Kumey | Lohit | Lower Dibang Valley | Lower Subansiri | Mariyang | Mechuka | Miao | Nefra | Pakkekesang | Pangin | Papum Pare | Passighat | Roing | Sagalee | Seppa | Siang | Tali | Taliha | Tawang | Tezu | Tirap | Tuting | Upper Siang | Upper Subansiri | Yiang Kiag ";
  s_a[4] =
    " Abhayapuri | Baithalangshu | Barama | Barpeta Road | Bihupuria | Bijni | Bilasipara | Bokajan | Bokakhat | Boko | Bongaigaon | Cachar | Cachar Hills | Darrang | Dhakuakhana | Dhemaji | Dhubri | Dibrugarh | Digboi | Diphu | Goalpara | Gohpur | Golaghat | Guwahati | Hailakandi | Hajo | Halflong | Hojai | Howraghat | Jorhat | Kamrup | Karbi Anglong | Karimganj | Kokarajhar | Kokrajhar | Lakhimpur | Maibong | Majuli | Mangaldoi | Mariani | Marigaon | Moranhat | Morigaon | Nagaon | Nalbari | Rangapara | Sadiya | Sibsagar | Silchar | Sivasagar | Sonitpur | Tarabarihat | Tezpur | Tinsukia | Udalgiri | Udalguri | UdarbondhBarpeta";
  s_a[5] =
    " Adhaura | Amarpur | Araria | Areraj | Arrah | Arwal | Aurangabad | Bagaha | Banka | Banmankhi | Barachakia | Barauni | Barh | Barosi | Begusarai | Benipatti | Benipur | Bettiah | Bhabhua | Bhagalpur | Bhojpur | Bidupur | Biharsharif | Bikram | Bikramganj | Birpur | Buxar | Chakai | Champaran | Chapara | Dalsinghsarai | Danapur | Darbhanga | Daudnagar | Dhaka | Dhamdaha | Dumraon | Ekma | Forbesganj | Gaya | Gogri | Gopalganj | H.Kharagpur | Hajipur | Hathua | Hilsa | Imamganj | Jahanabad | Jainagar | Jamshedpur | Jamui | Jehanabad | Jhajha | Jhanjharpur | Kahalgaon | Kaimur (Bhabua) | Katihar | Katoria | Khagaria | Kishanganj | Korha | Lakhisarai | Madhepura | Madhubani | Maharajganj | Mahua | Mairwa | Mallehpur | Masrakh | Mohania | Monghyr | Motihari | Motipur | Munger | Muzaffarpur | Nabinagar | Nalanda | Narkatiaganj | Naugachia | Nawada | Pakribarwan | Pakridayal | Patna | Phulparas | Piro | Pupri | Purena | Purnia | Rafiganj | Rajauli | Ramnagar | Raniganj | Raxaul | Rohtas | Rosera | S.Bakhtiarpur | Saharsa | Samastipur | Saran | Sasaram | Seikhpura | Sheikhpura | Sheohar | Sherghati | Sidhawalia | Singhwara | Sitamarhi | Siwan | Sonepur | Supaul | Thakurganj | Triveniganj | Udakishanganj | Vaishali | Wazirganj";
  s_a[6] = " Chandigarh | Mani Marja";
  s_a[7] =
    " Ambikapur | Antagarh | Arang | Bacheli | Bagbahera | Bagicha | Baikunthpur | Balod | Balodabazar | Balrampur | Barpalli | Basana | Bastanar | Bastar | Bderajpur | Bemetara | Berla | Bhairongarh | Bhanupratappur | Bharathpur | Bhatapara | Bhilai | Bhilaigarh | Bhopalpatnam | Bijapur | Bilaspur | Bodla | Bokaband | Chandipara | Chhinagarh | Chhuriakala | Chingmut | Chuikhadan | Dabhara | Dallirajhara | Dantewada | Deobhog | Dhamda | Dhamtari | Dharamjaigarh | Dongargarh | Durg | Durgakondal | Fingeshwar | Gariaband | Garpa | Gharghoda | Gogunda | Ilamidi | Jagdalpur | Janjgir | Janjgir-Champa | Jarwa | Jashpur | Jashpurnagar | Kabirdham-Kawardha | Kanker | Kasdol | Kathdol | Kathghora | Kawardha | Keskal | Khairgarh | Kondagaon | Konta | Korba | Korea | Kota | Koyelibeda | Kuakunda | Kunkuri | Kurud | Lohadigundah | Lormi | Luckwada | Mahasamund | Makodi | Manendragarh | Manpur | Marwahi | Mohla | Mungeli | Nagri | Narainpur | Narayanpur | Neora | Netanar | Odgi | Padamkot | Pakhanjur | Pali | Pandaria | Pandishankar | Parasgaon | Pasan | Patan | Pathalgaon | Pendra | Pratappur | Premnagar | Raigarh | Raipur | Rajnandgaon | Rajpur | Ramchandrapur | Saraipali | Saranggarh | Sarona | Semaria | Shakti | Sitapur | Sukma | Surajpur | Surguja | Tapkara | Toynar | Udaipur | Uproda | Wadrainagar";
  s_a[8] =
    " Amal | Amli | Bedpa | Chikhli | Dadra & Nagar Haveli | Dahikhed | Dolara | Galonda | Kanadi | Karchond | Khadoli | Kharadpada | Kherabari | Kherdi | Kothar | Luari | Mashat | Rakholi | Rudana | Saili | Sili | Silvassa | Sindavni | Udva | Umbarkoi | Vansda | Vasona | Velugam ";
  s_a[9] =
    " Brancavare | Dagasi | Daman | Diu | Magarvara | Nagwa | Pariali | Passo Covo ";
  s_a[10] =
    " Central Delhi | East Delhi | New Delhi | North Delhi | North East Delhi | North West Delhi | South Delhi | South West Delhi | West Delhi ";
  s_a[11] =
    " Canacona | Candolim | Chinchinim | Cortalim | Goa | Jua | Madgaon | Mahem | Mapuca | Marmagao | Panji | Ponda | Sanvordem | Terekhol ";
  s_a[12] =
    " Ahmedabad | Ahwa | Amod | Amreli | Anand | Anjar | Ankaleshwar | Babra | Balasinor | Banaskantha | Bansada | Bardoli | Bareja | Baroda | Barwala | Bayad | Bhachav | Bhanvad | Bharuch | Bhavnagar | Bhiloda | Bhuj | Billimora | Borsad | Botad | Chanasma | Chhota Udaipur | Chotila | Dabhoi | Dahod | Damnagar | Dang | Danta | Dasada | Dediapada | Deesa | Dehgam | Deodar | Devgadhbaria | Dhandhuka | Dhanera | Dharampur | Dhari | Dholka | Dhoraji | Dhrangadhra | Dhrol | Dwarka | Fortsongadh | Gadhada | Gandhi Nagar | Gariadhar | Godhra | Gogodar | Gondal | Halol | Halvad | Harij | Himatnagar | Idar | Jambusar | Jamjodhpur | Jamkalyanpur | Jamnagar | Jasdan | Jetpur | Jhagadia | Jhalod | Jodia | Junagadh | Junagarh | Kalawad | Kalol | Kapad Wanj | Keshod | Khambat | Khambhalia | Khavda | Kheda | Khedbrahma | Kheralu | Kodinar | Kotdasanghani | Kunkawav | Kutch | Kutchmandvi | Kutiyana | Lakhpat | Lakhtar | Lalpur | Limbdi | Limkheda | Lunavada | M.M.Mangrol | Mahuva | Malia-Hatina | Maliya | Malpur | Manavadar | Mandvi | Mangrol | Mehmedabad | Mehsana | Miyagam | Modasa | Morvi | Muli | Mundra | Nadiad | Nakhatrana | Nalia | Narmada | Naswadi | Navasari | Nizar | Okha | Paddhari | Padra | Palanpur | Palitana | Panchmahals | Patan | Pavijetpur | Porbandar | Prantij | Radhanpur | Rahpar | Rajaula | Rajkot | Rajpipla | Ranavav | Sabarkantha | Sanand | Sankheda | Santalpur | Santrampur | Savarkundla | Savli | Sayan | Sayla | Shehra | Sidhpur | Sihor | Sojitra | Sumrasar | Surat | Surendranagar | Talaja | Thara | Tharad | Thasra | Una-Diu | Upleta | Vadgam | Vadodara | Valia | Vallabhipur | Valod | Valsad | Vanthali | Vapi | Vav | Veraval | Vijapur | Viramgam | Visavadar | Visnagar | Vyara | Waghodia | Wankaner ";
  s_a[13] =
    " Adampur Mandi | Ambala | Assandh | Bahadurgarh | Barara | Barwala | Bawal | Bawanikhera | Bhiwani | Charkhidadri | Cheeka | Chhachrauli | Dabwali | Ellenabad | Faridabad | Fatehabad | Ferojpur Jhirka | Gharaunda | Gohana | Gurgaon | Hansi | Hisar | Jagadhari | Jatusana | Jhajjar | Jind | Julana | Kaithal | Kalanaur | Kalanwali | Kalka | Karnal | Kosli | Kurukshetra | Loharu | Mahendragarh | Meham | Mewat | Mohindergarh | Naraingarh | Narnaul | Narwana | Nilokheri | Nuh | Palwal | Panchkula | Panipat | Pehowa | Ratia | Rewari | Rohtak | Safidon | Sirsa | Siwani | Sonipat | Tohana | Tohsam | Yamunanagar ";
  s_a[14] =
    " Amb | Arki | Banjar | Bharmour | Bilaspur | Chamba | Churah | Dalhousie | Dehra Gopipur | Hamirpur | Jogindernagar | Kalpa | Kangra | Kinnaur | Kullu | Lahaul | Mandi | Nahan | Nalagarh | Nirmand | Nurpur | Palampur | Pangi | Paonta | Pooh | Rajgarh | Rampur Bushahar | Rohru | Shimla | Sirmaur | Solan | Spiti | Sundernagar | Theog | Udaipur | Una";
  s_a[15] =
    " Akhnoor | Anantnag | Badgam | Bandipur | Baramulla | Basholi | Bedarwah | Budgam | Doda | Gulmarg | Jammu | Kalakot | Kargil | Karnah | Kathua | Kishtwar | Kulgam | Kupwara | Leh | Mahore | Nagrota | Nobra | Nowshera | Nyoma | Padam | Pahalgam | Patnitop | Poonch | Pulwama | Rajouri | Ramban | Ramnagar | Reasi | Samba | Srinagar | Udhampur | Vaishno Devi ";
  s_a[16] =
    " Bagodar | Baharagora | Balumath | Barhi | Barkagaon | Barwadih | Basia | Bermo | Bhandaria | Bhawanathpur | Bishrampur | Bokaro | Bolwa | Bundu | Chaibasa | Chainpur | Chakardharpur | Chandil | Chatra | Chavparan | Daltonganj | Deoghar | Dhanbad | Dumka | Dumri | Garhwa | Garu | Ghaghra | Ghatsila | Giridih | Godda | Gomia | Govindpur | Gumla | Hazaribagh | Hunterganj | Ichak | Itki | Jagarnathpur | Jamshedpur | Jamtara | Japla | Jharmundi | Jhinkpani | Jhumaritalaiya | Kathikund | Kharsawa | Khunti | Koderma | Kolebira | Latehar | Lohardaga | Madhupur | Mahagama | Maheshpur Raj | Mandar | Mandu | Manoharpur | Muri | Nagarutatri | Nala | Noamundi | Pakur | Palamu | Palkot | Patan | Rajdhanwar | Rajmahal | Ramgarh | Ranchi | Sahibganj | Saraikela | Simaria | Simdega | Singhbhum | Tisri | Torpa ";
  s_a[17] =
    " Afzalpur | Ainapur | Aland | Alur | Anekal | Ankola | Arsikere | Athani | Aurad | Bableshwar | Badami | Bagalkot | Bagepalli | Bailhongal | Bangalore | Bangalore Rural | Bangarpet | Bantwal | Basavakalyan | Basavanabagewadi | Basavapatna | Belgaum | Bellary | Belthangady | Belur | Bhadravati | Bhalki | Bhatkal | Bidar | Bijapur | Biligi | Chadchan | Challakere | Chamrajnagar | Channagiri | Channapatna | Channarayapatna | Chickmagalur | Chikballapur | Chikkaballapur | Chikkanayakanahalli | Chikkodi | Chikmagalur | Chincholi | Chintamani | Chitradurga | Chittapur | Cowdahalli | Davanagere | Deodurga | Devangere | Devarahippargi | Dharwad | Doddaballapur | Gadag | Gangavathi | Gokak | Gowribdanpur | Gubbi | Gulbarga | Gundlupet | H.B.Halli | H.D. Kote | Haliyal | Hampi | Hangal | Harapanahalli | Hassan | Haveri | Hebri | Hirekerur | Hiriyur | Holalkere | Holenarsipur | Honnali | Honnavar | Hosadurga | Hosakote | Hosanagara | Hospet | Hubli | Hukkeri | Humnabad | Hungund | Hunsagi | Hunsur | Huvinahadagali | Indi | Jagalur | Jamkhandi | Jewargi | Joida | K.R. Nagar | Kadur | Kalghatagi | Kamalapur | Kanakapura | Kannada | Kargal | Karkala | Karwar | Khanapur | Kodagu | Kolar | Kollegal | Koppa | Koppal | Koratageri | Krishnarajapet | Kudligi | Kumta | Kundapur | Kundgol | Kunigal | Kurugodu | Kustagi | Lingsugur | Madikeri | Madugiri | Malavalli | Malur | Mandya | Mangalore | Manipal | Manvi | Mashal | Molkalmuru | Mudalgi | Muddebihal | Mudhol | Mudigere | Mulbagal | Mundagod | Mundargi | Murugod | Mysore | Nagamangala | Nanjangud | Nargund | Narsimrajapur | Navalgund | Nelamangala | Nimburga | Pandavapura | Pavagada | Puttur | Raibag | Raichur | Ramdurg | Ranebennur | Ron | Sagar | Sakleshpur | Salkani | Sandur | Saundatti | Savanur | Sedam | Shahapur | Shankarnarayana | Shikaripura | Shimoga | Shirahatti | Shorapur | Siddapur | Sidlaghatta | Sindagi | Sindhanur | Sira | Sirsi | Siruguppa | Somwarpet | Sorab | Sringeri | Sriniwaspur | Srirangapatna | Sullia | T. Narsipur | Tallak | Tarikere | Telgi | Thirthahalli | Tiptur | Tumkur | Turuvekere | Udupi | Virajpet | Wadi | Yadgiri | Yelburga | Yellapur ";
  s_a[18] =
    " Adimaly | Adoor | Agathy | Alappuzha | Alathur | Alleppey | Alwaye | Amini | Androth | Attingal | Badagara | Bitra | Calicut | Cannanore | Chetlet | Ernakulam | Idukki | Irinjalakuda | Kadamath | Kalpeni | Kalpetta | Kanhangad | Kanjirapally | Kannur | Karungapally | Kasargode | Kavarathy | Kiltan | Kochi | Koduvayur | Kollam | Kottayam | Kovalam | Kozhikode | Kunnamkulam | Malappuram | Mananthodi | Manjeri | Mannarghat | Mavelikkara | Minicoy | Munnar | Muvattupuzha | Nedumandad | Nedumgandam | Nilambur | Palai | Palakkad | Palghat | Pathaanamthitta | Pathanamthitta | Payyanur | Peermedu | Perinthalmanna | Perumbavoor | Punalur | Quilon | Ranni | Shertallai | Shoranur | Taliparamba | Tellicherry | Thiruvananthapuram | Thodupuzha | Thrissur | Tirur | Tiruvalla | Trichur | Trivandrum | Uppala | Vadakkanchery | Vikom | Wayanad ";
  s_a[19] =
    " Agatti Island | Bingaram Island | Bitra Island | Chetlat Island | Kadmat Island | Kalpeni Island | Kavaratti Island | Kiltan Island | Lakshadweep Sea | Minicoy Island | North Island | South Island ";
  s_a[20] =
    " Agar | Ajaigarh | Alirajpur | Amarpatan | Amarwada | Ambah | Anuppur | Arone | Ashoknagar | Ashta | Atner | Babaichichli | Badamalhera | Badarwsas | Badnagar | Badnawar | Badwani | Bagli | Baihar | Balaghat | Baldeogarh | Baldi | Bamori | Banda | Bandhavgarh | Bareli | Baroda | Barwaha | Barwani | Batkakhapa | Begamganj | Beohari | Berasia | Berchha | Betul | Bhainsdehi | Bhander | Bhanpura | Bhikangaon | Bhimpur | Bhind | Bhitarwar | Bhopal | Biaora | Bijadandi | Bijawar | Bijaypur | Bina | Birsa | Birsinghpur | Budhni | Burhanpur | Buxwaha | Chachaura | Chanderi | Chaurai | Chhapara | Chhatarpur | Chhindwara | Chicholi | Chitrangi | Churhat | Dabra | Damoh | Datia | Deori | Deosar | Depalpur | Dewas | Dhar | Dharampuri | Dindori | Gadarwara | Gairatganj | Ganjbasoda | Garoth | Ghansour | Ghatia | Ghatigaon | Ghorandogri | Ghughari | Gogaon | Gohad | Goharganj | Gopalganj | Gotegaon | Gourihar | Guna | Gunnore | Gwalior | Gyraspur | Hanumana | Harda | Harrai | Harsud | Hatta | Hoshangabad | Ichhawar | Indore | Isagarh | Itarsi | Jabalpur | Jabera | Jagdalpur | Jaisinghnagar | Jaithari | Jaitpur | Jaitwara | Jamai | Jaora | Jatara | Jawad | Jhabua | Jobat | Jora | Kakaiya | Kannod | Kannodi | Karanjia | Kareli | Karera | Karhal | Karpa | Kasrawad | Katangi | Katni | Keolari | Khachrod | Khajuraho | Khakner | Khalwa | Khandwa | Khaniadhana | Khargone | Khategaon | Khetia | Khilchipur | Khirkiya | Khurai | Kolaras | Kotma | Kukshi | Kundam | Kurwai | Kusmi | Laher | Lakhnadon | Lamta | Lanji | Lateri | Laundi | Maheshwar | Mahidpurcity | Maihar | Majhagwan | Majholi | Malhargarh | Manasa | Manawar | Mandla | Mandsaur | Manpur | Mauganj | Mawai | Mehgaon | Mhow | Morena | Multai | Mungaoli | Nagod | Nainpur | Narsingarh | Narsinghpur | Narwar | Nasrullaganj | Nateran | Neemuch | Niwari | Niwas | Nowgaon | Pachmarhi | Pandhana | Pandhurna | Panna | Parasia | Patan | Patera | Patharia | Pawai | Petlawad | Pichhore | Piparia | Pohari | Prabhapattan | Punasa | Pushprajgarh | Raghogarh | Raghunathpur | Rahatgarh | Raisen | Rajgarh | Rajpur | Ratlam | Rehli | Rewa | Sabalgarh | Sagar | Sailana | Sanwer | Sarangpur | Sardarpur | Satna | Saunsar | Sehore | Sendhwa | Seondha | Seoni | Seonimalwa | Shahdol | Shahnagar | Shahpur | Shajapur | Sheopur | Sheopurkalan | Shivpuri | Shujalpur | Sidhi | Sihora | Silwani | Singrauli | Sirmour | Sironj | Sitamau | Sohagpur | Sondhwa | Sonkatch | Susner | Tamia | Tarana | Tendukheda | Teonthar | Thandla | Tikamgarh | Timarani | Udaipura | Ujjain | Umaria | Umariapan | Vidisha | Vijayraghogarh | Waraseoni | Zhirnia ";
  s_a[21] =
    " Achalpur | Aheri | Ahmednagar | Ahmedpur | Ajara | Akkalkot | Akola | Akole | Akot | Alibagh | Amagaon | Amalner | Ambad | Ambejogai | Amravati | Arjuni Merogaon | Arvi | Ashti | Atpadi | Aurangabad | Ausa | Babhulgaon | Balapur | Baramati | Barshi Takli | Barsi | Basmatnagar | Bassein | Beed | Bhadrawati | Bhamregadh | Bhandara | Bhir | Bhiwandi | Bhiwapur | Bhokar | Bhokardan | Bhoom | Bhor | Bhudargad | Bhusawal | Billoli | Brahmapuri | Buldhana | Butibori | Chalisgaon | Chamorshi | Chandgad | Chandrapur | Chandur | Chanwad | Chhikaldara | Chikhali | Chinchwad | Chiplun | Chopda | Chumur | Dahanu | Dapoli | Darwaha | Daryapur | Daund | Degloor | Delhi Tanda | Deogad | Deolgaonraja | Deori | Desaiganj | Dhadgaon | Dhanora | Dharani | Dhiwadi | Dhule | Dhulia | Digras | Dindori | Edalabad | Erandul | Etapalli | Gadhchiroli | Gadhinglaj | Gaganbavada | Gangakhed | Gangapur | Gevrai | Ghatanji | Golegaon | Gondia | Gondpipri | Goregaon | Guhagar | Hadgaon | Hatkangale | Hinganghat | Hingoli | Hingua | Igatpuri | Indapur | Islampur | Jalgaon | Jalna | Jamkhed | Jamner | Jath | Jawahar | Jintdor | Junnar | Kagal | Kaij | Kalamb | Kalamnuri | Kallam | Kalmeshwar | Kalwan | Kalyan | Kamptee | Kandhar | Kankavali | Kannad | Karad | Karjat | Karmala | Katol | Kavathemankal | Kedgaon | Khadakwasala | Khamgaon | Khed | Khopoli | Khultabad | Kinwat | Kolhapur | Kopargaon | Koregaon | Kudal | Kuhi | Kurkheda | Kusumba | Lakhandur | Langa | Latur | Lonar | Lonavala | Madangad | Madha | Mahabaleshwar | Mahad | Mahagaon | Mahasala | Mahaswad | Malegaon | Malgaon | Malgund | Malkapur | Malsuras | Malwan | Mancher | Mangalwedha | Mangaon | Mangrulpur | Manjalegaon | Manmad | Maregaon | Mehda | Mekhar | Mohadi | Mohol | Mokhada | Morshi | Mouda | Mukhed | Mul | Mumbai | Murbad | Murtizapur | Murud | Nagbhir | Nagpur | Nahavara | Nanded | Nandgaon | Nandnva | Nandurbar | Narkhed | Nashik | Navapur | Ner | Newasa | Nilanga | Niphad | Omerga | Osmanabad | Pachora | Paithan | Palghar | Pali | Pandharkawada | Pandharpur | Panhala | Paranda | Parbhani | Parner | Parola | Parseoni | Partur | Patan | Pathardi | Pathari | Patoda | Pauni | Peint | Pen | Phaltan | Pimpalner | Pirangut | Poladpur | Pune | Pusad | Pusegaon | Radhanagar | Rahuri | Raigad | Rajapur | Rajgurunagar | Rajura | Ralegaon | Ramtek | Ratnagiri | Raver | Risod | Roha | Sakarwadi | Sakoli | Sakri | Salekasa | Samudrapur | Sangamner | Sanganeshwar | Sangli | Sangola | Sanguem | Saoner | Saswad | Satana | Satara | Sawantwadi | Seloo | Shahada | Shahapur | Shahuwadi | Shevgaon | Shirala | Shirol | Shirpur | Shirur | Shirwal | Sholapur | Shri Rampur | Shrigonda | Shrivardhan | Sillod | Sinderwahi | Sindhudurg | Sindkheda | Sindkhedaraja | Sinnar | Sironcha | Soyegaon | Surgena | Talasari | Talegaon S.Ji Pant | Taloda | Tasgaon | Thane | Tirora | Tiwasa | Trimbak | Tuljapur | Tumsar | Udgir | Umarkhed | Umrane | Umrer | Urlikanchan | Vaduj | Velhe | Vengurla | Vijapur | Vita | Wada | Wai | Walchandnagar | Wani | Wardha | Warlydwarud | Warora | Washim | Wathar | Yavatmal | Yawal | Yeola | Yeotmal ";
  s_a[22] =
    " Bishnupur | Chakpikarong | Chandel | Chattrik | Churachandpur | Imphal | Jiribam | Kakching | Kalapahar | Mao | Mulam | Parbung | Sadarhills | Saibom | Sempang | Senapati | Sochumer | Taloulong | Tamenglong | Thinghat | Thoubal | Ukhrul ";
  s_a[23] =
    " Amlaren | Baghmara | Cherrapunjee | Dadengiri | Garo Hills | Jaintia Hills | Jowai | Khasi Hills | Khliehriat | Mariang | Mawkyrwat | Nongpoh | Nongstoin | Resubelpara | Ri Bhoi | Shillong | Tura | Williamnagar";
  s_a[24] =
    " Aizawl | Champhai | Demagiri | Kolasib | Lawngtlai | Lunglei | Mamit | Saiha | Serchhip";
  s_a[25] =
    " Dimapur | Jalukie | Kiphire | Kohima | Mokokchung | Mon | Phek | Tuensang | Wokha | Zunheboto ";
  s_a[26] =
    " Anandapur | Angul | Anugul | Aska | Athgarh | Athmallik | Attabira | Bagdihi | Balangir | Balasore | Baleswar | Baliguda | Balugaon | Banaigarh | Bangiriposi | Barbil | Bargarh | Baripada | Barkot | Basta | Berhampur | Betanati | Bhadrak | Bhanjanagar | Bhawanipatna | Bhubaneswar | Birmaharajpur | Bisam Cuttack | Boriguma | Boudh | Buguda | Chandbali | Chhatrapur | Chhendipada | Cuttack | Daringbadi | Daspalla | Deodgarh | Deogarh | Dhanmandal | Dharamgarh | Dhenkanal | Digapahandi | Dunguripali | G. Udayagiri | Gajapati | Ganjam | Ghatgaon | Gudari | Gunupur | Hemgiri | Hindol | Jagatsinghapur | Jajpur | Jamankira | Jashipur | Jayapatna | Jeypur | Jharigan | Jharsuguda | Jujumura | Kalahandi | Kalimela | Kamakhyanagar | Kandhamal | Kantabhanji | Kantamal | Karanjia | Kashipur | Kendrapara | Kendujhar | Keonjhar | Khalikote | Khordha | Khurda | Komana | Koraput | Kotagarh | Kuchinda | Lahunipara | Laxmipur | M. Rampur | Malkangiri | Mathili | Mayurbhanj | Mohana | Motu | Nabarangapur | Naktideul | Nandapur | Narlaroad | Narsinghpur | Nayagarh | Nimapara | Nowparatan | Nowrangapur | Nuapada | Padampur | Paikamal | Palla Hara | Papadhandi | Parajang | Pardip | Parlakhemundi | Patnagarh | Pattamundai | Phiringia | Phulbani | Puri | Puruna Katak | R. Udayigiri | Rairakhol | Rairangpur | Rajgangpur | Rajkhariar | Rayagada | Rourkela | Sambalpur | Sohela | Sonapur | Soro | Subarnapur | Sunabeda | Sundergarh | Surada | T. Rampur | Talcher | Telkoi | Titlagarh | Tumudibandha | Udala | Umerkote ";
  s_a[27] =
    " Bahur | Karaikal | Mahe | Pondicherry | Purnankuppam | Valudavur | Villianur | Yanam ";
  s_a[28] =
    " Abohar | Ajnala | Amritsar | Balachaur | Barnala | Batala | Bathinda | Chandigarh | Dasua | Dinanagar | Faridkot | Fatehgarh Sahib | Fazilka | Ferozepur | Garhashanker | Goindwal | Gurdaspur | Guruharsahai | Hoshiarpur | Jagraon | Jalandhar | Jugial | Kapurthala | Kharar | Kotkapura | Ludhiana | Malaut | Malerkotla | Mansa | Moga | Muktasar | Nabha | Nakodar | Nangal | Nawanshahar | Nawanshahr | Pathankot | Patiala | Patti | Phagwara | Phillaur | Phulmandi | Quadian | Rajpura | Raman | Rayya | Ropar | Rupnagar | Samana | Samrala | Sangrur | Sardulgarh | Sarhind | SAS Nagar | Sultanpur Lodhi | Sunam | Tanda Urmar | Tarn Taran | Zira ";
  s_a[29] =
    " Abu Road | Ahore | Ajmer | Aklera | Alwar | Amber | Amet | Anupgarh | Asind | Aspur | Atru | Bagidora | Bali | Bamanwas | Banera | Bansur | Banswara | Baran | Bari | Barisadri | Barmer | Baseri | Bassi | Baswa | Bayana | Beawar | Begun | Behror | Bhadra | Bharatpur | Bhilwara | Bhim | Bhinmal | Bikaner | Bilara | Bundi | Chhabra | Chhipaborad | Chirawa | Chittorgarh | Chohtan | Churu | Dantaramgarh | Dausa | Deedwana | Deeg | Degana | Deogarh | Deoli | Desuri | Dhariawad | Dholpur | Digod | Dudu | Dungarpur | Dungla | Fatehpur | Gangapur | Gangdhar | Gerhi | Ghatol | Girwa | Gogunda | Hanumangarh | Hindaun | Hindoli | Hurda | Jahazpur | Jaipur | Jaisalmer | Jalore | Jhalawar | Jhunjhunu | Jodhpur | Kaman | Kapasan | Karauli | Kekri | Keshoraipatan | Khandar | Kherwara | Khetri | Kishanganj | Kishangarh | Kishangarhbas | Kolayat | Kota | Kotputli | Kotra | Kotri | Kumbalgarh | Kushalgarh | Ladnun | Ladpura | Lalsot | Laxmangarh | Lunkaransar | Mahuwa | Malpura | Malvi | Mandal | Mandalgarh | Mandawar | Mangrol | Marwar-Jn | Merta | Nadbai | Nagaur | Nainwa | Nasirabad | Nathdwara | Nawa | Neem Ka Thana | Newai | Nimbahera | Nohar | Nokha | Onli | Osian | Pachpadara | Pachpahar | Padampur | Pali | Parbatsar | Phagi | Phalodi | Pilani | Pindwara | Pipalda | Pirawa | Pokaran | Pratapgarh | Raipur | Raisinghnagar | Rajgarh | Rajsamand | Ramganj Mandi | Ramgarh | Rashmi | Ratangarh | Reodar | Rupbas | Sadulshahar | Sagwara | Sahabad | Salumber | Sanchore | Sangaria | Sangod | Sapotra | Sarada | Sardarshahar | Sarwar | Sawai Madhopur | Shahapura | Sheo | Sheoganj | Shergarh | Sikar | Sirohi | Siwana | Sojat | Sri Dungargarh | Sri Ganganagar | Sri Karanpur | Sri Madhopur | Sujangarh | Taranagar | Thanaghazi | Tibbi | Tijara | Todaraisingh | Tonk | Udaipur | Udaipurwati | Uniayara | Vallabhnagar | Viratnagar ";
  s_a[30] =
    " Barmiak | Be | Bhurtuk | Chhubakha | Chidam | Chubha | Chumikteng | Dentam | Dikchu | Dzongri | Gangtok | Gauzing | Gyalshing | Hema | Kerung | Lachen | Lachung | Lema | Lingtam | Lungthu | Mangan | Namchi | Namthang | Nanga | Nantang | Naya Bazar | Padamachen | Pakhyong | Pemayangtse | Phensang | Rangli | Rinchingpong | Sakyong | Samdong | Singtam | Siniolchu | Sombari | Soreng | Sosing | Tekhug | Temi | Tsetang | Tsomgo | Tumlong | Yangang | Yumtang ";
  s_a[31] =
    " Ambasamudram | Anamali | Arakandanallur | Arantangi | Aravakurichi | Ariyalur | Arkonam | Arni | Aruppukottai | Attur | Avanashi | Batlagundu | Bhavani | Chengalpattu | Chengam | Chennai | Chidambaram | Chingleput | Coimbatore | Courtallam | Cuddalore | Cumbum | Denkanikoitah | Devakottai | Dharampuram | Dharmapuri | Dindigul | Erode | Gingee | Gobichettipalayam | Gudalur | Gudiyatham | Harur | Hosur | Jayamkondan | Kallkurichi | Kanchipuram | Kangayam | Kanyakumari | Karaikal | Karaikudi | Karur | Keeranur | Kodaikanal | Kodumudi | Kotagiri | Kovilpatti | Krishnagiri | Kulithalai | Kumbakonam | Kuzhithurai | Madurai | Madurantgam | Manamadurai | Manaparai | Mannargudi | Mayiladuthurai | Mayiladutjurai | Mettupalayam | Metturdam | Mudukulathur | Mulanur | Musiri | Nagapattinam | Nagarcoil | Namakkal | Nanguneri | Natham | Neyveli | Nilgiris | Oddanchatram | Omalpur | Ootacamund | Ooty | Orathanad | Palacode | Palani | Palladum | Papanasam | Paramakudi | Pattukottai | Perambalur | Perundurai | Pollachi | Polur | Pondicherry | Ponnamaravathi | Ponneri | Pudukkottai | Rajapalayam | Ramanathapuram | Rameshwaram | Ranipet | Rasipuram | Salem | Sankagiri | Sankaran | Sathiyamangalam | Sivaganga | Sivakasi | Sriperumpudur | Srivaikundam | Tenkasi | Thanjavur | Theni | Thirumanglam | Thiruraipoondi | Thoothukudi | Thuraiyure | Tindivanam | Tiruchendur | Tiruchengode | Tiruchirappalli | Tirunelvelli | Tirupathur | Tirupur | Tiruttani | Tiruvallur | Tiruvannamalai | Tiruvarur | Tiruvellore | Tiruvettipuram | Trichy | Tuticorin | Udumalpet | Ulundurpet | Usiliampatti | Uthangarai | Valapady | Valliyoor | Vaniyambadi | Vedasandur | Vellore | Velur | Vilathikulam | Villupuram | Virudhachalam | Virudhunagar | Wandiwash | Yercaud ";
  s_a[32] =
    " Agartala | Ambasa | Bampurbari | Belonia | Dhalai | Dharam Nagar | Kailashahar | Kamal Krishnabari | Khopaiyapara | Khowai | Phuldungsei | Radha Kishore Pur | Tripura ";
  s_a[33] =
    " Achhnera | Agra | Akbarpur | Aliganj | Aligarh | Allahabad | Ambedkar Nagar | Amethi | Amiliya | Amroha | Anola | Atrauli | Auraiya | Azamgarh | Baberu | Badaun | Baghpat | Bagpat | Baheri | Bahraich | Ballia | Balrampur | Banda | Bansdeeh | Bansgaon | Bansi | Barabanki | Bareilly | Basti | Bhadohi | Bharthana | Bharwari | Bhogaon | Bhognipur | Bidhuna | Bijnore | Bikapur | Bilari | Bilgram | Bilhaur | Bindki | Bisalpur | Bisauli | Biswan | Budaun | Budhana | Bulandshahar | Bulandshahr | Capianganj | Chakia | Chandauli | Charkhari | Chhata | Chhibramau | Chirgaon | Chitrakoot | Chunur | Dadri | Dalmau | Dataganj | Debai | Deoband | Deoria | Derapur | Dhampur | Domariyaganj | Dudhi | Etah | Etawah | Faizabad | Farrukhabad | Fatehpur | Firozabad | Garauth | Garhmukteshwar | Gautam Buddha Nagar | Ghatampur | Ghaziabad | Ghazipur | Ghosi | Gonda | Gorakhpur | Gunnaur | Haidergarh | Hamirpur | Hapur | Hardoi | Harraiya | Hasanganj | Hasanpur | Hathras | Jalalabad | Jalaun | Jalesar | Jansath | Jarar | Jasrana | Jaunpur | Jhansi | Jyotiba Phule Nagar | Kadipur | Kaimganj | Kairana | Kaisarganj | Kalpi | Kannauj | Kanpur | Karchhana | Karhal | Karvi | Kasganj | Kaushambi | Kerakat | Khaga | Khair | Khalilabad | Kheri | Konch | Kumaon | Kunda | Kushinagar | Lalganj | Lalitpur | Lucknow | Machlishahar | Maharajganj | Mahoba | Mainpuri | Malihabad | Mariyahu | Math | Mathura | Mau | Maudaha | Maunathbhanjan | Mauranipur | Mawana | Meerut | Mehraun | Meja | Mirzapur | Misrikh | Modinagar | Mohamdabad | Mohamdi | Moradabad | Musafirkhana | Muzaffarnagar | Nagina | Najibabad | Nakur | Nanpara | Naraini | Naugarh | Nawabganj | Nighasan | Noida | Orai | Padrauna | Pahasu | Patti | Pharenda | Phoolpur | Phulpur | Pilibhit | Pitamberpur | Powayan | Pratapgarh | Puranpur | Purwa | Raibareli | Rampur | Ramsanehi Ghat | Rasara | Rath | Robertsganj | Sadabad | Safipur | Sagri | Saharanpur | Sahaswan | Sahjahanpur | Saidpur | Salempur | Salon | Sambhal | Sandila | Sant Kabir Nagar | Sant Ravidas Nagar | Sardhana | Shahabad | Shahganj | Shahjahanpur | Shikohabad | Shravasti | Siddharthnagar | Sidhauli | Sikandra Rao | Sikandrabad | Sitapur | Siyana | Sonbhadra | Soraon | Sultanpur | Tanda | Tarabganj | Tilhar | Unnao | Utraula | Varanasi | Zamania ";
  s_a[34] =
    " Almora | Bageshwar | Bhatwari | Chakrata | Chamoli | Champawat | Dehradun | Deoprayag | Dharchula | Dunda | Haldwani | Haridwar | Joshimath | Karan Prayag | Kashipur | Khatima | Kichha | Lansdown | Munsiari | Mussoorie | Nainital | Pantnagar | Partapnagar | Pauri Garhwal | Pithoragarh | Purola | Rajgarh | Ranikhet | Roorkee | Rudraprayag | Tehri Garhwal | Udham Singh Nagar | Ukhimath | Uttarkashi ";
  s_a[35] =
    " Adra | Alipurduar | Amlagora | Arambagh | Asansol | Balurghat | Bankura | Bardhaman | Basirhat | Berhampur | Bethuadahari | Birbhum | Birpara | Bishanpur | Bolpur | Bongoan | Bulbulchandi | Burdwan | Calcutta | Canning | Champadanga | Contai | Cooch Behar | Daimond Harbour | Dalkhola | Dantan | Darjeeling | Dhaniakhali | Dhuliyan | Dinajpur | Dinhata | Durgapur | Gangajalghati | Gangarampur | Ghatal | Guskara | Habra | Haldia | Harirampur | Harishchandrapur | Hooghly | Howrah | Islampur | Jagatballavpur | Jalpaiguri | Jhalda | Jhargram | Kakdwip | Kalchini | Kalimpong | Kalna | Kandi | Karimpur | Katwa | Kharagpur | Khatra | Krishnanagar | Mal Bazar | Malda | Manbazar | Mathabhanga | Medinipur | Mekhliganj | Mirzapur | Murshidabad | Nadia | Nagarakata | Nalhati | Nayagarh | Parganas | Purulia | Raiganj | Rampur Hat | Ranaghat | Seharabazar | Siliguri | Suri | Takipur | Tamluk";
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setSearchForm({ ...searchForm, location: item.name });
    history.push(
      `/warehouse?location=${item.name}&totalArea=${totalArea}&pallet=${pallet}&page=${pageCount}`
    );
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return item;
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    if (homeLocation && homeTotalArea && homePallet) {
      let data = {
        state: location,
        totalArea: parseInt(totalArea),
        pallet: parseInt(pallet),
      };
      dispatch(searchWarehouse(data, parseInt(pageCount)));
    } else dispatch(warehouseByPage(pageNumber));
  };

  // Compare Warehouse here

  const [compareWhId, setCompareWhId] = useState([]);

  const cartHandle = (e) => {
    if (compareWhId?.includes(parseInt(e.target.value))) {
      setCompareWhId(compareWhId.filter(item => item !== parseInt(e.target.value)))
    } else if(compareWhId.length<4){
      setCompareWhId([...compareWhId, parseInt(e.target.value)]);
    }
  };

  useEffect(() => {
    if (warehouseType !== null) {
      // let filter = { "type": warehouseType }
      let filter = { category: parseInt(warehouseType) };
      dispatch(warehouseFilterByType(parseInt(pageCount), filter));
    } else if (!homeLocation && !homeTotalArea & !homePallet && !filterType) {
      let filter = {
        filter: {
          type: "adminStatus",
          status: "approved",
        },
      };
      dispatch(warehouseByPage(parseInt(pageCount), filter));
      // dispatch(filterofwarehouse());
    }
  }, [
    dispatch,
    warehouseType,
    pageCount,
    homeLocation,
    homePallet,
    homeTotalArea,
    filterType,
  ]);

  const [searchForm, setSearchForm] = useState({
    location: "",
    totalArea: "",
    pallet: "",
  });

  const { location, totalArea, pallet } = searchForm;

  const handleChange = (e) => {
    if (e.target.name === "pallet") {
      setSearchForm({
        ...searchForm,
        totalArea: parseFloat(e.target.value * 32).toFixed(2),
        pallet: e.target.value,
      });
    } else if (e.target.name === "totalArea") {
      setSearchForm({
        ...searchForm,
        pallet: parseFloat(e.target.value / 32).toFixed(2),
        totalArea: e.target.value,
      });
    }
    // if (e.target.name === "totalArea") {
    //   // console.log("jj")
    //   if (e.target.value.length === 0) {
    //     setSearchForm({ ...searchForm, totalArea: e.target.value, pallet: "" })
    //   }
    //   else {
    //     setSearchForm({ ...searchForm, totalArea: e.target.value, pallet: parseFloat((e.target.value) / 29).toFixed(2) })

    //   }
    // }
    else {
      setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
    }

    if (e.target.name === "pallet" || e.target.name === "totalArea") {
      if (e.target.value.length === 0) {
        setSearchForm({ ...searchForm, pallet: "", totalArea: "" });
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = {
      state: location,
      totalArea: parseInt(totalArea),
      pallet: parseInt(pallet),
    };
    history.push(
      `/warehouse?location=${location}&totalArea=${totalArea}&pallet=${pallet}&page=${pageCount}`
    );

    dispatch(searchWarehouse(data, parseInt(pageCount)));
  };

  useEffect(() => {
    if (homeLocation || homeTotalArea || homePallet) {
      setSearchForm({
        location: homeLocation,
        totalArea: homeTotalArea ? parseInt(homeTotalArea) : null,
        pallet: homePallet ? parseInt(homePallet) : null,
      });

      let data = {
        state: homeLocation,
        totalArea: parseInt(homeTotalArea),
        pallet: parseInt(homePallet),
      };
      if (!filterType) dispatch(searchWarehouse(data, parseInt(pageCount)));
    }
  }, [
    dispatch,
    homeLocation,
    homeTotalArea,
    homePallet,
    pageCount,
    filterType,
  ]);

  useEffect(() => {
    dispatch(favoriteIds());
    dispatch(filterofwarehouse());
  }, [dispatch]);

  const tagUpdate = (tag) => {
    if (filterTag?.includes(tag)) {
      for (var i in filterTag) {
        if (filterTag[i] === tag) {
          filterTag.splice(i, 1);
          break;
        }
      }
    } else {
      setFilterTag([...filterTag, tag]);
    }
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    <Layout>
      {/* <BreadcrumbLayout title={` Warehouse  `} /> */}

      <section className="filter-warehouse py-0" style={{ marginTop: "6rem" }}>
        {/* <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-xl-10 col-lg-11 col-md-12 mt-3">
              {location !== "" ? (
                <div className="px-4 py-2 d-inline-block">
                  State: <span className="font-heading">{location}</span>
                </div>
              ) : (
                ""
              )}

              {totalArea !== "" && totalArea !== null ? (
                <div className="px-4 py-2 d-inline-block">
                  Space required:{" "}
                  <span className="font-heading">{totalArea} sq.ft</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 sidebar-background-color">
              <nav aria-label="breadcrumb text-left">
                <ol
                  className="breadcrumb text-dark mb-0 pl-0"
                  style={{ backgroundColor: "transparent" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Warehouse
                  </li>
                </ol>
              </nav>
              {/* <aside className="collapse sidebar" id="sidebar"> */}
              <div className="sidebar-content overflow-hidden">
                <button
                  className="close filterMediaQuery"
                  type="button"
                  data-toggle="collapse"
                  data-target="#sidebar"
                  aria-expanded="false"
                  aria-controls="sidebar"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  {showFilter ? (
                    <i className="fas fa-times"></i>
                  ) : (
                    <i class="fas fa-filter"></i>
                  )}
                </button>
                <h6 className="text-dark font-weight-medium mb-0 pb-1 mt-2">
                  Filters
                </h6>

                {/* Side Filter Here */}
                {/* {console.log(showFilter)} */}
                {showFilter &&
                  items &&
                  items.filter?.length > 0 &&
                  items.filter.map((value, index) => {
                    if (index === 10000) {
                      return <p>Select Value</p>;
                    } else {
                      return (
                        <div key={index} className="">
                          <ShopColor
                            type={value.filterType}
                            colors={value.filterOptions}
                            tagUpdate={tagUpdate}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              {/* </aside> */}
            </div>

            <div className="col-xl-10">
              {/* Advance Filter */}

              <form className="filters shadow bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 px-0 border-md-right border-max-md-bottom border-deep-gray">
                    <div className="form-group mb-0">
                      <div className="input-group py-2 px-3 custom-input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text px-1">
                            <img
                              src={"/assets/images/icons/location-dark.png"}
                              alt="warehouse"
                            />
                          </span>
                        </div>
                        <div style={{ width: 150 }}>
                          <ReactSearchAutocomplete
                            showIcon={false}
                            styling={{
                              height: "10px",
                              border: "none",
                              zIndex: 2,
                              borderRadius: "24px",
                              backgroundColor: "white",
                              boxShadow: "",
                              hoverBackgroundColor: "#eee",
                              color: "#212121",
                              fontSize: "16px",
                              fontFamily: "Arial",
                              iconColor: "grey",
                              lineColor: "rgb(232, 234, 237)",
                              placeholderColor: "grey",
                              clearIconMargin: "3px 14px 0 0",
                              searchIconMargin: "0 0 0 16px",
                            }}
                            inputSearchString={location}
                            placeholder="Location"
                            items={options}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            formatResult={formatResult}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 px-0 border-md-right border-max-md-bottom border-deep-gray">
                    <div className="form-group mb-0">
                      <div className="input-group pt-2 px-3 custom-input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text px-1">
                            <img
                              src={"/assets/images/icons/space-dark.png"}
                              alt="warehouse"
                            />
                          </span>
                        </div>
                        <input
                          name="totalArea"
                          value={totalArea}
                          type="number"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Space Required"
                        />
                        <span className="text-gray mt-2" style={{fontSize:12, textTransform:"capitalize"}}>SqFt</span>
                      </div>
                      {/* <span className="text-gray ml-4" style={{fontSize:12}}>* Search {[pallet]} pallet Now</span> */}
                    </div>
                  </div>
                  <div className="col-md-3 pl-0 border-md-right border-max-md-bottom border-deep-gray">
                    <div className="form-group mb-0">
                      <div className="input-group pt-2 px-3 custom-input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text px-1">
                            <img
                              src={"/assets/images/icons/pallet-dark.png"}
                              alt="warehouse"
                            />
                          </span>
                        </div>
                        <input
                          name="pallet"
                          value={[pallet]}
                          type="number"
                          onChange={handleChange}
                          className="form-control roundabout"
                          placeholder="No. of Pallets"
                        />
                         <span className="text-gray mt-2" style={{fontSize:12, textTransform:"capitalize"}}>Pallet</span>
                      </div>
                      {/* <span className="text-gray ml-4" style={{fontSize:12}}>* Each Pallet Area = 32 SQFT</span> */}
                    </div>
                  </div>
                  <div className="col-md-3 px-0">
                    <div className="btn-group mb-0 btn-group-lg w-100">
                      <button
                        onClick={handleSearch}
                        type="submit"
                        className="btn py-3"
                      >
                        <i className="fas fa-search"> </i>
                      </button>
                      <a
                        href="#advance-search-modal"
                        data-toggle="modal"
                        className="btn btn-dark-primary d-flex align-items-center rounded-0"
                      >
                        <span className="small d-flex align-items-center">
                          <img
                            src={"/assets/images/icons/filter-white.png"}
                            alt="warehouse"
                          />{" "}
                          Advanced Filter
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </form>

              {filterTag?.length > 0 &&
                filterTag.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    class="btn btn-sm btn-outline-warning mt-2 mx-1"
                  >
                    {tag}{" "}
                  </button>
                ))}

              {/* End of Advance filter */}

              {(items?.listOfWarehouse.data &&
                items?.listOfWarehouse.data.length === 0 &&
                !items.isLoading) ||
              (items.listOfWarehouse.data === undefined && !items.isLoading) ? (
                <section>
                  <div className="container-fluid">
                    <div className="col-md-12">
                      <div className="row">
                        <div
                          className="col-12"
                          style={{ borderRight: "10px solid #f1f1f1" }}
                        >
                          <div className="location-box text-center">
                            <p>
                              Couldn't get the space you are Looking for?
                            </p>
                            <h6 className="font-weight-bold">
                              sales@warehousity.com
                            </h6>
                            <h6 className="font-weight-bold">
                              {" "}
                              +91-7677180180{" "}
                            </h6>
                          </div>
                          {/* <div className="col-md-12">
                            {" "}
                            <ContactForm
                              location={getQueryVariable("location")}
                            />
                            <div className="section-title">
                              <p>
                                To Further explore our network
                                <a
                                  href="/explore-network"
                                  style={{ color: "#ff6600" }}
                                >
                                  Click here
                                </a>
                                .
                              </p>
                            </div>
                          </div> */}
                        </div>
                        <div className="col-12">
                          <ContactForm
                            location={getQueryVariable("location")}
                          />
                          {/* <div className="section-title">
                            <p>
                              To Further explore our network
                              <a
                                href="/explore-network"
                                style={{ color: "#ff6600" }}
                              >
                                Click here
                              </a>
                              .
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}
              {!items.isLoading ? (
                <div className="row">
                  <div className="col-lg-7">
                    <div className="row">
                      {items.listOfWarehouse.data &&
                      items.listOfWarehouse?.data?.length > 0
                        ? items.listOfWarehouse.data.map((item, index) => {
                            return (
                              <WarehouseList
                                key={index}
                                index={index}
                                item={item}
                                cartHandle={cartHandle}
                                compareWhId={compareWhId}
                              />
                            );
                          })
                        : // <ItemNotFlund message="Warehouse Not Found" />
                          null}
                    </div>

                    {/* ============ Pagination ============ */}
                    {items.listOfWarehouse &&
                      items.listOfWarehouse?.data?.length > 0 && (
                        <div className="pagination-custom">
                          <Pagination
                            activePage={parseInt(pageCount)}
                            itemsCountPerPage={10}
                            totalItemsCount={items.listOfWarehouse.totalCount}
                            pageRangeDisplayed={1}
                            onChange={handlePageChange}
                            prevPageText={<i className="fas fa-chevron-left" />}
                            nextPageText={
                              <i className="fas fa-chevron-right" />
                            }
                            hideFirstLastPages={true}
                          />
                        </div>
                      )}
                  </div>
                  <div className="col-lg-7 text-center order-md-3 py-3">
                    {compareWhId && compareWhId.length === 2 ? (
                      <Link
                        to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}`}
                      >
                        <button
                          type="button"
                          className="btn btn-deep-primary cursorPointer myBtn"
                        >
                        {compareWhId?.length} - Compare Now
                        </button>
                      </Link>
                    ) : null}

                    {compareWhId && compareWhId.length === 3 ? (
                      <Link
                        to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}&wh3=${compareWhId[2]}`}
                      >
                        <button
                          type="button"
                          className="btn btn-deep-primary cursorPointer myBtn"
                        >
                          {compareWhId?.length} - Compare Now
                        </button>
                      </Link>
                    ) : null}
                    {compareWhId && compareWhId.length === 4 ? (
                      <Link
                        to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}&wh3=${compareWhId[2]}&wh4=${compareWhId[3]}`}
                      >
                        <button
                          type="button"
                          className="btn btn-deep-primary cursorPointer myBtn"
                        >
                          {compareWhId?.length} - Compare Now
                        </button>
                      </Link>
                    ) : null}
                  </div>

                  {items.listOfWarehouse.data &&
                  items.listOfWarehouse.data.length > 0 ? (
                    <div className="col-lg-5 py-3">
                      <div
                        id="deliverynearbymap"
                        style={{
                          minHeight: "400px",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <Maps />
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <CardLoader loaderCard={false} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Advance filter */}
      <div
        className="modal px-0"
        id="advance-search-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="advance-search-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="modal-body-right-content py-lg-4 my-1 p-sm-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <button
                        ref={myRefname}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div>
                        <h5 className="mb-3 modal-title">Advance Search</h5>
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="state" className="mb-0 px-2">
                          {" "}
                          State:
                        </label>
                        <select
                          onChange={(e) => {
                            handleChange555(e);
                          }}
                          name="state"
                          as="select"
                          className={
                            "form-control custom-select bg-white px-4 common-select-deep-blue w-100"
                          }
                          id="state"
                        >
                          {options1 && options1.length > 0
                            ? options1.map((value, index) => {
                                return (
                                  <option key={index}>{value.label}</option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="city" className="mb-0 px-2 font-bold">
                          {" "}
                          City:
                        </label>
                        <select
                          onChange={(e) => {
                            setadvanceSearch({
                              ...advanceSearch,
                              city: e.target.value,
                            });
                          }}
                          name="city"
                          as="select"
                          className={
                            "form-control custom-select bg-white px-4 common-select-deep-blue w-100"
                          }
                          id="city"
                        >
                          {optioncity && optioncity.length > 0
                            ? optioncity.map((value, index) => {
                                return (
                                  <option key={index}>{value.label}</option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderfirstname">
                          Floor Type{" "}
                        </label>
                        <select
                          onChange={(e) => {
                            setadvanceSearch({
                              ...advanceSearch,
                              "Floor Type": e.target.value,
                            });
                          }}
                          name="floorType"
                          as="select"
                          className={
                            "form-control custom-select bg-white px-4 common-select-deep-blue w-100"
                          }
                          id="floorType"
                        >
                          <option>Select Type</option>

                          <option>Basement</option>
                          <option>Ground Floor</option>
                          <option>First Floor</option>
                          <option>Second Floor</option>
                        </select>
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderlastname">
                          Total Area{" "}
                        </label>
                        <input
                          onChange={handleChange5("Total Area")}
                          type="text"
                          id="spaceproviderlastname"
                          className="form-control"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderfirstname">
                          Available Space{" "}
                        </label>
                        <input
                          onChange={handleChange5("Total Available Space")}
                          type="text"
                          id="spaceproviderfirstname"
                          className="form-control"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderlastname">Pallet </label>
                        <input
                          value={advanceSearch["Total Area"] / 29}
                          readOnly
                          type="text"
                          id="spaceproviderlastname"
                          className="form-control roundabout"
                          placeholder="Type here"
                        />
                      </div>

                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderlastname">Rack</label>
                        <select
                          onChange={(e) => {
                            setadvanceSearch({
                              ...advanceSearch,
                              Rack: e.target.value,
                            });
                          }}
                          name="rack"
                          as="select"
                          className={
                            "form-control custom-select bg-white px-4 common-select-deep-blue w-100"
                          }
                          id="rack"
                        >
                          <option>Select Type</option>

                          <option>Slotted Angle</option>
                          <option>Shelve Racks</option>
                        </select>
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderfirstname">
                          Parking Area{" "}
                        </label>
                        <select
                          onChange={(e) => {
                            setadvanceSearch({
                              ...advanceSearch,
                              "Parking Area": e.target.value,
                            });
                          }}
                          name="parkingArea"
                          as="select"
                          className={
                            "form-control custom-select bg-white px-4 common-select-deep-blue w-100"
                          }
                          id="parkingArea"
                        >
                          <option>Yes</option>

                          <option>No</option>
                        </select>
                        {/* <input type="text" id="spaceproviderfirstname" className="form-control" placeholder="Type here"/> */}
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderlastname">
                          IT & Office Infra{" "}
                        </label>

                        <select
                            onChange={(e) => {
                              handleChange5(e.target.value);
                            }}
                            // name="rack"
                            as="select"
                            className={
                              "form-control custom-select bg-white px-4 common-select-deep-blue w-100 text-capitalize"
                            }
                            id="rack"
                          >
                            <option>Select</option>
                            {itOfficeData.map((item, index) => (
                              <option key={index} value={item}>
                                {item.split(/(?=[A-Z])/).join(" ")}
                              </option>
                            ))}
                          </select>

                        {/* <input
                          onChange={handleChange5("IT & Office Infra")}
                          type="text"
                          id="spaceproviderlastname"
                          className="form-control"
                          placeholder="Type here"
                        /> */}
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label htmlFor="spaceproviderfirstname">
                          Mh Infra{" "}
                        </label>

                        <select
                            onChange={(e) => {
                              handleChange5(e.target.value);
                            }}
                            // name="rack"
                            as="select"
                            className={
                              "form-control custom-select bg-white px-4 common-select-deep-blue w-100 text-capitalize"
                            }
                            id="rack"
                          >
                            <option>Select</option>
                            {mhOfficeData.map((item, index) => (
                              <option key={index} value={item}>
                                {item.split(/(?=[A-Z])/).join(" ")}
                              </option>
                            ))}
                          </select>

                        {/* <input
                          onChange={handleChange5("MH Infra")}
                          type="text"
                          id="spaceproviderfirstname"
                          className="form-control"
                          placeholder="Type here"
                        /> */}
                      </div>
                      <div className="col-sm-12 form-group mb-3">
                        <label htmlFor="spaceproviderfirstname">
                          Safety And Security{" "}
                        </label>
                        <select
                            onChange={(e) => {
                              handleChange5(e.target.value);
                            }}
                            // name="rack"
                            as="select"
                            className={
                              "form-control custom-select bg-white px-4 common-select-deep-blue w-100 text-capitalize"
                            }
                            id="rack"
                          >
                            <option>Select</option>
                            {saftySecurity.map((item, index) => (
                              <option key={index} value={item.value}>
                                {item.key}
                              </option>
                            ))}
                          </select>
                        {/* <input
                          onChange={handleChange5("Safety & Security")}
                          type="text"
                          id="spaceproviderfirstname"
                          className="form-control"
                          placeholder="Type here"
                        /> */}
                      </div>
                    </div>
                    <div className="text-center col-12">
                      <button
                        onClick={() => {
                          dispatch(
                            searchWarehouse(advanceSearch, parseInt(pageCount))
                          );
                          handleClick2();
                        }}
                        type="submit"
                        className="btn btn-deep-primary my-1"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Warehouse;
