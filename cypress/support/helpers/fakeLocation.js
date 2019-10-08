// thanks to https://github.com/cypress-io/cypress/issues/2671

function fakeLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (cb, err) => {
        if (latitude && longitude) {
          return cb({
            coords: {
              latitude,
              longitude,
            },
          });
        }
        throw err({ code: 1 }); // 1: rejected, 2: unable, 3: timeout
      });
    },
  };
}

module.exports = fakeLocation;
