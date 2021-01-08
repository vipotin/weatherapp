
*** Settings ***
Documentation     Test suite for integration tests
Library           OperatingSystem
Library           SeleniumLibrary

*** Variables ***
${SELENIUM}          http://hub:4444/wd/hub
${URL}               http://client:8000
${TEST SERVER}       http://data:3001
${BROWSER}           Chrome
${DELAY}             0
${IMAGE PATH}        /img/13.svg

*** Keywords ***
Direct Requests To Test Server
    Append To Environment Variable    ENDPOINT     ${TEST SERVER}

Open Browser To Home Page
    Open Browser    ${URL}    browser=${BROWSER}   remote_url=${SELENIUM}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Direct Requests To Test Server

Open Browser To Home Page With Geolocation
    ${chrome_options} =     Evaluate   sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome_options}   add_argument    enable-geolocation
    # ${prefs}=      Create Dictionary   geolocation=1
    # Call Method    ${chrome_options}   add_experimental_option  prefs   ${prefs}
    ${options}=     Call Method     ${chrome_options}    to_capabilities   

    Open Browser    ${URL}    browser=${BROWSER}   remote_url=${SELENIUM}     desired_capabilities=${options}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Direct Requests To Test Server

Weather Icons Should Be Visible
    Wait Until Element Contains     tag:h2                      Weather in      10
    Page Should Contain Element     .container > .weatherlist

Page is Loading
    Element Should Contain          tag:h2      Loading

Weather Page Should Be Open
    Title Should Be   What's the weather?

*** Test Cases ***
Open Weather App
    Open Browser To Home Page
    Weather Page Should Be Open
    Page is Loading
    [Teardown]    Close Browser

# Open Weather App With Geolocation
#     Open Browser To Home Page With Geolocation
#     Page is Loading
#     # Geolocation Is Asked
#     Weather Icons Should Be Visible
#     [Teardown]    Close Browser
