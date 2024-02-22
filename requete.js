db.Personne.find({},{_id:0})
db.Trajet.find({},{_id:0})
//1
//a vérifier
db.Trajet.find({ $and: [ { "distance.code_postal_dep": 44000}, {"distance.code_postal_des": 49300 } ] },{_id:0})

//3
//pour quoi pas maitre $gt : 2.5 ?
// on ne sait pas si il sont conducteur ???
db.Personne.aggregate([ {
    "$match": {
      "$and": [
        {
          "avis_reçu.etoiles": {
            "$gt":2
          }
        },
        {
          "localisation.nom_ville": "Nantes"
        }
      ]
    }
  },
  { $unwind: '$avis_reçu' }
 ])

//5

db.Trajet.aggregate([
  {
    $lookup: {
      from: "Personne",
      localField: "id_voyageurs",
      foreignField: "id_personnes",
      as: "passager"
    }
  },
  {
    $match: {
      passager: {
        $elemMatch: {
          "localisation.code_postale": "distance.code_postal_des"
        }
      }
    }
  }
 ])
  
  