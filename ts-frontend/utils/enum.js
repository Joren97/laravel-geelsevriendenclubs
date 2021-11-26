export const f = {
  player: 0,
  contact: 1,
  secretary: 2,
  president: 3,
  referee: 4,
};

export const functions = [
  {
    value: f.player,
    display: 'Speler',
  },
  {
    value: f.contact,
    display: 'Contactpersoon',
  },
  {
    value: f.secretary,
    display: 'Secretaris',
  },
  {
    value: f.president,
    display: 'Voorzitter',
  },
  {
    value: f.referee,
    display: 'Scheidsrechter',
  },
];

export const getName = (enumNumber) => {
  let found = functions.find((x) => x.value == enumNumber);
  return found != null ? found.display : null;
};
