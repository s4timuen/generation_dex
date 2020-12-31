// check for different forms
function checkDiffForme(name) {

    // for home default sprite
    switch(name) {
        case("deoxys"):
            name = "deoxys-normal";
            break;
        case("wormadam"):
            name = "wormadam-plant";
            break;
        case("shaymin"):
            name = "shaymin-land";
            break;
        case("giratina"):
            name = "giratina-altered";
            break;
        case("darmanitan"):
            name = "darmanitan-standard";
            break;
        case("basculin"):
            name = "basculin-red-striped";
            break;
        case("tornadus"):
            name = "tornadus-incarnate";
            break;
        case("thundurus"):
            name = "thundurus-incarnate";
            break;
        case("landorus"):
            name = "landorus-incarnate";
            break;
        case("keldeo"):
            name = "keldeo-ordinary";
            break;
        case("meloetta"):
            name = "meloetta-aria";
            break;
        case("meowstic"):
            name = "meowstic-male";
            break;
        case("aegislash"):
            name = "aegislash-shield";
            break;
        case("pumpkaboo"):
            name = "pumpkaboo-average";
            break;
        case("gourgeist"):
            name = "gourgeist-average";
            break;
        case("oricorio"):
            name = "oricorio-baile";
            break;
        case("lycanroc"):
            name = "	lycanroc-midday";
            break;
        case("wishiwashi"):
            name = "wishiwashi-solo";
            break;
        case("minior"):
            name = "minior-red-meteor";
            break;
        case("mimikyu"):
            name = "mimikyu-disguised";
            break;
        case("toxtricity"):
            name = "toxtricity-amped";
            break;
        case("eiscue"):
            name = "eiscue-ice";
            break;
        case("indeedee"):
            name = "indeedee-male";
            break;
        case("zacian"):
            name = "zacian-hero";
            break;
        case("zamazenta"):
            name = "zamazenta-hero";
            break;
        case("urshifu"):
            name = "urshifu-single-strike";
            break;
        default: 
            name;
    }
    return name;
}

export { checkDiffForme }
