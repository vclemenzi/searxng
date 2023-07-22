document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname != "/") return;
  const homenews = document.querySelector(".homenews");

  homenews.innerHTML = "<span>Loading the news, please wait...</span>"

  fetch(`http://${window.location.host}/search?q=news&format=json&categories=news`)
    .then((t) => t.json())
    .then((data) => {
      homenews.innerHTML = "";

      data.results.map((d) => {
        const date = new Date(d.publishedDate);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];

        homenews.innerHTML += `<article class="hnews">
          <a class="url_wrapper" href="${d.url}" rel="noreferrer">
            ${d.url}
          </a>
          <h3>
            <a href="${d.url}">
              ${d.title}
            </a>
          </h3>
          <time datetime="${d.publishedDate}">
            Published on the ${date.getDay()} day of the month ${months[date.getMonth() - 1]} at ${date.getHours()}:${date.getMinutes()}
          </time>
          <p class="content">
            ${d.content === undefined ? "" : d.content}
          </p>
        </article>`;
      });
    });
});
