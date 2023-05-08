# Protein Synthesizer
## A little app for generating amino acid chains from DNA sequence
### What is a DNA?
A DNA is a macromolecule that contains instructions for protein synthesis. DNA is made of two linked strands that wind around each other to resemble a twisted ladder — a shape known as a double helix. Each strand has a backbone made of alternating sugar (deoxyribose) and phosphate groups. Attached to each sugar is one of four bases: adenine (A), cytosine (C), guanine (G) or thymine (T). The two strands are connected by chemical bonds between the bases: adenine bonds with thymine, and cytosine bonds with guanine. The sequence of the bases along DNA’s backbone encodes biological information, such as the instructions for making a protein or RNA molecule.
Protein synthesis consists of 3 steps:
1. Transcription - a process in which DNA strand is transcribed into mRNA.
2. Translation - a process in which mRNA is translated into polypeptide chain.
3. Protein folding and post-translational modifications - processes in which protein gets its final form (not covered by this app).
### Transcription
Transcription is the process of copying a segment of DNA into RNA. The segments of DNA transcribed into RNA molecules that can encode proteins are said to produce messenger RNA (mRNA).<br>
The app takes user input of DNA and uses function *mRNAtranscription* which loops thorugh DNA array and exchanges T, C, G, A for A, G, C, U.
### Translation
Translation is the process in which ribosomes synthesize proteins after the process of transcription of DNA to RNA. Messenger RNA (mRNA) is decoded in a ribosome to produce a specific amino acid chain, or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons.
Translation is represented by a couple of functions:
1. Function *codonGenerator* - uses mRNA array and slices it in sequences of 3 nucleic bases, returns array codonSequence
2. Function *antiCodonGenerator* - uses codonSequence and loops through it exchanging U, C, G, A for A, G, C, U thus creating antiCodonSequence.
3. Function *proteinSynthesis* - loops through antiCodonSequence and creates new array which contains amino acids. Function detects specific triplets of nucleic acid bases and if triplet corresponds to amino acid, it adds amino acid to array.
4. Function *proteinStructure* - creates image sequence of amino acids based on array that *proteinSynthesis* returned.
