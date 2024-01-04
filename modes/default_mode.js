settings.corpora = {};
settings.corporafolders = {};



// Corporafolders

settings.corporafolders.ettenten = {
    title : "Eesti veeb 2013",
    contents : ["ettenten01", "ettenten02", "ettenten03", "ettenten04", "ettenten05",
		"ettenten06", "ettenten07", "ettenten08", "ettenten09", "ettenten10"],
    description : "Eesti veeb 2013 (EtTenTen)"
};

settings.corporafolders.ilukirjandus = {
    title : "Ilukirjandus (koondkorpusest)",
    contents : ["ilutasak", "muuilu"],
    description : "Ilukirjandus (koondkorpusest)"
};

settings.corporafolders.teaduskirjandus = {
    title : "Teaduskirjandus (koondkorpusest)",
    contents : ["tea_agraar", "tea_artiklid", 
		"tea_arvutitehnika_ja_andmet66tlus",
		"tea_drt66d", 
		"tea_eesti_arst"
	       ],
    description : "Teaduskirjanduse korpus: Doktoritööd, artiklid, erialased ajakirjad"
};


settings.corporafolders.ajakirjandus = {
    title : "Ajakirjandus (koondkorpusest)",
    contents : [], // ["eestiekspress"],
    description : "Ajakirjandus"
};

settings.corporafolders.ajakirjandus.eestiekspress = {
    title : "Eesti Ekspress",
    contents : ["aja_ee_1996", "aja_ee_1997",
		"aja_ee_1998", "aja_ee_1999",
	       "aja_ee_2000", "aja_ee_2001"]
};

settings.corporafolders.ajakirjandus.kroonika = {
    title : "Kroonika",
    contents : ["aja_kroonika_2000", "aja_kroonika_2001",
		"aja_kroonika_2002", "aja_kroonika_2003"]
};

settings.corporafolders.ajakirjandus.laaneelu = {
    title : "Lääne Elu",
    contents : ["aja_laane_elu_2000", "aja_laane_elu_2001",
		"aja_laane_elu_2002", "aja_laane_elu_2003",
		"aja_laane_elu_2004", "aja_laane_elu_2005",
		"aja_laane_elu_2006", "aja_laane_elu_2007",
		"aja_laane_elu_2008"
	       ]
};

settings.corporafolders.ajakirjandus.luup = {
    title : "Luup",
    contents : ["aja_luup_1996", "aja_luup_1997",
		"aja_luup_1998", "aja_luup_1999",
	       "aja_luup_2000", "aja_luup_2001",
		"aja_luup_2002"
	       ]
};

settings.corporafolders.ajakirjandus.maaleht = {
    title : "Maaleht",
    contents : [ "aja_maaleht_2001",
		"aja_maaleht_2002", "aja_maaleht_2003", "aja_maaleht_2004"]
};

settings.corporafolders.ajakirjandus.postimees = {
    title : "Postimees",
    contents : ["aja_postimees_1995", "aja_postimees_1996", "aja_postimees_1997",
		"aja_postimees_1998", "aja_postimees_1999",
	       "aja_postimees_2000"]
};

settings.corporafolders.ajakirjandus.sloleht = {
    title : "SL Õhtuleht",
    contents : ["aja_sloleht_1997",
		"aja_sloleht_1998", "aja_sloleht_1999",
	       "aja_sloleht_2000", "aja_sloleht_2001",
		"aja_sloleht_2002", "aja_sloleht_2003"
	       ]
};

settings.corporafolders.ajakirjandus.epl = {
    title : "Eesti Päevaleht",
    contents : ["aja_epl_1995", "aja_epl_1996", "aja_epl_1997",
		"aja_epl_1998", "aja_epl_1999",
		"aja_epl_2000",	"aja_epl_2001","aja_epl_2002",
		"aja_epl_2003","aja_epl_2004","aja_epl_2005",
		"aja_epl_2006","aja_epl_2007"
	       ]
};

settings.corporafolders.eurosea = {
    title : "Euroopa seadused (koondkorpusest)",
    contents : ["sea_euro_t01", "sea_euro_t02", 
		"sea_euro_t03",
		"sea_euro_t04", "sea_euro_t05", "sea_euro_t06",
		"sea_euro_t07", "sea_euro_t08", "sea_euro_t09",
		"sea_euro_t10", "sea_euro_t11", "sea_euro_t12",
		"sea_euro_u00", "sea_euro_u01", "sea_euro_u02"],
    description : "Euroopa seadused"
};




// Corpora
// Ilukirjandus

settings.corpora.ilutasak = {
    id : "ilutasak",
    title : "Ilukirjandus (tasakaalus)",
    description : "Ilukirjandus tasakaalus korpusest",
    within: csWithin,
    context: csContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_tervikteos : {label : "title"},
	text_alaosa : {label : "section"},
	text_autor : {label : "author"},
	text_year : {label : "year"}
    }
};

settings.corpora.muuilu = {
    id : "muuilu",
    title : "Ilukirjandus (muu)",
    description : "Ilukirjandus (mitte tasakaalus korpusest)",
    within: csWithin,
    context: csContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_tervikteos : {label : "title"},
	text_alaosa : {label : "section"},
	text_autor : {label : "author"},
	text_year : {label : "year"}
    }
};


// Ettenten

settings.corpora.ettenten01 = {
    id : "ettenten01",
    title : "Eesti veeb (01)",
    description : "Eesti veeb (1. osa 10st)",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten02 = {
    id : "ettenten02",
    title : "Eesti veeb (02)",
    description : "Eesti veeb 02",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten03 = {
    id : "ettenten03",
    title : "Eesti veeb (03)",
    description : "Eesti veeb 03",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten04 = {
    id : "ettenten04",
    title : "Eesti veeb (04)",
    description : "Eesti veeb 04",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten05 = {
    id : "ettenten05",
    title : "Eesti veeb (05)",
    description : "Eesti veeb 05",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten06 = {
    id : "ettenten06",
    title : "Eesti veeb (06)",
    description : "Eesti veeb 06",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten07 = {
    id : "ettenten07",
    title : "Eesti veeb (07)",
    description : "Eesti veeb 07",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten08 = {
    id : "ettenten08",
    title : "Eesti veeb (08)",
    description : "Eesti veeb 08",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten09 = {
    id : "ettenten09",
    title : "Eesti veeb (09)",
    description : "Eesti veeb 09",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};

settings.corpora.ettenten10 = {
    id : "ettenten10",
    title : "Eesti veeb (10)",
    description : "Eesti veeb 10",
    within : cspWithin,
    context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_web_domain : {label : "webdomain",
			  type: "url"},
	text_texttype : {label :"type"},
	text_url : {label :"url",
		   type: "url"}
    }
};


// Eesti Ekspress 1996 - 2001

settings.corpora.aja_ee_1996 = {
	id : "aja_ee_1996",
    title : "EE 1996",
	description : "Eesti Ekspress 1996",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.eeStruct
};

settings.corpora.aja_ee_1997 = {
	id : "aja_ee_1997",
    title : "EE 1997",
	description : "Eesti Ekspress 1997",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.eeStruct
};

settings.corpora.aja_ee_1998 = {
	id : "aja_ee_1998",
    title : "EE 1998",
	description : "Eesti Ekspress 1998",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.eeStruct
};

settings.corpora.aja_ee_1999 = {
	id : "aja_ee_1999",
    title : "EE 1999",
	description : "Eesti Ekspress 1999",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.eeStruct
};

settings.corpora.aja_ee_2000 = {
	id : "aja_ee_2000",
    title : "EE 2000",
	description : "Eesti Ekspress 2000",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.eeStruct
};

settings.corpora.aja_ee_2001 = {
	id : "aja_ee_2001",
    title : "EE 2001",
	description : "Eesti Ekspress 2001",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.eeStruct
};


// Ajakiri Kroonika 2000 - 2003

settings.corpora.aja_kroonika_2000 = {
	id : "aja_kroonika_2000",
    title : "Kroonika 2000",
	description : "Ajakiri \"Kroonika\" 2000",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_kroonika_2001 = {
	id : "aja_kroonika_2001",
    title : "Kroonika 2001",
	description : "Ajakiri \"Kroonika\" 2001",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_kroonika_2002 = {
	id : "aja_kroonika_2002",
    title : "Kroonika 2002",
	description : "Ajakiri \"Kroonika\" 2002",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_kroonika_2003 = {
	id : "aja_kroonika_2003",
    title : "Kroonika 2003",
	description : "Ajakiri \"Kroonika\" 2003",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

// Ajaleht "Lääne Elu" 2000 - 2008

settings.corpora.aja_laane_elu_2000 = {
	id : "aja_laane_elu_2000",
    title : "Lääne elu 2000",
	description : "Ajaleht \"Lääne Elu\" 2000",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2001 = {
	id : "aja_laane_elu_2001",
    title : "Lääne elu 2001",
	description : "Ajaleht \"Lääne Elu\" 2001",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2002 = {
	id : "aja_laane_elu_2002",
    title : "Lääne elu 2002",
	description : "Ajaleht \"Lääne Elu\" 2002",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2003 = {
	id : "aja_laane_elu_2003",
    title : "Lääne elu 2003",
	description : "Ajaleht \"Lääne Elu\" 2003",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2004 = {
	id : "aja_laane_elu_2004",
    title : "Lääne elu 2004",
	description : "Ajaleht \"Lääne Elu\" 2004",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2005 = {
	id : "aja_laane_elu_2005",
    title : "Lääne elu 2005",
	description : "Ajaleht \"Lääne Elu\" 2005",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2006 = {
	id : "aja_laane_elu_2006",
    title : "Lääne elu 2006",
	description : "Ajaleht \"Lääne Elu\" 2006",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2007 = {
	id : "aja_laane_elu_2007",
    title : "Lääne elu 2007",
	description : "Ajaleht \"Lääne Elu\" 2007",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_laane_elu_2008 = {
	id : "aja_laane_elu_2008",
    title : "Lääne elu 2008",
	description : "Ajaleht \"Lääne Elu\" 2008",
	within : csWithin,
	context : sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};


// Ajakiri "Luup" 1996 - 2002

settings.corpora.aja_luup_1996 = {
    id : "aja_luup_1996",
    title : "Luup 1996",
    description : "Ajakiri \"Luup\" 1996",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_luup_1997 = {
    id : "aja_luup_1997",
    title : "Luup 1997",
    description : "Ajakiri \"Luup\" 1997",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_luup_1998 = {
    id : "aja_luup_1998",
    title : "Luup 1998",
    description : "Ajakiri \"Luup\" 1998",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_luup_1999 = {
    id : "aja_luup_1999",
    title : "Luup 1999",
    description : "Ajakiri \"Luup\" 1999",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_luup_2000 = {
    id : "aja_luup_2000",
    title : "Luup 2000",
    description : "Ajakiri \"Luup\" 2000",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_luup_2001 = {
    id : "aja_luup_2001",
    title : "Luup 2001",
    description : "Ajakiri \"Luup\" 2001",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_luup_2002 = {
    id : "aja_luup_2002",
    title : "Luup 2002",
    description : "Ajakiri \"Luup\" 2002",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};


// Maaleht 2001 - 2004

settings.corpora.aja_maaleht_2001 = {
    id : "aja_maaleht_2001",
    title : "Maaleht 2001",
    description : "Maaleht 2001",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_maaleht_2002 = {
    id : "aja_maaleht_2002",
    title : "Maaleht 2002",
    description : "Maaleht 2002",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_maaleht_2003 = {
    id : "aja_maaleht_2003",
    title : "Maaleht 2003",
    description : "Maaleht 2003",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_maaleht_2004 = {
    id : "aja_maaleht_2004",
    title : "Maaleht 2004",
    description : "Maaleht 2004",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};


// Postimees 1995 - 2000

settings.corpora.aja_postimees_1995 = {
	id : "aja_postimees_1995",
    title : "Postimees 1995",
	description : "Postimees 1995",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.posStruct
};

settings.corpora.aja_postimees_1996 = {
	id : "aja_postimees_1996",
    title : "Postimees 1996",
	description : "Postimees 1996",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.posStruct
};

settings.corpora.aja_postimees_1997 = {
	id : "aja_postimees_1997",
    title : "Postimees 1997",
	description : "Postimees 1997",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.posStruct
};

settings.corpora.aja_postimees_1998 = {
	id : "aja_postimees_1998",
    title : "Postimees 1998",
	description : "Postimees 1998",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.posStruct
};

settings.corpora.aja_postimees_1999 = {
	id : "aja_postimees_1999",
    title : "Postimees 1999",
	description : "Postimees 1999",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.posStruct
};

settings.corpora.aja_postimees_2000 = {
	id : "aja_postimees_2000",
    title : "Postimees 2000",
	description : "Postimees 2000",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.posStruct
};


// SL Õhtuleht

settings.corpora.aja_sloleht_1997 = {
	id : "aja_sloleht_1997",
    title : "Sloleht 1997",
	description : "Sloleht 1997",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_sloleht_1998 = {
	id : "aja_sloleht_1998",
    title : "Sloleht 1998",
	description : "Sloleht 1998",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_sloleht_1999 = {
	id : "aja_sloleht_1999",
    title : "Sloleht 1999",
	description : "Sloleht 1999",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_sloleht_2000 = {
	id : "aja_sloleht_2000",
    title : "Sloleht 2000",
	description : "Sloleht 2000",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_sloleht_2001 = {
	id : "aja_sloleht_2001",
    title : "Sloleht 2001",
	description : "Sloleht 2001",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_sloleht_2002 = {
	id : "aja_sloleht_2002",
    title : "Sloleht 2002",
	description : "Sloleht 2002",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_sloleht_2003 = {
	id : "aja_sloleht_2003",
    title : "Sloleht 2003",
	description : "Sloleht 2003",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

// EPL 

settings.corpora.aja_epl_1995 = {
	id : "aja_epl_1995",
    title : "EPL 1995",
	description : "Eesti Päevaleht 1995",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_1996 = {
	id : "aja_epl_1996",
    title : "EPL 1996",
	description : "Eesti Päevaleht 1996",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_1997 = {
	id : "aja_epl_1997",
    title : "EPL 1997",
	description : "Eesti Päevaleht 1997",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_1998 = {
	id : "aja_epl_1998",
    title : "EPL 1998",
	description : "Eesti Päevaleht 1998",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_1999 = {
	id : "aja_epl_1999",
    title : "EPL 1999",
	description : "Eesti Päevaleht 1999",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_2000 = {
	id : "aja_epl_2000",
    title : "EPL 2000",
	description : "Eesti Päevaleht 2000",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_2001 = {
	id : "aja_epl_2001",
    title : "EPL 2001",
	description : "Eesti Päevaleht 2001",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_2002 = {
	id : "aja_epl_2002",
    title : "EPL 2002",
	description : "Eesti Päevaleht 2002",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_2003 = {
	id : "aja_epl_2003",
    title : "EPL 2003",
	description : "Eesti Päevaleht 2003",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_2004 = {
	id : "aja_epl_2004",
    title : "EPL 2004",
	description : "Eesti Päevaleht 2004",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};


settings.corpora.aja_epl_2005 = {
	id : "aja_epl_2005",
    title : "EPL 2005",
	description : "Eesti Päevaleht 2005",
     within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};


settings.corpora.aja_epl_2006 = {
	id : "aja_epl_2006",
    title : "EPL 2006",
	description : "Eesti Päevaleht 2006",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};

settings.corpora.aja_epl_2007 = {
	id : "aja_epl_2007",
    title : "EPL 2007",
	description : "Eesti Päevaleht 2007",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : aja.krooStruct
};


// Riigikogu protokollid

settings.corpora.riigikogu = {
    id : "riigikogu",
    title : "Riigikogu protokollid (koondkorpusest)",
    description : "Riigikogu protokollid 1995-2001",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_istungjaerk : {label : "istungjärk"},
	text_stenogramm : {label : "stenogramm"},
	text_paeevakorrapunkt : {label : "päevakorrapunkt"},
	text_koeneleja : {label :"kõneleja"}
    }
};


// Teaduskirjandus

settings.corpora.tea_agraar = {
    id : "tea_agraar",
    title : "Teaduskirjandus: agraarteadused",
    description : "Teaduskirjandus: agraarteadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_autor : {label : "author"},
	text_year : {label : "year"},
	//text_aastakäik : {label : "aastakaik"},
	text_artikkel : {label :"article"},
	text_ajakirjanumber : {label : "ajakirjanumber"}
    }
};

settings.corpora.tea_artiklid = {
    id : "tea_artiklid",
    title : "Teaduskirjandus: artiklid",
    description : "Teaduskirjandus: artiklid",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_autor : {label : "author"},
	// text_rubriik : {label : "rubriik"},
	// text_alamrubriik : {label : "alamrubriik"},
	text_artikkel : {label :"article"},
	text_osa : {label : "article_section"},
	// text_pealkirja_eelne : {label : "pealkirjaeelne"},
	text_alaosa : {label : "article_subsection"},
	text_ajalehenumber : {label : "ajalehenumber"},
    }
};

settings.corpora.tea_arvutitehnika_ja_andmet66tlus = {
    id : "tea_arvutitehnika_ja_andmet66tlus",
    title : "Teaduskirjandus: arvutitehnika",
    description : "Ajakiri \"Arvutitehnika ja andmetöötlus\"",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_autor : {label : "author"},
	// text_rubriik : {label : "rubriik"},
	// text_alamrubriik : {label : "alamrubriik"},
	text_artikkel : {label :"article"},
	// text_osa : {label : "osa"},
	// text_pealkirja_eelne : {label : "pealkirjaeelne"},
	// text_alaosa : {label : "alaosa"},
	text_ajakirjanumber : {label : "ajakirjanumber"},
	text_month : {label : "month"},
	text_year : {label : "year"}
    }
};

settings.corpora.tea_drt66d = {
    id : "tea_drt66d",
    title : "Teaduskirjandus: Doktoritööd",
    description : "Teaduskirjandus: Doktoritööd",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_autor : {label : "author"},
	// text_rubriik : {label : "rubriik"},
	// text_alamrubriik : {label : "alamrubriik"},
	// text_artikkel : {label :"artikkel"},
	// text_osa : {label : "osa"},
	// text_pealkirja_eelne : {label : "pealkirjaeelne"},
	text_alaosa : {label : "section"},
	text_dissertatsioon : {label : "title"}
	// text_ajalehenumber : {label : "ajalehenumber"},
    }
};

settings.corpora.tea_eesti_arst = {
    id : "tea_eesti_arst",
    title : "Eesti Arst",
    description : "Teaduskirjandus: Ajakiri \"Eesti Arst\"",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_autor : {label : "author"},
	// text_alamrubriik : {label : "alamrubriik"},
	// text_artikkel : {label :"artikkel"},
	// text_osa : {label : "osa"},
	text_pealkirja_eelne : {label : "pealkirjaeelne"},
	text_alaosa : {label : "title"},
	text_year : {label : "year"},
	text_ajakirjanumber : {label : "ajakirjanumber"},
	text_month : {label : "month"}
    }
};


// Seadused

settings.corpora.sea_eesti = {
    id : "sea_eesti",
    title : "Eesti seadused (koondkorpusest)",
    description : "Eesti seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_autor : {label : "author"},
	// text_rubriik : {label : "rubriik"},
	// text_alamrubriik : {label : "alamrubriik"},
	text_seadus : {label :"title"},
	text_year : {label : "year"},
	// text_osa : {label : "osa"},
	// text_pealkirja_eelne : {label : "pealkirjaeelne"},
	// text_alaosa : {label : "alaosa"},
	// text_ajalehenumber : {label : "ajalehenumber"},
	text_month : {label : "month"}
    }
};

settings.corpora.sea_euro_t01 = {
    id : "sea_euro_t01",
    title : "Euroopa seadused 1",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t02 = {
    id : "sea_euro_t02",
    title : "Euroopa seadused 2",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t03 = {
    id : "sea_euro_t03",
    title : "Euroopa seadused 3",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t04 = {
    id : "sea_euro_t04",
    title : "Euroopa seadused 4",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t05 = {
    id : "sea_euro_t05",
    title : "Euroopa seadused 5",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t06 = {
    id : "sea_euro_t06",
    title : "Euroopa seadused 6",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t07 = {
    id : "sea_euro_t07",
    title : "Euroopa seadused 7",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t08 = {
    id : "sea_euro_t08",
    title : "Euroopa seadused 8",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t09 = {
    id : "sea_euro_t09",
    title : "Euroopa seadused 9",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};
settings.corpora.sea_euro_t10 = {
    id : "sea_euro_t10",
    title : "Euroopa seadused 10",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t11 = {
    id : "sea_euro_t11",
    title : "Euroopa seadused 11",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_t12 = {
    id : "sea_euro_t12",
    title : "Euroopa seadused 12",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_u01 = {
    id : "sea_euro_u01",
    title : "Euroopa seadused 1",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_u02 = {
    id : "sea_euro_u02",
    title : "Euroopa seadused u2",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};

settings.corpora.sea_euro_u00 = {
    id : "sea_euro_u00",
    title : "Euroopa seadused u0",
    description : "Euroopa seadused",
    within: cspWithin,
    context: sContext,
    attributes : attrs.koondAttrs,
    structAttributes : {
	text_seadus : {label : "title"}
    }
};


settings.corpusListing = new CorpusListing(settings.corpora);
