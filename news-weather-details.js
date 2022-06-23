// Method to send sms
function sendWeather() {
  let mob = parseInt(document.getElementById("phone").value);
  console.log(mob);
}

// Method to fetch news api
// Currently, a network error of 426 is coming
async function newsApi() {
    let contents = document.getElementById("news-item").children;
    try {
      const results = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=61affb5f492844a48f8170f24e112d78`
      );
      console.log(results);
      const data = results.data;
      console.log(data.articles[1]);
    } catch (error) {
      test.setError(error.message);
    }

   contents.item[0].insertAdjacentText(data.articles[1]);
  }


 