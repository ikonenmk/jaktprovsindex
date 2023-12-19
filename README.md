# Jakthundsindex

Det här är en utveckling av ett gesällprov som gjordes för kursen Webbutveckling II vid SU.

Används för att utveckla kunskaper i javascript (React), php, mysql, css och html

## Beskrivning av projektet

Webbapplikation som gör det möjligt att jämföra och ranka jakthundar baserat på historiska resultat på jaktprov. 

Datan är skapad av mig, men jag har försökt att replikera hur jag tror att datan som finns i en organisations database. Tanken var att testa om det var möjligt att skapa en applikation som kunde ladda in den datan och skapa egenskapsindex och rankingvärden som är meningsfulla för användare som planerar att köpa en valp eller para sin hund med en annan hund. En sådan användare är intresserad av att hitta speciella linjer (d.v.s. besläktade hundar) med höga generella egenskapspoäng eller en avelstik/avelshane som har höga poäng på en specifik egenskap som den egna hunden saknar.


### Frontend
Följande tekniker används: React, Bootstrap CSS, HTML


### Backend
Följande tekniker används: PHP, MySQL

## Körexempel
### Landing page
Användaren kan välja hundras med "Välj ras"-dropdown. Då visas egenskapspoäng för alla hundar av den rasen.

![LandingPage](https://github.com/ikonenmk/jaktprovsindex/assets/153864857/017cafd8-b220-49e3-9782-4c3aa3915107)

### Ranking uppdaterad
Användaren kan ranka hundarna baserat på de egenskapspoäng som användaren aktiverar i check-boxarna.

![Ranking](https://github.com/ikonenmk/jaktprovsindex/assets/153864857/f0e47c4a-e239-4ce8-859b-654f5c94c695)

### Login-dropdown
Inloggningsfunktion för provdomare

![Login](https://github.com/ikonenmk/jaktprovsindex/assets/153864857/e44a4db0-50d4-4cd5-ac35-cff953a1c132)

### Inloggad
Inloggad domare kan lägga till resultat från prov genom att klicka på "Registrera nytt prov"

![LoggedIn](https://github.com/ikonenmk/jaktprovsindex/assets/153864857/ead2795e-6a11-408f-b668-a0ee289b9a3f)

### Spara nytt prov för hund
Alla fält är inaktiverade tills ett registreringsnummer matats in för en hund som finns i databasen. 
Fältet har auto-complete för de regnr som finns i databasen.

![SparaProvDisabled](https://github.com/ikonenmk/jaktprovsindex/assets/153864857/9c2cd7c6-1081-412b-ad5a-8695ee471f4d)

### Prov sparat i DB
![ProvSparat](https://github.com/ikonenmk/jaktprovsindex/assets/153864857/314ee3d2-ce81-4278-8e2e-7ca8abcb8a3f)

