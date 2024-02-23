db.Personne.find({},{_id:0})
db.Trajet.find({},{_id:0})
//1
//a vérifier
db.Trajet.find({ $and: [ { "distance.code_postal_dep": 44000}, {"distance.code_postal_des": 49300 } ] },{_id:0})

//3
 db.Trajet.aggregate([
    { $group:
      { _id: {
          numero_agrement : "$conducteur.numero_agrement",
          date_agrement : "$conducteur.date_agrement",
          certife : "$conducteur.certife",
          id_personne : "$conducteur.id_personne",
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
            "personne.localisation.nom_ville" : "Nantes",
            "personne.avis_reçu.etoiles":{$not: {
            "$lt":2.5
            }
          }
        }
    },
    {
        $addFields: { id_personne: "$personne.id_personne",
             nom : "$personne.nom",
             prenom : "$personne.prenom",
             localisation : "$personne.localisation",
             avis_reçu : "$personne.avis_reçu"}
    },
    {$project : {
        _id : 0, personne:0
    }}
])

//5

db.Trajet.aggregate([
      {
        $unwind : '$id_voyageurs'
    },
  {
    $lookup: {
      from: "Personne",
      localField: "id_voyageurs",
      foreignField: "id_personne",
      as: "passager"
    }
  },
   {
        $unwind : '$passager'
    },
   {
       $match : {
           "passager.localisation.code_postale" : "$distance.code_postal_des"
       }
   }


 ])
 
 //7
 
db.Trajet.aggregate([
    { $group:
      { _id: {
          numero_agrement : "$conducteur.numero_agrement",
          id_personne : "$conducteur.id_personne",
          },
          
          nbvoyageur : {$sum : {$size : "$id_voyageurs"}}

      }
    },
     {
         $match : {
             nbvoyageur : 0
         }
     },
     {
         $addFields: { numero_agrement: "$_id.numero_agrement",
             id_personne : "$_id.id_personne",
             }
    },

    {$project : {
        _id : 0
    }}
])

//9
db.Trajet.aggregate([
    
    {
      $match : {"conducteur.numero_agrement" : 13978}
    },

    { $group:
      { _id: {
          numero_agrement : "$conducteur.numero_agrement",
          id_personne : "$conducteur.id_personne",
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
        $unwind : '$personne.avis_reçu'
    },
    {
        $match : {
            "personne.avis_reçu.etoiles":{
            "$lt":2.5
            }
          
        }
    },
    
    {
        $group : {
            _id : "$personne.id_personne",
            nbAvieNégatif : {$sum : 1}
        }
    }


])

//11

db.Trajet.aggregate([

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
        $match : {
            "personne.prenom" : "Suzanne"
            }
         
    },
    
     {
         $project: { _id: 0}
     }
    



])

  
  