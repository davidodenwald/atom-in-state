'use babel';

import in-state from '../lib/in-state';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('in-state', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('in-state');
  });

  describe('when the in-state:create event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.in-state')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'in-state:create');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.in-state')).toExist();

        let in-stateElement = workspaceElement.querySelector('.in-state');
        expect(in-stateElement).toExist();

        let in-statePanel = atom.workspace.panelForItem(in-stateElement);
        expect(in-statePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'in-state:create');
        expect(in-statePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This in-state shows you an integration in-state in-stateing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything in-stateing visibility or focus
      // requires that the workspaceElement is on the DOM. in-states that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.in-state')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'in-state:create');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can in-state for view visibility
        let in-stateElement = workspaceElement.querySelector('.in-state');
        expect(in-stateElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'in-state:create');
        expect(in-stateElement).not.toBeVisible();
      });
    });
  });
});
