function getBuildings(eid){
  let toReturn = [];
  return db.collection("buildings").where("belongs_to", "==", eid).get()
    .then((bdData) => {
      bdData.forEach(bdDoc =>{
        toReturn.push({ bid: bdDoc.id, belongs_to: bdDoc.data().belongs_to, name: bdDoc.data().name, floors: [] });
      });
    })
    .then(() => {
      return toReturn;
    })
    .catch(err => { console.log(err); });
}

function getFloors(bid){
  let toReturn = [];
  return db.collection("floors").where("belongs_to", "==", bid).get()
    .then((flData) => {
      flData.forEach(flDoc => {
        toReturn.push({ fid: flDoc.id, belongs_to: flDoc.data().belongs_to, name: flDoc.data().name, locations: [] });
      });
    })
    .then(() => {
      return toReturn;
    })
    .catch(err => {console.log(err);});
}

function getLocations(fid){
  let toReturn = [];
  return db.collection("bulletin_boards").where("belongs_to", "==", fid).get()
  .then((bbData) => {
    bbData.forEach(bbDoc => {
      toReturn.push({
        lid: bbDoc.id,
        belongs_to: bbDoc.data().belongs_to,
        name: bbDoc.data().name,
        maxPosters: bbDoc.data().max_posters,
        width: bbDoc.data().width,
        height: bbDoc.data().height,
        posters: bbDoc.data().posters
      });
    });
  })
  .then(() => {
    return toReturn;
  })
  .catch(err => {console.log(err); });

}

function getPostersInBB(lid) {

}

function getPosterByName(poster_name){
  let toReturn = "";
  return st.child('Posters/' + poster_name).getDownloadURL()
    .then((url) => {
      toReturn = url
    })
    .then(() => {
      return toReturn;
    })
    .catch(err => {console.log(err); })
}

var tempData = [
  {name: "Blaze Woods", email: "Blaze.Woods@stonybrook.edu", edate: "2020-05-19"},
  {name: "Ibrahim Jacobson", email: "Ibrahim.Jacobson@stonybrook.edu", edate: "2020-05-19"},
  {name: "Annika Rios", email: "Annika.Rios@stonybrook.edu", edate: "2020-05-19"},
  {name: "Jensen Austin", email: "Jensen.Austin@stonybrook.edu", edate: "2020-05-20"},
  {name: "Dale Dale", email: "Dale.Dale@stonybrook.edu", edate: "2020-05-20"},
  {name: "Caroline Burnett", email: "Caroline.Burnett@stonybrook.edu", edate: "2020-06-13"},
  {name: "Kolten Schneider", email: "Kolten.Schneider@stonybrook.edu", edate: "2020-06-21"},
  {name: "Jeremy Baldwin", email: "Jeremy.Baldwin@stonybrook.edu", edate: "2020-06-11"},
  {name: "Dominik Thomas", email: "Dominik.Thomas@stonybrook.edu", edate: "2020-06-04"},
  {name: "Cyrus Alvarez", email: "Cyrus.Alvarez@stonybrook.edu", edate: "2020-06-16"},
  {name: "Leo Cline", email: "Leo.Cline@stonybrook.edu", edate: "2020-06-25"},
  {name: "Melanie Farley", email: "Melanie.Farley@stonybrook.edu", edate: "2020-06-30"},
  {name: "Milagros Noble", email: "Milagros.Noble@stonybrook.edu", edate: "2020-06-30"},
  {name: "Camryn Travis", email: "Camryn.Travis@stonybrook.edu", edate: "2020-06-12"},
  {name: "Zaria Larsen", email: "Zaria.Larsen@stonybrook.edu", edate: "2020-06-17"},
  {name: "Natalya Phillips", email: "Natalya.Phillips@stonybrook.edu", edate: "2020-06-27"},
  {name: "Gilbert Pace", email: "Gilbert.Pace@stonybrook.edu", edate: "2020-07-19"},
  {name: "Hadassah Pitts", email: "Hadassah.Pitts@stonybrook.edu", edate: "2020-07-19"},
  {name: "Teagan Nelson", email: "Teagan.Nelsonaa@stonybrook.edu", edate: "2020-07-19"},
  {name: "Jason Haley", email: "Jason.Haley@stonybrook.edu", edate: "2020-07-19"},
  {name: "Makaila Gamble", email: "Makaila.Gamble@stonybrook.edu", edate: "2020-05-19"},
  {name: "Meadow Ferrell", email: "Meadow.Ferrell@stonybrook.edu", edate: "2020-05-19"},
  {name: "Greta Oneal", email: "Greta.Oneal@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kaitlynn Simon", email: "Kaitlynn.Simon@stonybrook.edu", edate: "2020-05-19"},
  {name: "Finnegan Gregory", email: "Finnegan.Gregory@stonybrook.edu", edate: "2020-05-19"},
  {name: "Ronin Zimmerman", email: "Ronin.Zimmerman@stonybrook.edu", edate: "2020-05-19"},
  {name: "Monique Francis", email: "Monique.Francis@stonybrook.edu", edate: "2020-05-19"},
  {name: "Jaiden Clayton", email: "Jaiden.Clayton@stonybrook.edu", edate: "2020-05-19"},
  {name: "Maia Ashley", email: "Maia.Ashley@stonybrook.edu", edate: "2020-05-19"},
  {name: "Marquis Yu", email: "Marquis.Yu@stonybrook.edu", edate: "2020-05-19"},
  {name: "Payten Barr", email: "Payten.Barr@stonybrook.edu", edate: "2020-05-19"},
  {name: "Jeffery Reilly", email: "Jeffery.Reilly@stonybrook.edu", edate: "2020-05-19"},
  {name: "Raphael Zamora", email: "Raphael.Zamora@stonybrook.edu", edate: "2020-05-19"},
  {name: "Osvaldo Berger", email: "Osvaldo.Berger@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kael Lopez", email: "Kael.Lopez@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kaia David", email: "Kaia.David@stonybrook.edu", edate: "2020-05-19"},
  {name: "Matthew Farmer", email: "Matthew.Farmer@stonybrook.edu", edate: "2020-05-19"},
  {name: "Noelle Olson", email: "Noelle.Olson@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kingston David", email: "Kingston.David@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kaitlynn Graham", email: "Kaitlynn.Graham@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kamila Rush", email: "Kamila.Rush@stonybrook.edu", edate: "2020-05-19"},
  {name: "Triston Hartman", email: "Triston.Hartman@stonybrook.edu", edate: "2020-05-19"},
  {name: "Solomon Preston", email: "Solomon.Preston@stonybrook.edu", edate: "2020-05-19"},
  {name: "Zaiden Barton", email: "Zaiden.Barton@stonybrook.edu", edate: "2020-05-19"},
  {name: "Emilio Luna", email: "Emilio.Luna@stonybrook.edu", edate: "2020-05-19"},
  {name: "Ivan Benton", email: "Ivan.Benton@stonybrook.edu", edate: "2020-05-19"},
  {name: "Derrick Figueroa", email: "Derrick.Figueroa@stonybrook.edu", edate: "2020-05-19"},
  {name: "Nyla Pugh", email: "Nyla.Pugh@stonybrook.edu", edate: "2020-05-19"},
  {name: "Reed Goodman", email: "Reed.Goodman@stonybrook.edu", edate: "2020-05-19"},
  {name: "Joaquin Galvan", email: "Joaquin.Galvan@stonybrook.edu", edate: "2020-05-19"},
  {name: "Eliana Mason", email: "Eliana.Mason@stonybrook.edu", edate: "2020-05-19"},
  {name: "Lola Meadows", email: "Lola.Meadows@stonybrook.edu", edate: "2020-05-19"},
  {name: "Jaydin Fletcher", email: "Jaydin.Fletcher@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kamryn Richard", email: "Kamryn.Richard@stonybrook.edu", edate: "2020-05-19"},
  {name: "Ireland Ashley", email: "Ireland.Ashley@stonybrook.edu", edate: "2020-05-19"},
  {name: "Iliana Woodard", email: "Iliana.Woodard@stonybrook.edu", edate: "2020-05-19"},
  {name: "Chasity Callahan", email: "Chasity.Callahan@stonybrook.edu", edate: "2020-05-19"},
  {name: "Dominik Frank", email: "Dominik.Frank@stonybrook.edu", edate: "2020-05-19"},
  {name: "Emanuel Pace", email: "Emanuel.Pace@stonybrook.edu", edate: "2020-05-19"},
  {name: "Mya Collier", email: "Mya.Collier@stonybrook.edu", edate: "2020-05-19"},
  {name: "Antony Fields", email: "Antony.Fields@stonybrook.edu", edate: "2020-05-19"},
  {name: "Lewis Weber", email: "Lewis.Weber@stonybrook.edu", edate: "2020-05-19"},
  {name: "Francis Duffy", email: "Francis.Duffy@stonybrook.edu", edate: "2020-05-19"},
  {name: "Kaylah Campbell", email: "Kaylah.Campbell@stonybrook.edu", edate: "2020-05-19"},
  {name: "Justice Spencer", email: "Justice.Spencer@stonybrook.edu", edate: "2020-05-19"},
  {name: "Irene Austin", email: "Irene.Austin@stonybrook.edu", edate: "2020-05-19"},
  {name: "Gerald Hammond", email: "Gerald.Hammond@stonybrook.edu", edate: "2020-05-19"},
  {name: "Jamie Schmitt", email: "Jamie.Schmitt@stonybrook.edu", edate: "2020-05-19"},
  {name: "Geovanni Durham", email: "Geovanni.Durham@stonybrook.edu", edate: "2020-05-19"},
  {name: "Draven Vance", email: "Draven.Vance@stonybrook.edu", edate: "2020-05-19"},
  {name: "Mohammad Pennington", email: "Mohammad.Pennington@stonybrook.edu", edate: "2020-05-19"},
  
]