const app = new Vue({
    el: '#app',
    data: {
        personajes: [],
        siguiente: '',
        anterior: '',
        API: 'https://rickandmortyapi.com/api/character/'
    },
    created(){
        this.fetchData(this.API);
    },
    methods:{
        fetchData(url){
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.personajes = data.results;
                    this.siguiente = data.info.next;
                    this.anterior = data.info.prev;
                    console.log(this.personajes)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        next(){
            fetch(this.siguiente)
                .then(response => response.json())
                .then(data => {
                    this.personajes = data.results;
                    this.siguiente = data.info.next;
                    this.anterior = data.info.prev;
                })
                .catch(error => {
                    console.error(error)
                })
        },
        prev(){
            if (this.anterior != null) {
                fetch(this.anterior)
                    .then(response => response.json())
                    .then(data => {
                        this.personajes = data.results;
                        this.siguiente = data.info.next;
                        this.anterior = data.info.prev;
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }
    }
})