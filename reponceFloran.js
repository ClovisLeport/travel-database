db.getCollection("Trajet").find({},{_id:0})
db.Personne.find({},{_id:0})

//2

db.Trajet.aggregate([

    {
        $match : {
            "vehiclue.anne_mise_en_service" : {$lt:2000}
        }
    },
    

    { $group:
      { _id: {
          numero_agrement : "$conducteur.numero_agrement",
          date_agrement : "$conducteur.date_agrement",
          certife : "$conducteur.certife",
          id_personne : "$conducteur.id_personne",
          vehiclue_anne_mise_en_service : "$vehiclue.anne_mise_en_service"
          },

      }
    },
    {
        $lookup : {
            from : "Personne",
            localField : "_id.id_personne",
            foreignField : "id_personne",
            as : "personne"
        },
    },
    {
        $unwind : '$personne'
    },
    {
        $match : {
            "personne.localisation.nom_ville" : "Nantes"
        }
    },
    {
        $addFields: { numero_agrement: "$_id.numero_agrement",
             vehiclue_anne_mise_en_service : "$_id.vehiclue_anne_mise_en_service",
             id_personne : "$_id.id_personne",
             nom_ville : "$personne.localisation.nom_ville"}
    },
    {$project : {
        _id : 0, personne:0
    }}
])


//4

db.Trajet.aggregate([

    { $group:
      { _id : "$conducteur.numero_agrement",
        nbtrajet : {$sum : 1}
      }
    }
])

//6
////////////A TESTER
db.Trajet.aggregate([

    { $addFields: { date: { $toDate: "$vehiclue.anne_mise_en_service" } } },

    {
        $match : {
            "date" : {$gt: new Date("2014-01-01")}
        }
    },

    { $group:
      { _id: {
          numero_agrement : "$conducteur.numero_agrement",
          date_agrement : "$conducteur.date_agrement"
        },
      }
    },
        {
        $addFields: { numero_agrement: "$_id.numero_agrement",
             date_agrement : "$_id.date_agrement"}
    },
    {$project : {
        _id : 0
    }}
])


//8
db.Trajet.aggregate([

    { $addFields: { nbpassagerT: { $size: "$id_voyageurs" } } },


    { $group:
      { _id: "$conducteur.numero_agrement" ,
      nbVoyageur : {$sum : "$nbpassagerT"}
      }
    },
    {
        $sort : {nbVoyageur : -1}
    },
    { $limit : 1 }

])

//10
//v1 avec 3 considérer comme négatife
//work in progress
db.Trajet.aggregate([

    {
        $match : {
            "conducteur.numero_agrement" : 13978
        }
    },
    
    {
        $lookup : {
            from : "Personne",
            localField : "conducteur.id_personne",
            foreignField : "id_personne",
            as : "personne"
        },
    },
    {
        $unwind : '$personne'
    },
    {
        $unwind : '$personne.avis_reçu'
    },
    {
        $match : {
            "personne.avis_reçu.etoiles" : {$lte:3}
        }
    },
    {
        $match : {
            "personne.avis_reçu.id_personne_source" : {$in : "$id_voyageurs"}
        }
    },
    
])