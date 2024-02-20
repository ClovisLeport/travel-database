
def getRelation(table,nomcolone):
    reslation = [] #list ()
    
    nbcolone = len(table[0])
    
    for c in range(nbcolone):
        
        
        listnon = []
        listres = []
        for l2 in range(len(table)):
            estdejadans = False
            for ligneres in listres:
                if ligneres[c] == table[l2][c]:
                    True
                    for col in range(nbcolone):
                        if col != c:
                            if ligneres[col] != table[l2][col]:
                                listnon.append(col)
            
            if estdejadans == False:
                listres.append(table[l2])
        
        #calcule les relation potensielle
        for i in range(nbcolone):
            if i!=c and i not in listnon:
                reslation.append((nomcolone[c], nomcolone[i]))
        
        
    return reslation
            
        
            
        
    
    







nomdataV = ["plaque_immatriculation", "marque", "type", "energie", "nombre_places",
"annee_mise_en_service"]
dataV = [['ab123xz', 'Skoda', 'voiture', 'essence', 4, 1999],
['az426bt', 'BMW', 'voiture', 'électrique', 5, 1987],
['rt865gb', 'Opel', 'voiture', 'électrique', 6, 2005],
['ae452df', 'Skoda', 'voiture', 'électrique', 4, 1995],
['aq781rt', 'Fiat', 'voiture', 'essence', 4, 1999],
['az745ad', 'Nissan', 'voiture', 'essence', 4, 1999],
['z794aed', 'Audi', 'voiture', 'électrique', 6, 2017],
['qw120qz', 'Nissan', 'voiture', 'essence', 5, 1998],
['hj715ut', 'Skoda', 'voiture', 'essence', 5, 2015],
['ed123fr', 'Opel', 'voiture', 'essence', 5, 2010]]


nomdataP = ["id_personne", "nom", "prenom", "adresse_rue", "code_postal","nom_ville"]
dataP =[[ 0, 'Hoareau', 'Jacqueline', '9 Chem. de la Pelletterie', 44000, 'Nantes'],
[1, 'Camus', 'Suzanne', '53 Rue du Douet Garnier', 44000, 'Nantes'],
[2, 'Fleury', 'Michèle', '36 Bd Gaston Serpette', 44000,'Nantes'],
[3, 'Georges', 'René', '1 Rue de Joyeuse', 76000,'Rouen'],
[4, 'Munoz', 'Théodore', '24 Rue du Petit Pont', 45000,'Orleans'],
[5, 'Clement', 'Inès-Sabrine', '21 Rue René Thomas', 38000,'Grenoble'],
[6, 'Launay', 'Henriette', '14 Imp. de Flandre', 76000,'Rouen'],
[7, 'Bonneau', 'Roland', '198 Rue des Postes', 59000,'Lille'],
[8, 'Lemaire-Simon', 'Sabine', '46 Rue Ferrandière', 69000,'Lyon'],
[9, 'Godard', 'Aimée', '6 Rue de Lurbe', 33000,'Bordeaux'],
[10,'Klein', 'Charles', '15 Rue Rolland', 33000,'Bordeaux'],
[11, 'Dupre', 'Alfred', '38 Rue Volney', 49000,'Angers'],
[12,'Roy', 'Alphonse', '14 Rue du Planty', 49300,'Cholet'],
[13,'Verdier', 'Cécile', '42 Rue Bourgonnier', 49000,'Angers'],
[14,'Etienne', 'Guy', '2 Rue Lebas', 49000,'Angers'],
[15, 'Lemaire', 'Luc', '12 Rue de la Hollande', 49300,'Cholet'],
[16, 'Gimenez', 'Pauline', '12 Rue Amédée Morel', 38000,'Le Sappey en Chartreuse'],
[17, 'Fontaine', 'Agnès', '18 Quai Jean Moulin', 69000,'Lyon'],
[18, 'Pruvost', 'Robert', '17 Rue du Dr André Derocque', 76000,'Rouen'],
[19, 'Denis', 'Guy', '10 Rue Kuhlmann', 59000,'Tourcoing']]

nomdataC = ["numero_agrement", "date_agrement", "certifie", "#id_personne"]
dataC = [[12564, "11-08-2018", 0, 2],
[13978, "28-01-2017", 1, 5],
[78541, "02-09-2020", 1, 1],
[9523, "30-03-2018", 1, 19],
[685, "29-08-2019", 0, 11],
[85423, "15-11-2019", 0, 10],
[78945, "20-06-2018", 1, 17],
[74125, "29-01-2017", 0, 13],
[4562, "14-05-2021", 0, 8]]

nomdataT = ["id_trajet", "heure_dep", "heure_des", "longueur", "tarif", "#numero_agrement",
"#plaque_immatriculation", "#code_postal_dep","#code_postal_des"]
dataT = [[1,'2022-02-20 20-00', '2022-02-20 20-52', 59, 5, 1, 'ab123xz', 44000, 49300],
[2, '2022-03-20 20-00','2022-03-20 20-52', 59, 5, 1, 'ab123xz', 49300, 44000],
[3,'2022-01-19 19-00', '2022-01-19 19-52', 59, 7, 12564, 'az426bt', 44000, 49300],
[4, '2021-09-21 08-30','2021-09-21 12-40', 335,25,78541, 'az745ad',45000,44000],
[5, '2021-09-10 07-30','2021-09-10 14-10',676.1, 51, 685,'az745ad', 45000, 59200],
[6, '2021-08-23 11-15','2021-08-23 18-50', 110, 9.5, 9523,'z794aed' , 44000, 56000],
[7, '2021-08-12 21-30', '2021-08-12 23-36', 201, 18, 85423,'z794aed', 17000, 33000],
[8,'2021-08-03 09-10', '2021-08-03 11-10', 226.8, 19, 9523, 'hj715ut', 38700, 39200],
[9, '2021-08-12 21-30', '2021-08-13 03-30', 587.5, 45,74125, 'qw120qz', 45000, 38700],
[10, '2021-08-12 15-12', '2021-08-12 17-25',181, 15, 85423, 'qw120qz', 22300, 50170],
[11, '2022-08-12 15-12','2022-08-12 17-25',181, 12564,10, 'az426bt', 22300, 50170]]

nomdataVoy = ["#id_trajet", "#id_personne"]
dataVoy = [[1, 2],
[1, 12],
[1, 15],
[1, 3],
[3, 9],
[3, 3],
[3, 6],
[3, 8]]


nomdataA = ["id_avis", "message", "etoiles", "#id_personne_envoie", "#id_personne_recu"]
dataA =[[1, 'A', 3, 1, 2],
[2, 'B', 3, 3, 2],
[3, 'C', 4, 3, 2],
[4, 'D', 4, 9, 2],
[5, 'D', 5, 12, 2],
[6, 'A', 1, 13, 1],
[7, 'B', 5, 14, 1],
[8, 'A', 5, 18, 1],
[9, 'C', 5, 7, 1],
[10, 'C', 3, 5, 8],
[11, 'A', 2, 9, 8],
[12, 'D', 1, 9, 8]]

rr=getRelation(dataV,nomdataV)

print("_____Voiture_____")
for v in rr:
    print(str(v)+"\n")
    

rr=getRelation(dataP,nomdataP)

print("_____Personne_____")
for v in rr:
    print(str(v)+"\n")
    
    
rr=getRelation(dataC,nomdataC)

print("_____Conducteur_____")
for v in rr:
    print(str(v)+"\n")
    
    
rr=getRelation(dataT,nomdataT)

print("_____Trajet_____")
for v in rr:
    print(str(v)+"\n")


rr=getRelation(dataVoy,nomdataVoy)

print("_____Voyage_____")
for v in rr:
    print(str(v)+"\n")
    
    
rr=getRelation(dataA,nomdataA)

print("_____Avis_____")
for v in rr:
    print(str(v)+"\n")
    
