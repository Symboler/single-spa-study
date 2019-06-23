<template>
  <div class="hello">
    <div>
                    <b> Count: {{count}}</b><br/><br/>
                    <button v-on:click="localIncrement">local increment</button>
                    &nbsp;Send a <b>local</b> increment event. This will only increase the counter for the current app. <br/>

                    <button v-on:click="localDecrement">local decrement</button>
                    &nbsp;Send a <b>local</b> decrement event. This will only decrement the counter for the current app. <br/>
                   <button v-on:click="globalIncrement">global increment</button>
                    &nbsp;Send a <b>global</b> increment event. This will increase the counter for the current app and all
                    other apps that listen to this event. <br/>
                    <button v-on:click="globalDecrement">global decrement</button>
                    &nbsp;Send a <b>global</b> decrement event. This will increase the counter for the current app and all
                    other apps that listen to this event. <br/>
                </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
   // 在 `methods` 对象中定义方法
  methods: {
    localIncrement: function (event) {
      this.$store.dispatch("INCREMENT")
    },
     localDecrement: function (event) {
      this.$store.dispatch("DECREMENT")
    },
    globalIncrement:function(event){
        this.globalEventDistributor.dispatch({ type: 'INCREMENT'});
    },
     globalDecrement:function(event){
        this.globalEventDistributor.dispatch({ type: 'DECREMENT' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
