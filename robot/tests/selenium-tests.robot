
*** Settings ***
Documentation     Test suite for integration tests
Library           OperatingSystem
Library           SeleniumLibrary

*** Variables ***
${SELENIUM}          http://localhost:4444/wd/hub
${URL}               http://localhost:8000
${TEST SERVER}       http://localhost:3001
${BROWSER}           Chrome
${DELAY}             0
${IMAGE PATH}        /img/13.svg

*** Keywords ***
Direct Requests To Test Server
    Append To Environment Variable    ENDPOINT     ${TEST SERVER}

Open Browser To Home Page
    Open Browser    ${URL}    browser=${BROWSER}    remote_url=${SELENIUM}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Direct Requests To Test Server

Weather Icon Should Be Visible
    Page Should Contain Image   .icon>img
    # Get Element Attribute   .icon>img   src     ==  ${IMAGE PATH}

Weather Page Should Be Open
    Title Should Be   What's the weather?

*** Test Cases ***
Show Weather Data
    Open Browser To Home Page
    Weather Page Should Be Open
    Weather Icon Should Be Visible
    [Teardown]    Close Browser
    
    
    