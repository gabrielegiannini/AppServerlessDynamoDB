Nella cartella lambda si trovano tutte le funzioni che ho implementato:

addAppointment: è la funzione che si occupa di aggiungere un appuntamento nel relativo database degli appuntamenti.
        E' stata aggiunta una condizione nei parametri per l'aggiunta al database in modo che DynamoDB non sovrascriva di default gli oggetti con le chiavi primarie          uguali, utilizzando come chiave primaria la data e l'orario dell'appuntamento verrà sollevato un errore se si proverà ad inserire due appuntamenti con la stessa data.
        
addCustomer: è la funzione che prende in input un nome e un cognome, genera un id casuale e univoco e aggiunge l'oggetto al database.

getCustomer: è un tentativo che ho voluto fare per capire un po' meglio come funziona DynamoDB e come si faccia a fare ricerce imponendo condizioni su altri campi e non solo sulle chiavi primarie.

removeAppointment: rimuove un appuntamento.

removeCustomer: rimuove un cliente dal relativo database. Anche qui avevo provato un po' a vedere se fosse possibile fare una cancellazione condizionata, vedendo se era possibile eliminare non in base all'id (chiave primaria) ma in base a nome+cognome. Ho provato anche a fare prima una "scan" del database per poi effettuare la delete sull'id dell'unico campo restituito. Non ci son riuscito e mi son limitato a fare una delete basandomi sulla chiave primaria, anche cercando a fondo su internet sembra proprio che non ci siano alternative. 

Spero di essere riuscito a implementare il più possibile quello che vi aspettavate. Purtroppo sono dovuto partire da 0 con ognuna di queste tecnologie ma ho cercato di fare il mio meglio. 
