// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDYOVavpO-zwiW45HGD24j0g9boiasCskU",
    authDomain: "amigo-secreto-33055.firebaseapp.com",
    projectId: "amigo-secreto-33055",
    storageBucket: "amigo-secreto-33055.firebasestorage.app",
    messagingSenderId: "49762286905",
    appId: "1:49762286905:web:185a62c467d0675dc5fce8"
  };

  // Inicialize o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Função de sorteio
  async function sortearAmigo() {
    // Recolhendo todos os participantes que ainda não foram sorteados
    const participantesRef = db.collection("participantes");
    const snapshot = await participantesRef.where("sorteado", "==", false).get();
    
    if (snapshot.empty) {
      document.getElementById('mensagemResultado').textContent = "Todos já foram sorteados!";
      return;
    }
  
    const participantes = snapshot.docs.map(doc => doc.data().name);
    
    if (participantes.length > 0) {
      const randomIndex = Math.floor(Math.random() * participantes.length);
      const amigoSorteado = participantes[randomIndex];
  
      // Atualizando o Firestore para que a pessoa não seja sorteada novamente
      await participantesRef.doc(amigoSorteado).update({
        sorteado: true
      });
  
      // Exibir o resultado do sorteio
      document.getElementById('mensagemResultado').textContent = `Seu amigo secreto é: ${amigoSorteado}`;
    }
  }
  