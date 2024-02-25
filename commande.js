

//1
db.Trajet.find({ $and: [ { "distance.code_postal_dep": 44000}, {"distance.code_postal_des": 49300 } ] },{_id:0})

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
          vehiclue_anne_mise_en_service : "$vehiclue.anne_mise_en_service",
          vehiclue_energie : "$vehiclue.energie"
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
             nom_ville : "$personne.localisation.nom_ville",
             vehiclue_energie : "$_id.vehiclue_energie"}
    },
    {$project : {
        _id : 0, personne:0
    }}
])

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

//4

db.Trajet.aggregate([

    { $group:
      { _id : "$conducteur.numero_agrement",
        nbtrajet : {$sum : 1}
      }
    },
    {
        $sort : {nbtrajet : -1}
    }
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
 
 //6
db.Trajet.aggregate([

    { $addFields: { date: { $toDate: "$conducteur.date_agrement" } } },

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

//10
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
    { $addFields: {
          id_trajet: "$id_trajet",
          heure_dep: '$heure_dep',
          heure_des: '$heure_des',
          code_postal_dep: '$distance.code_postal_dep',
          code_postal_des: '$distance.code_postal_des'} 
    },
    
    {$project: {
        _id:0,
        id_trajet: 1,
        heure_dep : 1,
        heure_des : 1,
        code_postal_dep : 1,
        code_postal_des : 1,
    }}    
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

  
  