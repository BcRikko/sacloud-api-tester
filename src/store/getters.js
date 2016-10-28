export default {
  historys: state => state.history.list.sort((a, b) => window.moment(b.date).unix() - window.moment(a.date).unix())
}
