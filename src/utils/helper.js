import { extendTheme } from "@chakra-ui/react";



export const LinkedInUrl = {
  SearchPeoplePage: "https://www.linkedin.com/search/results/people/",
  MyNetworkPage: "https://www.linkedin.com/mynetwork/",
  PatternOfSearchPage: "linkedin.com/search/results/people",
  PatternOfMyNetworkPage: "linkedin.com/mynetwork",
}

export const darkTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});


export const maximumAutoConnectionsPerSessionStore = 100;
export const halfSecondIntervalInMilliseconds = 500;

export function openMyNetworkPage() {
  // eslint-disable-next-line no-undef
  chrome.tabs.create({ url: LinkedInUrl.MyNetworkPage });
}

export function openOptionsPage() {
  // eslint-disable-next-line no-undef
  chrome.runtime.openOptionsPage();
}


export function openSearchPeoplePage() {
  // eslint-disable-next-line no-undef
  chrome.tabs.create({ url: LinkedInUrl.SearchPeoplePage });
}


export const randomDelay = (min = 5000, max = 10000) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const LinkedInCssSelector = {
  NextPageButton :"button.artdeco-pagination__button--next",
  ConnectButtonFromMyNetworkPage : "div.discover-entity-type-card__bottom-container button.ember-view:enabled:not(.artdeco-button--muted):not(.artdeco-button--full)",
  ConnectButtonFromSearchPage :"li.reusable-search__result-container div.entity-result__actions > div > button.ember-view:enabled:not(.artdeco-button--muted):not([data-test-reusable-search-primary-action])",
  SendButtonFromSendInviteModal :"div.send-invite button.artdeco-button--primary",
}
