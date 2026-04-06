/**
 * CMS Database Seed Script
 * Run once from the project root: node seed.js
 * Drops existing collections and re-inserts all dummy data.
 */

const mongoose = require('mongoose');

// ── Models ──────────────────────────────────────────────────────────────────
const Document = require('./server/models/document');
const Message  = require('./server/models/message');
const Contact  = require('./server/models/contact');
const Sequence = require('./server/models/sequence');

const ObjectId = mongoose.Types.ObjectId;

// ── Seed Data ────────────────────────────────────────────────────────────────

// contacts.json — ObjectId strings converted to ObjectId instances
const contactsData = [
  { _id: new ObjectId('58c767386f1d58ebc37af1e9'), id: '1',   name: 'Rex Barzee',        email: 'barzeer@byui.edu',       phone: '208-496-3768', imageUrl: '../assets/images/barzeer.jpg',       group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1ea'), id: '2',   name: 'Bradley Armstrong', email: 'armstrongb@byui.edu',    phone: '208-496-3766', imageUrl: '../assets/images/armstrongb.jpg',    group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1eb'), id: '3',   name: 'Lee Barney',        email: 'barneyl@byui.edu',       phone: '208-496-3767', imageUrl: '../assets/images/barneyl.jpg',       group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1ec'), id: '5',   name: 'Kory Godfrey',      email: 'godfreyko@byui.edu',     phone: '208-496-3770', imageUrl: '../assets/images/godfreyko.jpg',     group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1ed'), id: '7',   name: 'R. Kent Jackson',   email: 'jacksonk@byui.edu',      phone: '208-496-3771', imageUrl: '../assets/images/jacksonk.jpg',      group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1ee'), id: '8',   name: 'Craig Lindstrom',   email: 'lindstromc@byui.edu',    phone: '208-496-3769', imageUrl: '../assets/images/lindstromc.jpg',    group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1ef'), id: '9',   name: 'Michael McLaughlin',email: 'mclaughlinm@byui.edu',   phone: '208-496-3772', imageUrl: '../assets/images/mclaughlinm.jpg',   group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1f0'), id: '11',  name: 'Brent Morring',     email: 'morringb@byui.edu',      phone: '208-496-3778', imageUrl: '../assets/images/morringb.jpg',      group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1f1'), id: '12',  name: 'Mark Olaveson',     email: 'olavesonm@byui.edu',     phone: '208-496-3773', imageUrl: '../assets/images/olavesonm.jpg',     group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1f2'), id: '13',  name: 'Steven Rigby',      email: 'rigbys@byui.edu',        phone: '208-496-3774', imageUrl: '../assets/images/rigbys.jpg',        group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1f3'), id: '15',  name: 'Blaine Robertson',  email: 'robertsonb@byui.edu',    phone: '208-496-3775', imageUrl: '../assets/images/robertsonb.jpg',    group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1f4'), id: '16',  name: 'Randy Somsen',      email: 'somsenr@byui.edu',       phone: '208-496-3776', imageUrl: '../assets/images/somsenr.jpg',       group: [] },
  { _id: new ObjectId('58c767386f1d58ebc37af1f5'), id: '17',  name: 'Shane Thompson',    email: 'thompsonda@byui.edu',    phone: '208-496-3776', imageUrl: '../assets/images/thompsonda.jpg',    group: [] },
  // Group contacts — group arrays reference the ObjectIds above
  {
    _id: new ObjectId('58c8cbf2ead5414d33ea8beb'),
    id: '104', name: 'Programming team', email: null, phone: null, imageUrl: null,
    group: [
      new ObjectId('58c767386f1d58ebc37af1e9'), // Rex Barzee
      new ObjectId('58c767386f1d58ebc37af1eb'), // Lee Barney
      new ObjectId('58c767386f1d58ebc37af1ed'), // R. Kent Jackson
      new ObjectId('58c767386f1d58ebc37af1f1'), // Mark Olaveson
    ]
  },
  {
    _id: new ObjectId('58cac74b4690c438e0976b09'),
    id: '105', name: 'Database team', email: null, phone: null, imageUrl: null,
    group: [
      new ObjectId('58c767386f1d58ebc37af1ed'), // R. Kent Jackson
      new ObjectId('58c767386f1d58ebc37af1ef'), // Michael McLaughlin
      new ObjectId('58c767386f1d58ebc37af1f0'), // Brent Morring
    ]
  },
  {
    _id: new ObjectId('58cac77b4690c438e0976b0a'),
    id: '106', name: 'Networking team', email: null, phone: null, imageUrl: null,
    group: [
      new ObjectId('58c767386f1d58ebc37af1ea'), // Bradley Armstrong
      new ObjectId('58c767386f1d58ebc37af1ee'), // Craig Lindstrom
      new ObjectId('58c767386f1d58ebc37af1f2'), // Steven Rigby
    ]
  },
];

// documents.json
const documentsData = [
  { _id: new ObjectId('58cb2ab6a187c5aa1124e30f'), id: '1',  name: 'CIT 425 - Data Warehousing',            url: 'https://rkjdatawarehousing.wordpress.com/', children: [
    { id: '2', name: 'Project 1 – The Kimball Method',          url: 'https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/' },
    { id: '3', name: 'Project 2 – Data warehouses vs. marts',   url: 'https://rkjdatawarehousing.wordpress.com/projects/project-2-data-warehouses-vs-marts/' },
    { id: '4', name: 'Project 3 – The ETL Process',             url: 'https://rkjdatawarehousing.wordpress.com/projects/project-3-the-etl-process/' },
    { id: '5', name: 'Project 4 – Modify the OLTP design',      url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4-oltp-modifications-to-erp-design/' },
    { id: '6', name: 'Project 5 – The OLAP design',             url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4/' },
    { id: '7', name: 'Project 6 – Transforming data',           url: 'https://rkjdatawarehousing.wordpress.com/projects/transforming-data/' },
    { id: '8', name: 'Project 7 – MarkLogic',                   url: 'https://rkjdatawarehousing.wordpress.com/projects/project-7-marklogic/' },
    { id: '9', name: 'Project 8 – Build a web application',     url: 'https://rkjdatawarehousing.wordpress.com/projects/project-8/' },
  ]},
  { _id: new ObjectId('58cb2ab6a187c5aa1124e310'), id: '10', name: 'CIT 460 - Enterprise Development',      url: 'https://rkjackson.wordpress.com/', description: null, children: [
    { id: '12', name: 'Case 1 – Defining the requirements',       url: 'https://rkjackson.wordpress.com/cases/case-1/' },
    { id: '13', name: 'Case 2 – User Interface design',           url: 'https://rkjackson.wordpress.com/cases/case-2/' },
    { id: '14', name: 'Case 3 – Implementing Model Layer',        url: 'https://rkjackson.wordpress.com/cases/case-3/', children: [
      { id: '36', name: 'Team Assignment',       description: 'Create your first JavaBean class' },
      { id: '37', name: 'Individual Assignment', description: 'Create remaining JavaBean classes' },
    ]},
    { id: '15', name: 'Case 4 – Enterprise Java Session Beans',   url: 'https://rkjackson.wordpress.com/cases/case-4/' },
    { id: '16', name: 'Case 5 – Implementing the View',           url: 'https://rkjackson.wordpress.com/cases/case-5/' },
    { id: '17', name: 'Case 6 – A Framework for the View Layer',  url: 'https://rkjackson.wordpress.com/cases/case-6/' },
  ]},
  { _id: new ObjectId('58cb2ab6a187c5aa1124e311'), id: '20', name: 'CIT 366 - Full Web Stack Development',  url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf', children: [
    { id: '21', name: 'Lesson 1 - JavaScript Best Practices', url: 'https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson1Introduction.pdf' },
    { id: '22', name: 'Lesson 2 - The DOM and JQuery',        url: 'https://content.byui.edu/file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/Lesson2Introduction.pdf' },
    { id: '23', name: 'Lesson 3 - Angular 2 Framework 1',    url: 'https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson3Introduction.pdf' },
    { id: '24', name: 'Lesson 4 - Angular 2 Framework 2',    url: 'https://content.byui.edu/file/2c4ddd6c-dce4-408d-b581-f254a13e4d10/1/Lesson4Introduction.pdf' },
    { id: '25', name: 'Lesson 5 - Angular 2 Framework 3',    url: 'https://content.byui.edu/file/66dc0765-22a7-4cd8-a184-942c607636fb/1/Lesson5Introduction.pdf' },
  ]},
  { _id: new ObjectId('58cb2ab6a187c5aa1124e312'), id: '40', name: 'CIT 366 - Full Web Stack Development',  url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e313'), id: '41', name: 'CIT 240 - Introduction to Networking',  url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e314'), id: '42', name: 'CIT 370 - Computer Security I',         url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e315'), id: '43', name: 'CIT 360 - Object Oriented Programming II', url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e316'), id: '44', name: 'CIT 470 - Computer Security II',        url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e317'), id: '45', name: 'CIT 262 - Mobile Development',         url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e318'), id: '46', name: 'CIT 230 - Web Page Development',       url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e319'), id: '47', name: 'CIT 236 - Web Development',            url: 'https://www.byui.edu/computer-information-technology/courses' },
  { _id: new ObjectId('58cb2ab6a187c5aa1124e31a'), id: '48', name: 'CIT 340 - Networking II',              url: 'https://www.byui.edu/computer-information-technology/courses' },
];

// messages.json — sender mapped from id string → ObjectId of matching contact
// id '7' = R. Kent Jackson, '13' = Steven Rigby, '3' = Lee Barney
const contactIdToObjectId = {
  '7':  new ObjectId('58c767386f1d58ebc37af1ed'),
  '13': new ObjectId('58c767386f1d58ebc37af1f2'),
  '3':  new ObjectId('58c767386f1d58ebc37af1eb'),
};
const messagesData = [
  { id: '1', subject: 'CIT 366 assignment 1',        msgText: 'The grades for this assignment have been posted.',          sender: contactIdToObjectId['7']  },
  { id: '2', subject: 'CIT 366 assignment 3',        msgText: 'When is assignment 3 due?',                                sender: contactIdToObjectId['13'] },
  { id: '3', subject: 'CIT 366 assignment 3 due date', msgText: 'Assignment 3 is due on Saturday at 11:30 PM.',           sender: contactIdToObjectId['7']  },
  { id: '4', subject: 'Assignment 3 help',            msgText: 'Can I meet with you sometime? I need help with assignment 3.', sender: contactIdToObjectId['3']  },
  { id: '5', subject: 'Assignment 3 help',            msgText: 'I can meet with you today at 4:00 PM in my office.',      sender: contactIdToObjectId['7']  },
];

// sequences.json
const sequencesData = [
  { maxDocumentId: 100, maxMessageId: 100, maxContactId: 100 }
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/cms');
    console.log('Connected to database.');

    // Drop all four collections (ignore errors if they don't exist yet)
    await Promise.all([
      mongoose.connection.collections['documents']?.drop().catch(() => {}),
      mongoose.connection.collections['messages']?.drop().catch(() => {}),
      mongoose.connection.collections['contacts']?.drop().catch(() => {}),
      mongoose.connection.collections['sequences']?.drop().catch(() => {}),
    ]);
    console.log('Cleared existing collections.');

    // Insert in order: contacts first (messages reference them)
    await Contact.insertMany(contactsData, { ordered: true });
    console.log(`Inserted ${contactsData.length} contacts.`);

    await Document.insertMany(documentsData, { ordered: true });
    console.log(`Inserted ${documentsData.length} documents.`);

    await Message.insertMany(messagesData, { ordered: true });
    console.log(`Inserted ${messagesData.length} messages.`);

    await Sequence.insertMany(sequencesData, { ordered: true });
    console.log('Inserted sequences document (maxDocumentId=100, maxMessageId=100, maxContactId=100).');

    console.log('\n✅ Seed complete. Run: nodemon server.js');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
