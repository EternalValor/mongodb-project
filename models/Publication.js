const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  authors: [String],
  journal: String, // Periodique Scientifique
  volume: Number,
  issue: Number,
  year: Number,
  pages: {
    begin: Number,
    end: Number
  },
  IF: Number, // Impact Factor
  url: String,
  ISBN: String,
  legalDepo: String, // Depo legal
  publisher: String, // Maison d'edition
  location: String,
  chapTitle: String,
  date: String,
  meetingName: String, // Nom de la rencontre scientifique
  commType: String, // Type de la communication
  references: [String],
  country: String,
  advisor: String, // Directeur de these
  jury: [String],
  responsable: String,
  domicil: String, // Domiciliation du projet
  fundingOrganisation: String,
  length: String, // Duree
  endowment: Number, // Dotation
  convType: String, // Type de la convention
  institutions: [String],
  coordinator: String,
  funding: Number
});

const Publication = mongoose.model('publication', PublicationSchema);

module.exports = Publication;
