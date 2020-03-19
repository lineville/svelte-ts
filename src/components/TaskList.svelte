<script lang="ts">
  // import db from '../firestore';
  // import firebase from 'firebase';

  let tasks = [];
  let currentUser: string;

  // async function onMount() {
  //   const user = await firebase.auth().currentUser;
  //   if (user) {
  //     await db
  //       .collection('users')
  //       .doc(user.uid)
  //       .get()
  //       .then(fireUser => {
  //         currentUser = fireUser.id;
  //       })
  //       .then(() => {
  //         db.collection('users')
  //           .doc(user.uid)
  //           .collection('tasks')
  //           .orderBy('priority', 'desc')
  //           .orderBy('completed', 'asc')
  //           .orderBy('starred', 'desc')
  //           .onSnapshot(snapshot => {
  //             tasks = snapshot.docs.map(task => {
  //               return { id: task.id, ...task.data() };
  //             });
  //           });
  //       });
  //   }

  // await db
  //   .collection("users")
  //   .doc(user?.uid)
  //   .get()
  //   .then(fsUser => {
  //     this.setState({ user: { id: fsUser.id, ...fsUser.data() } });
  //   })
  //   .then(() => {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .collection("tasks")
  //       .orderBy("priority", "desc")
  //       .orderBy("completed", "asc")
  //       .orderBy("starred", "desc")
  //       .onSnapshot(snapshot => {
  //         this.setState({
  //           tasks: snapshot.docs.map(task => {
  //             return { id: task.id, ...task.data() };
  //           })
  //         });
  //       });
  //   })
  //   .then(() => {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .onSnapshot(doc => {
  //         this.setState({
  //           user: { id: doc.id, ...doc.data() }
  //         });
  //         document.body.style.backgroundColor = this.state.user.darkMode
  //           ? "#464542"
  //           : "white";
  //         document.body.style.color = this.state.user.darkMode
  //           ? "white"
  //           : "#464542";
  //       });
  //   });

  // this.setState({ isLoading: false });
  // }
</script>

<div id="tasklist">
  <p>User Id: {currentUser}</p>
  {#each tasks as task}
    <li>{task.description}</li>
  {/each}
</div>
