const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


module.exports.newsIdMaker = {
		 newsIdMakerFunction: function(title,subtitle) {
			var str = title + ' ' + subtitle;
			  var combining = /[\u0300-\u036F]/g; 
			var str = str.normalize('NFKD').replace(combining, '');
			var regexPattern = /[^A-Za-z0-9]/g;
			 var splittedStr = str.split(' '); 
			 var sanitizedTitle = "";
			 
			 for (var i=0; i<splittedStr.length; i++) {
				 if (sanitizedTitle == "") {
				sanitizedTitle=sanitizedTitle + splittedStr[i].replace(regexPattern, "").toLowerCase();

				 }
				 else {
				 sanitizedTitle=sanitizedTitle+ "-" + splittedStr[i].replace(regexPattern, "").toLowerCase();	 
				 }
				 
				 
			 }
			 console.log(sanitizedTitle);
			var str = str.replace(regexPattern, "").toLowerCase();
			return sanitizedTitle;
	 }
}

module.exports.dateMaker = {
	dateMakerFunction: function(dateInCompleteFormat) {
		
		 const monthsArr = ["Január", "február", "Március", "Április", "Május", "Június", "Július", "augusztus", "Szeptember", "Október", "November", "December"];
		let months = parseInt(dateInCompleteFormat.getMonth()) + 1;
		
		
		return dateInCompleteFormat.getFullYear() + "-" + months.toString() + "-" + dateInCompleteFormat.getDate();
	}
} 

module.exports.flagDictionary = {
	Hungarian: "../../assets/img/flags/hungarian-flag.svg",
	English: '../../assets/img/flags/europeanunion.svg',
	German: '../../assets/img/flags/german-flag.svg',
	Italian: '../../assets/img/flags/italian-flag.svg'
};


module.exports.workPlaces= {
	current: 
	{
		name: "Hungarian Data Asset Management Agency",
		startingDate: 2021,
		jobtitle: "Lawyer",
		job: ["Assisting the set up of the Agency's process prescribed by the act on national data","Drafting contracts","Conducting legal research on data protection datae conomy and other occurred problems"]
		
	},
	before: {
		mate: {
			name: "Hungarian University of Agriculture and Life Sciences (until 2021 Szent István University)",
			startingDate: 2016,
			endDate: 2021,
			jobtitle: "Lawyer",
			job: ["Drafting civil contracts mainly as part of procurement process", "Managing international agreements (both business contracts and memorandum of agreements)","Solving issues related to intellectual property","Conducting researches as regards legal issues"]
		},
		djp: {
			name: "Digital Success Programme",
			startingDate: 2020,
			endDate: 2021,
			jobtitle: "Secretary",
			job: [
				"Administrative contribution to the committees engaged with drafting legislative proposals focusing on digital aspects as regards the Hungarian Civil Code and the Hungarian Penal Code"
			]
		}
	}
}

module.exports.translate = {
	translateFunction: function(string_language, database) {
		return database[string_language];
	}
};



module.exports.metaTags = {
	indexPage: {
		title: "balintov < the coder lawyer /> 🧑‍💻",
		type_content: "index page",
		title_content: "balintov < the coder lawyer />",
		description_content: "Welcome on the page of Balint Ferencz, jurist, scholar and hobby developer.",
		image_content: "https://www.dropbox.com/s/o4yi7wy3qnobjsv/balint_ferencz_profile_pic.png?raw=1"
	},
	curriculumPage: {
		page_title: "Curriculum",
		title: "balintov | 📃 | curriculum",
		type_content: "curriculum page",
		title_content: "CV of balintov < the coder lawyer />",
		description_content: "Curriculum of Balint Ferencz, jurist, scholar and hobby developer",
		image_content: "https://www.dropbox.com/s/o4yi7wy3qnobjsv/balint_ferencz_profile_pic.png?raw=1"
	},
	newsPage: {
		page_title: "Posts by me",
		title: "balintov | 📻 | news",
		type_content: "list of news",
		title_content: "Blog posts by < the coder lawyer />",
		description_content: "Blog posts written by Balint Ferencz",
		image_content:  "https://www.dropbox.com/s/o4yi7wy3qnobjsv/balint_ferencz_profile_pic.png?raw=1"
	},
	worksPage: {
		page_title: "Publications",
		title: "balintov | 📘 | publications",
		type_content: "list of publications",
		title_content: "List of publications by Balint Ferencz",
		description_content: "List of publications by Balint Ferencz",
		image_content:  "https://www.dropbox.com/s/o4yi7wy3qnobjsv/balint_ferencz_profile_pic.png?raw=1"
	},
	picturesPage: {
		page_title: "Pictures",
		title: "balintov | 📷 | pictures",
		type_content: "pictures page",
		title_content: "Pictures of < the coder lawyer />",
		description_content: "Some pictures",
		image_content:  "https://www.dropbox.com/s/o4yi7wy3qnobjsv/balint_ferencz_profile_pic.png?raw=1"
	},
	notFoundPage: {
		title: "balintov | 😟 page not found 😟 ",
		type_content: "page not found",
		title_content: "!important Page not Found :(",
		description_content: "This is the wrong place, go somewhere else...",
		image_content:  "https://www.dropbox.com/s/o4yi7wy3qnobjsv/balint_ferencz_profile_pic.png?raw=1"
	}
};