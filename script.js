const dnaFormElement = document.querySelector("#dna-form");
const DNAchain = document.querySelector('.DNAchain');
const mRNAchain = document.querySelector('.mRNAchain');
const proteinChain = document.querySelector('.protein-structure');
const aminoAcidChain3 = document.querySelector('.protein-chain-3letters');
const aminoAcidChain1 = document.querySelector('.protein-chain-1letter');
const captions3 = ["Ala", "Arg", "Asn", "Asp", "Cys", "Gln", "Glu", "Gly", "His", "Ile", "Leu", "Lys", "Met", "Phe", "Pro", "Ser", "Thr", "Trp", "Tyr", "Val", "STOP"];
const captions1 = ["A", "R", "N", "D", "C", "Q", "E", "G", "H", "I", "L", "K", "M", "F", "P", "S", "T", "W", "Y", "V", "STOP"];

dnaFormElement.addEventListener('submit', function(event){
    event.preventDefault();
    proteinChain.innerHTML = '';
    const DNAinput = event.target.querySelector('[name="dna-field"]').value.toUpperCase().split('');
    document.getElementsByName("dna-field")[0].value = '';
    DNAchain.innerHTML = `DNA: ${DNAinput.join('')}`;
    proteinStructure(DNAinput);
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
    mRNAchain.innerHTML = `mRNA: ${transcript.join('')}`;
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
    let protein1letter = [];
    for (i = 0; i < anticodon.length; i++){
        switch (true){
            case (anticodon[i].toString() === "U,A,A") || (anticodon[i].toString() === "U,A,G") || (anticodon[i].toString() === "U,A,U"):
                protein.push("Ile");
                protein1letter.push("I");
                break;
            case (anticodon[i].toString() === "A,A,U") || (anticodon[i].toString() === "A,A,C") || (anticodon[i].toString() === "G,A,A") || (anticodon[i].toString() === "G,A,G") || (anticodon[i].toString() === "G,A,U") || (anticodon[i].toString() === "G,A,C"):
                protein.push("Leu");
                protein1letter.push("L");
                break;
            case (anticodon[i].toString() === "C,A,A") || (anticodon[i].toString() === "C,A,G") || (anticodon[i].toString() === "C,A,U") || (anticodon[i].toString() === "C,A,C"):
                protein.push("Val");
                protein1letter.push("V");
                break;
            case (anticodon[i].toString() === "A,A,A") || (anticodon[i].toString() === "A,A,G"):
                protein.push("Phe");
                protein1letter.push("F");
                break;
            case (anticodon[i].toString() === "U,A,C"):
                protein.push("Met");
                protein1letter.push("M");
                break;
            case (anticodon[i].toString() === "A,C,A") || (anticodon[i].toString() === "A,C,G"):
                protein.push("Cys");
                protein1letter.push("C");
                break;
            case (anticodon[i].toString() === "C,G,A") || (anticodon[i].toString() === "C,G,G") || (anticodon[i].toString() === "C,G,U") || (anticodon[i].toString() === "C,G,C"):
                protein.push("Ala");
                protein1letter.push("A");
                break;
            case (anticodon[i].toString() === "C,C,A") || (anticodon[i].toString() === "C,C,G") || (anticodon[i].toString() === "C,C,U") || (anticodon[i].toString() === "C,C,C"):
                protein.push("Gly");
                protein1letter.push("G");
                break;
            case (anticodon[i].toString() === "G,G,A") || (anticodon[i].toString() === "G,G,G") || (anticodon[i].toString() === "G,G,U") || (anticodon[i].toString() === "G,G,C"):
                protein.push("Pro");
                protein1letter.push("P");
                break;
            case (anticodon[i].toString() === "U,G,A") || (anticodon[i].toString() === "U,G,G") || (anticodon[i].toString() === "U,G,U") || (anticodon[i].toString() === "U,G,C"):
                protein.push("Thr");
                protein1letter.push("T");
                break;
            case (anticodon[i].toString() === "A,G,A") || (anticodon[i].toString() === "A,G,G") || (anticodon[i].toString() === "A,G,U") || (anticodon[i].toString() === "A,G,C") || (anticodon[i].toString() === "U,C,A") || (anticodon[i].toString() === "U,C,G"):
                protein.push("Ser");
                protein1letter.push("S");
                break;
            case (anticodon[i].toString() === "A,U,A") || (anticodon[i].toString() === "A,U,G"):
                protein.push("Tyr");
                protein1letter.push("Y");
                break;
            case (anticodon[i].toString() === "A,C,C"):
                protein.push("Trp");
                protein1letter.push("W");
                break;
            case (anticodon[i].toString() === "G,U,U") || (anticodon[i].toString() === "G,U,C"):
                protein.push("Gln");
                protein1letter.push("Q");
                break;
            case (anticodon[i].toString() === "U,U,A") || (anticodon[i].toString() === "U,U,G"):
                protein.push("Asn");
                protein1letter.push("N");
                break;
            case (anticodon[i].toString() === "G,U,A") || (anticodon[i].toString() === "G,U,G"):
                protein.push("His");
                protein1letter.push("H");
                break;
            case (anticodon[i].toString() === "C,U,U") || (anticodon[i].toString() === "C,U,C"):
                protein.push("Glu");
                protein1letter.push("E");
                break;
            case (anticodon[i].toString() === "C,U,A") || (anticodon[i].toString() === "C,U,G"):
                protein.push("Asp");
                protein1letter.push("D");
                break;
            case (anticodon[i].toString() === "U,U,C") || (anticodon[i].toString() === "U,U,U"):
                protein.push("Lys");
                protein1letter.push("K");
                break;
            case (anticodon[i].toString() === "G,C,A") || (anticodon[i].toString() === "G,C,G") || (anticodon[i].toString() === "G,C,U") || (anticodon[i].toString() === "G,C,C") || (anticodon[i].toString() === "U,C,U") || (anticodon[i].toString() === "U,C,C"):
                protein.push("Arg");
                protein1letter.push("R");
                break;
            case (anticodon[i].toString() === "A,U,U") || (anticodon[i].toString() === "A,U,C") || (anticodon[i].toString() === "A,C,U"):
                protein.push("Stop");
                protein1letter.push("Stop");
                break;    
        }
    }
    aminoAcidChain3.innerHTML= `Polypeptide chain (3 letters): ${protein.join('-')}`;
    aminoAcidChain1.innerHTML= `Polypeptide chain (1 letter): ${protein1letter.join('-')}`;
    return protein;
}

/**Creates new amino acid in chain.
 * Creates new html elements that contains images and names of amino acids.
 * @param {String} imgsource represents file pathway
 * @param {Array} imgcaption3 represents 3 letter amino acid name
 * @param {Array} imgcaption1 represents 1 letter amino acid name
 */
function newAminoAcid(imgsource, imgcaption3, imgcaption1){
    const acidImage = document.createElement("span");
    proteinChain.appendChild(acidImage);
    acidImage.innerHTML = 
        `<figure>
            <img class="amino-acid" src="${imgsource}">
            <figcaption>
                <p>${imgcaption3}</p>
                <p>${imgcaption1}</p>
            </figcaption>
        </figure>`   
}

/** Protein structure
 *  Displays protein structure
 * @param {Array} nucleicAcid 
 */
function proteinStructure(nucleicAcid){
    protein = proteinSynthesis(nucleicAcid);
    let imageSource = '';
    if (protein.length == 1) {
        switch (true){
            case (protein[0] === "Ala"):
                imageSource = "./amino_acids/acid-single/Ala.jpg";
                newAminoAcid(imageSource, captions3[0], captions1[0]);
                break;
            case (protein[0] === "Arg"):
                imageSource = "./amino_acids/acid-single/Arg.jpg";
                newAminoAcid(imageSource, captions3[1], captions1[1]);
                break;
            case (protein[0] === "Asn"):
                imageSource = "./amino_acids/acid-single/Asn.jpg";
                newAminoAcid(imageSource, captions3[2], captions1[2]);
                break;
            case (protein[0] === "Asp"):
                imageSource = "./amino_acids/acid-single/Asp.jpg";
                newAminoAcid(imageSource, captions3[3], captions1[3]);
                break;
            case (protein[0] === "Cys"):
                imageSource = "./amino_acids/acid-single/Cys.jpg";
                newAminoAcid(imageSource, captions3[4], captions1[4]);
                break;
            case (protein[0] === "Gln"):
                imageSource = "./amino_acids/acid-single/Gln.jpg";
                newAminoAcid(imageSource, captions3[5], captions1[5]);
                break;
            case (protein[0] === "Glu"):
                imageSource = "./amino_acids/acid-single/Glu.jpg";
                newAminoAcid(imageSource, captions3[6], captions1[6]);
                break;
            case (protein[0] === "Gly"):
                imageSource = "./amino_acids/acid-single/Gly.jpg";
                newAminoAcid(imageSource, captions3[7], captions1[7]);
                break;
            case (protein[0] === "His"):
                imageSource = "./amino_acids/acid-single/His.jpg";
                newAminoAcid(imageSource, captions3[8], captions1[8]);
                break;
            case (protein[0] === "Ile"):
                imageSource = "./amino_acids/acid-single/Ile.jpg";
                newAminoAcid(imageSource, captions3[9], captions1[9]);
                break;
            case (protein[0] === "Leu"):
                imageSource = "./amino_acids/acid-single/Leu.jpg";
                newAminoAcid(imageSource, captions3[10], captions1[10]);
                break;
            case (protein[0] === "Lys"):
                imageSource = "./amino_acids/acid-single/Lys.jpg";
                newAminoAcid(imageSource, captions3[11], captions1[11]);
                break;
            case (protein[0] === "Met"):
                imageSource = "./amino_acids/acid-single/Met.jpg";
                newAminoAcid(imageSource, captions3[12], captions1[12]);
                break;
            case (protein[0] === "Phe"):
                imageSource = "./amino_acids/acid-single/Phe.jpg";
                newAminoAcid(imageSource, captions3[13], captions1[13]);
                break;
            case (protein[0] === "Pro"):
                imageSource = "./amino_acids/acid-single/Pro.jpg";
                newAminoAcid(imageSource, captions3[14], captions1[14]);
                break;
            case (protein[0] === "Ser"):
                imageSource = "./amino_acids/acid-single/Ser.jpg";
                newAminoAcid(imageSource, captions3[15], captions1[15]);
                break;
            case (protein[0] === "Thr"):
                imageSource = "./amino_acids/acid-single/Thr.jpg";
                newAminoAcid(imageSource, captions3[16], captions1[16]);
                break;
            case (protein[0] === "Trp"):
                imageSource = "./amino_acids/acid-single/Trp.jpg";
                newAminoAcid(imageSource, captions3[17], captions1[17]);
                break;
            case (protein[0] === "Tyr"):
                imageSource = "./amino_acids/acid-single/Tyr.jpg";
                newAminoAcid(imageSource, captions3[18], captions1[18]);
                break;
            case (protein[0] === "Val"):
                imageSource = "./amino_acids/acid-single/Val.jpg";
                newAminoAcid(imageSource, captions3[19], captions1[19]);
                break;
            default:
                imageSource = "./amino_acids/stop.jpg";
                newAminoAcid(imageSource, captions3[20], captions1[20]);
        }
    } else {
        for (i = 0; i < protein.length; i++){
        switch(true){
            case (protein[i] === "Ala"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Ala-start.jpg";
                    newAminoAcid(imageSource, captions3[0], captions1[0]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Ala-end.jpg";
                    newAminoAcid(imageSource, captions3[0], captions1[0]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Ala-mid.jpg";
                    newAminoAcid(imageSource, captions3[0], captions1[0]);
                }
                break;
            case (protein[i] === "Arg"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Arg-start.jpg";
                    newAminoAcid(imageSource, captions3[1], captions1[1]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Arg-end.jpg";
                    newAminoAcid(imageSource, captions3[1], captions1[1]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Arg-mid.jpg";
                    newAminoAcid(imageSource, captions3[1], captions1[1]);
                }
                break;
            case (protein[i] === "Asn"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Asn-start.jpg";
                    newAminoAcid(imageSource, captions3[2], captions1[2]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Asn-end.jpg";
                    newAminoAcid(imageSource, captions3[2], captions1[2]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Asn-mid.jpg";
                    newAminoAcid(imageSource, captions3[2], captions1[2]);
                }
                break;
            case (protein[i] === "Asp"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Asp-start.jpg";
                    newAminoAcid(imageSource, captions3[3], captions1[3]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Asp-end.jpg";
                    newAminoAcid(imageSource, captions3[3], captions1[3]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Asp-mid.jpg";
                    newAminoAcid(imageSource, captions3[3], captions1[3]);
                }
                break;
            case (protein[i] === "Cys"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Cys-start.jpg";                    
                    newAminoAcid(imageSource, captions3[4], captions1[4]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Cys-end.jpg";
                    newAminoAcid(imageSource, captions3[4], captions1[4]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Cys-mid.jpg";
                    newAminoAcid(imageSource, captions3[4], captions1[4]);
                }
                break;
            case (protein[i] === "Gln"):
                let imageCaption = "Gln";
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Gln-start.jpg";
                    newAminoAcid(imageSource, captions3[5], captions1[5]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Gln-end.jpg";
                    newAminoAcid(imageSource, captions3[5], captions1[5]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Gln-mid.jpg";
                    newAminoAcid(imageSource, captions3[5], captions1[5]);
                }
                break;
            case (protein[i] === "Glu"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Glu-start.jpg";
                    newAminoAcid(imageSource, captions3[6], captions1[6]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Glu-end.jpg";
                    newAminoAcid(imageSource, captions3[6], captions1[6]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Glu-mid.jpg";
                    newAminoAcid(imageSource, captions3[6], captions1[6]);
                }
                break;
            case (protein[i] === "Gly"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Gly-start.jpg";
                    newAminoAcid(imageSource, captions3[7], captions1[7]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Gly-end.jpg";
                    newAminoAcid(imageSource, captions3[7], captions1[7]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Gly-mid.jpg";
                    newAminoAcid(imageSource, captions3[7], captions1[7]);
                }
                break;
            case (protein[i] === "His"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/His-start.jpg";
                    newAminoAcid(imageSource, captions3[8], captions1[8]);
                } else if (protein.indexOf("His") == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/His-end.jpg";
                    newAminoAcid(imageSource, captions3[8], captions1[8]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/His-mid.jpg";
                    newAminoAcid(imageSource, captions3[8], captions1[8]);
                }
                break;
            case (protein[i] === "Ile"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Ile-start.jpg";
                    newAminoAcid(imageSource, captions3[9], captions1[9]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Ile-end.jpg";
                    newAminoAcid(imageSource, captions3[9], captions1[9]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Ile-mid.jpg";
                    newAminoAcid(imageSource, captions3[9], captions1[9]);
                }
                break;
            case (protein[i] === "Leu"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Leu-start.jpg";
                    newAminoAcid(imageSource, captions3[10], captions1[10]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Leu-end.jpg";
                    newAminoAcid(imageSource, captions3[10], captions1[10]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Leu-mid.jpg";
                    newAminoAcid(imageSource, captions3[10], captions1[10]);
                }
                break;
            case (protein[i] === "Lys"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Lys-start.jpg";
                    newAminoAcid(imageSource, captions3[11], captions1[11]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Lys-end.jpg";
                    newAminoAcid(imageSource, captions3[11], captions1[11]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Lys-mid.jpg";
                    newAminoAcid(imageSource, captions3[11], captions1[11]);
                } 
                break;
            case (protein[i] === "Met"):
                if (i == 0) {
                    console.log(protein.indexOf("Met"));
                    let imageSource = "./amino_acids/acid-start/Met-start.jpg";
                    newAminoAcid(imageSource, captions3[12], captions1[12]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Met-end.jpg";
                    newAminoAcid(imageSource, captions3[12], captions1[12]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Met-mid.jpg";
                    newAminoAcid(imageSource, captions3[12], captions1[12]);
                }
                break;
            case (protein[i] === "Phe"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Phe-start.jpg";
                    newAminoAcid(imageSource, captions3[13], captions1[13]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Phe-end.jpg";
                    newAminoAcid(imageSource, captions3[13], captions1[13]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Phe-mid.jpg";
                    newAminoAcid(imageSource, captions3[13], captions1[13]);
                }
                break;
            case (protein[i] === "Pro"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Pro-start.jpg";
                    newAminoAcid(imageSource, captions3[14], captions1[14]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Pro-end.jpg";
                    newAminoAcid(imageSource, captions3[14], captions1[14]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Pro-mid.jpg";
                    newAminoAcid(imageSource, captions3[14], captions1[14]);
                }
                break;
            case (protein[i] === "Ser"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Ser-start.jpg";
                    newAminoAcid(imageSource, captions3[15], captions1[15]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Ser-end.jpg";
                    newAminoAcid(imageSource, captions3[15], captions1[15]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Ser-mid.jpg";
                    newAminoAcid(imageSource, captions3[15], captions1[15]);
                }
                break;
            case (protein[i] === "Thr"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Thr-start.jpg";
                    newAminoAcid(imageSource, captions3[16], captions1[16]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Thr-end.jpg";
                    newAminoAcid(imageSource, captions3[16], captions1[16]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Thr-mid.jpg";
                    newAminoAcid(imageSource, captions3[16], captions1[16]);
                }
                break;
            case (protein[i] === "Trp"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Trp-start.jpg";
                    newAminoAcid(imageSource, captions3[17], captions1[17]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Trp-end.jpg";
                    newAminoAcid(imageSource, captions3[17], captions1[17]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Trp-mid.jpg";
                    newAminoAcid(imageSource, captions3[17], captions1[17]);
                }
                break;
            case (protein[i] === "Tyr"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Tyr-start.jpg";
                    newAminoAcid(imageSource, captions3[18], captions1[18]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Tyr-end.jpg";
                    newAminoAcid(imageSource, captions3[18], captions1[18]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Tyr-mid.jpg";
                    newAminoAcid(imageSource, captions3[18], captions1[18]);
                }
                break;
            case (protein[i] === "Val"):
                if (i == 0) {
                    let imageSource = "./amino_acids/acid-start/Val-start.jpg";
                    newAminoAcid(imageSource, captions3[19], captions1[19]);
                } else if (i == protein.length - 1) {
                    let imageSource = "./amino_acids/acid-end/Val-end.jpg";
                    newAminoAcid(imageSource, captions3[19], captions1[19]);
                } else {
                    let imageSource = "./amino_acids/acid-mid/Val-mid.jpg";
                    newAminoAcid(imageSource, captions3[19], captions1[19]);
                }
                break;
            default:
                let imageSource = "./amino_acids/stop.jpg";
                newAminoAcid(imageSource, captions3[20], captions1[20]);
        }
    }
    }
    
}