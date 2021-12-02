let hovercardOuterAnimation = null;
let hovercardInnerAnimation = null;
let hovercard = document.createElement("div");
hovercard.setAttribute("id", "datasette-hovercard")
hovercard.style.width = '300px';
hovercard.style.height = '200px';
hovercard.style.overflow = 'auto';
hovercard.style.backgroundColor = 'white';
hovercard.style.border = '1px solid #ccc';
hovercard.style.padding = '10px';
hovercard.style.position = 'absolute';
hovercard.style.display = 'none';
hovercard.style.boxShadow = '1px 2px 8px 2px rgba(0,0,0,0.08)';

const hovercardEscape = (s) => {
  return (s || "").toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

document.addEventListener("mouseover", async (ev) => {
  const a = ev.target;
  if (a.nodeName != 'A') {
    return;
  }
  // TODO: Respect base_url and suchlike
  if (a.pathname.split("/").length != 4) {
    return; // Definitely not a row
  }
  // OK, it might be a row! Try a fetch
  let row;
  if (a.hovercardRowData) {
    row = a.hovercardRowData;
  } else {
    const response = await fetch(a.pathname + ".json?_shape=array");
    if (response.status == 200) {
      const data = await response.json();
      row = data[0];
      a.hovercardRowData = row;
    }
  }
  if (row) {
    // Cancel any existing animations
    if (hovercardOuterAnimation) {
      clearTimeout(hovercardOuterAnimation);
    }
    if (hovercardInnerAnimation) {
      clearTimeout(hovercardInnerAnimation);
    }
    hovercard.style.top = (ev.pageY + 5) + 'px';
    hovercard.style.left = (ev.pageX - 15) + 'px';
    let html = ['<dl>'];
    for (const [key, value] of Object.entries(row)) {
      html.push(`
        <dt style="font-weight: bold">${hovercardEscape(key)}</dt>
        <dd style="margin: 0px 0 0 0.7em;">
          <span style="color: #999; font-size: 0.9em;">${hovercardEscape(value) || '&nbsp;'}</span>
        </dd>
      `);
    }
    html.push("</dl>")
    hovercard.innerHTML = html.join("");
    hovercard.style.display = 'block';
    hovercard.style.opacity = 100;
    hovercard.style.transition = 'none';
  }
});

document.addEventListener("mouseout", (ev) => {
  if (ev.target.id != "datasette-hovercard") {
    return;
  }
  hovercardOuterAnimation = setTimeout(() => {
    hovercard.style.transition = 'opacity 0.4s ease-in-out';
    hovercard.style.opacity = 0;
    hovercardInnerAnimation = setTimeout(() => {
      hovercard.style.transition = 'none';
      hovercard.style.display = "none";
      hovercard.style.opacity = 100;
    }, 800)
  }, 400);
})

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(hovercard);
});
