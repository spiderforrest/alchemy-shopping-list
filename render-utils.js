export function renderItem(item) {
    // generate elements
    const div = document.createElement('div');
    const nameH = document.createElement('h3');

    // propogate
    nameH.textContent = item.name;

    // style
    div.classList.add('list-item');
    // for scoring bought items
    if (item.marked === true) {
        div.classList.add('bought');
    } else {
        div.classList.add('to-buy');
    }

    // append and return
    div.append(nameH);
    return div;
}
