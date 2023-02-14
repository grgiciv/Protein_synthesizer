const dnaFormElement = document.querySelector("#dna-form");

dnaFormElement.addEventListener('submit', function(event){
    event.preventDefault();
    const DNAinput = event.target.querySelector('[name="dna-field"]').value.split('');
    const regex = /[ATCG]/;
    let result = regex.test(DNAinput);
    if (result) {
        proteinStructure(DNAinput);
    } else {
        alert("Please use only characters A, T, G or C");
    }
});


/** DNA replication:
 * Simulates DNA replication process by creating array which contains complementary base pairs to that of given DNA chain.
 * @param {Array} nucleicAcid 
 * @returns {Array}
 */
function DNAreplication(nucleicAcid){
    for (let i = 0; i < nucleicAcid.length; i++){
        if (nucleicAcid[i] === "T"){
            nucleicAcid[i] = "A";
        } else if (nucleicAcid[i] === "C"){
            nucleicAcid[i] = "G";
        } else if (nucleicAcid[i] === "G"){
            nucleicAcid[i] = "C";
        } else if (nucleicAcid[i] === "A"){
            nucleicAcid[i] = "T";
        }
    }
    return nucleicAcid;
}

/** mRNAtranscription:
 * Simulates transcription process of DNA. Returns mRNA as an array that can be processed in other biologcial functions.
 * @param {Array} nucleicAcid 
 * @returns {Array} returns value of RNA transcription
 */
function mRNAtranscription(nucleicAcid){
    let transcript = [];
    for (let i = 0; i < nucleicAcid.length; i++){
        if (nucleicAcid[i] === "T"){
          transcript.push("A");
        } else if (nucleicAcid[i] === "C"){
          transcript.push("G")
        } else if (nucleicAcid[i] === "G"){
          transcript.push("C")
        } else if (nucleicAcid[i] === "A"){
          transcript.push("U")
        }
    }
    return transcript;
}

/** Anti codon generator:
 * Generates a 2D array representing anticodon sequence which is used in protein synthesis
 * @param {Array} nucleicAcid 
 * @returns {Array}
 */
function antiCodoneGenerator (nucleicAcid){
    let antiCodoneSequence = codonGenerator(nucleicAcid);
    for(var i = 0; i < antiCodoneSequence.length; i++) {
        for(var j = 0; j < antiCodoneSequence[i].length; j++) {
            if (antiCodoneSequence[i][j] === "U"){
                antiCodoneSequence[i][j] = "A";
            } else if (antiCodoneSequence[i][j] === "C"){
                antiCodoneSequence[i][j] = "G";
            } else if (antiCodoneSequence[i][j] === "G"){
                antiCodoneSequence[i][j] = "C";
            } else if (antiCodoneSequence[i][j] === "A"){
                antiCodoneSequence[i][j] = "U";
            }
        }
    }
    return antiCodoneSequence;
}

/** Codon generator
 * Creates 2D representation of codon sequence from mRNA. 
 * @param {Array} nucleicAcid 
 */
function codonGenerator(nucleicAcid){
    let messenger = mRNAtranscription(nucleicAcid);
    let codoneSequence = [];
    for (i = 0; i < messenger.length; i+=3){
        let codone = messenger.slice(i, i + 3);
        codoneSequence.push(codone);
    }
    return codoneSequence;
}

/** Protein synthesis
 * Creates amino acid chain represented by an array.
 * @param {Array} nucleicAcid 
 * @returns 
 */
function proteinSynthesis(nucleicAcid){
    let anticodon = antiCodoneGenerator(nucleicAcid);
    let protein = [];
    for (i = 0; i < anticodon.length; i++){
        switch (true){
            case (anticodon[i].toString() === "U,A,A") || (anticodon[i].toString() === "U,A,G") || (anticodon[i].toString() === "U,A,U"):
                protein.push("Ile");
                break;
            case (anticodon[i].toString() === "A,A,U") || (anticodon[i].toString() === "A,A,C") || (anticodon[i].toString() === "G,A,A") || (anticodon[i].toString() === "G,A,G") || (anticodon[i].toString() === "G,A,U") || (anticodon[i].toString() === "G,A,C"):
                protein.push("Leu");
                break;
            case (anticodon[i].toString() === "C,A,A") || (anticodon[i].toString() === "C,A,G") || (anticodon[i].toString() === "C,A,U") || (anticodon[i].toString() === "C,A,C"):
                protein.push("Val");
                break;
            case (anticodon[i].toString() === "A,A,A") || (anticodon[i].toString() === "A,A,G"):
                protein.push("Phe");
                break;
            case (anticodon[i].toString() === "U,A,C"):
                protein.push("Met");
                break;
            case (anticodon[i].toString() === "A,C,A") || (anticodon[i].toString() === "A,C,G"):
                protein.push("Cys");
                break;
            case (anticodon[i].toString() === "C,G,A") || (anticodon[i].toString() === "C,G,G") || (anticodon[i].toString() === "C,G,U") || (anticodon[i].toString() === "C,G,C"):
                protein.push("Ala");
                break;
            case (anticodon[i].toString() === "C,C,A") || (anticodon[i].toString() === "C,C,G") || (anticodon[i].toString() === "C,C,U") || (anticodon[i].toString() === "C,C,C"):
                protein.push("Gly");
                break;
            case (anticodon[i].toString() === "G,G,A") || (anticodon[i].toString() === "G,G,G") || (anticodon[i].toString() === "G,G,U") || (anticodon[i].toString() === "G,G,C"):
                protein.push("Pro");
                break;
            case (anticodon[i].toString() === "U,G,A") || (anticodon[i].toString() === "U,G,G") || (anticodon[i].toString() === "U,G,U") || (anticodon[i].toString() === "U,G,C"):
                protein.push("Thr");
                break;
            case (anticodon[i].toString() === "A,G,A") || (anticodon[i].toString() === "A,G,G") || (anticodon[i].toString() === "A,G,U") || (anticodon[i].toString() === "A,G,C") || (anticodon[i].toString() === "U,C,A") || (anticodon[i].toString() === "U,C,G"):
                protein.push("Ser");
                break;
            case (anticodon[i].toString() === "A,U,A") || (anticodon[i].toString() === "A,U,G"):
                protein.push("Tyr");
                break;
            case (anticodon[i].toString() === "A,C,C"):
                protein.push("Trp");
                break;
            case (anticodon[i].toString() === "G,U,U") || (anticodon[i].toString() === "G,U,C"):
                protein.push("Gln");
                break;
            case (anticodon[i].toString() === "U,U,A") || (anticodon[i].toString() === "U,U,G"):
                protein.push("Asn");
                break;
            case (anticodon[i].toString() === "G,U,A") || (anticodon[i].toString() === "G,U,G"):
                protein.push("His");
                break;
            case (anticodon[i].toString() === "C,U,U") || (anticodon[i].toString() === "C,U,C"):
                protein.push("Glu");
                break;
            case (anticodon[i].toString() === "C,U,A") || (anticodon[i].toString() === "C,U,G"):
                protein.push("Asp");
                break;
            case (anticodon[i].toString() === "U,U,C") || (anticodon[i].toString() === "U,U,U"):
                protein.push("Lys");
                break;
            case (anticodon[i].toString() === "G,C,A") || (anticodon[i].toString() === "G,C,G") || (anticodon[i].toString() === "G,C,U") || (anticodon[i].toString() === "G,C,C") || (anticodon[i].toString() === "U,C,U") || (anticodon[i].toString() === "U,C,C"):
                protein.push("Arg");
                break;
            case (anticodon[i].toString() === "A,U,U") || (anticodon[i].toString() === "A,U,C") || (anticodon[i].toString() === "A,C,U"):
                protein.push("Stop");
                break;    
        }
    }
    return protein;
}

/**Create new amino acid in chain
 * Creates new html elements that contain images of amino acids.
 * @param {String} source represents file pathway
 */
function newAminoAcid(source){
    const protein = document.querySelector(".protein-chain");
    const acidImage = document.createElement("span");
    protein.appendChild(acidImage);
    acidImage.innerHTML = `<img class="amino-acid" src="${source}">`   
}

/** Protein structure
 *  Displays protein structure
 * @param {Array} nucleicAcid 
 */
function proteinStructure(nucleicAcid){
    protein = proteinSynthesis(nucleicAcid);
    for (i = 0; i < protein.length; i++){
        switch(true){
            case (protein[i] === "Ala"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Ala-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Ala-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Ala-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Arg"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Arg-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Arg-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Arg-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Asn"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Asn-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Asn-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Asn-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Asp"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Asp-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Asp-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Asp-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Cys"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Cys-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Cys-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Cys-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Gln"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Gln-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Gln-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Gln-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Glu"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Glu-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Glu-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Glu-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Gly"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Gly-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Gly-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Gly-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "His"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/His-start.jpg";
                    newAminoAcid(imageSource);
                } else if (protein.indexOf("His") == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/His-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/His-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Ile"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Ile-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Ile-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Ile-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Leu"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Leu-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Leu-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Leu-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Lys"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Lys-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Lys-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Lys-mid.jpg";
                    newAminoAcid(imageSource);
                } 
                break;
            case (protein[i] === "Met"):
                if (i == 0) {
                    console.log(protein.indexOf("Met"));
                    let imageSource = "./amino_acids/acid-start/Met-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Met-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Met-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Phe"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Phe-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Phe-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Phe-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Pro"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Pro-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Pro-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Pro-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Ser"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Ser-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Ser-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Ser-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Thr"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Thr-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Thr-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Thr-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Trp"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Trp-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Trp-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Trp-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Tyr"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Tyr-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Tyr-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Tyr-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            case (protein[i] === "Val"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Val-start.jpg";
                    newAminoAcid(imageSource);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Val-end.jpg";
                    newAminoAcid(imageSource);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Val-mid.jpg";
                    newAminoAcid(imageSource);
                }
                break;
            default:
                let imageSource = "./amino_acids/stop.jpg";
                newAminoAcid(imageSource);
        }
    }
}