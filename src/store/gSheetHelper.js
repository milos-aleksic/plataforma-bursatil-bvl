
export const getGoogleSheetUrl = (dataType) =>  {

    const spreadSheets = {
        stockMarket: '1ZRCXSF2YG68_BYxyCAWucRwvL1nY3gMEScSKonXPzhA',
        stockMarketLive: '1ZRCXSF2YG68_BYxyCAWucRwvL1nY3gMEScSKonXPzhA'
    }
    const sheetName = {
        stockMarket: 'Today_False',
        stockMarketLive: 'Today_True'
    }
    const apiKeyGcp = process.env.VUE_APP_GOOGLE_APPLICATION_CREDENTIALS

    const spreadsheetId = spreadSheets[dataType]

    let dataFormat = ''
    // dataFormat += 'majorDimension=ROWS&'
    // dataFormat += 'valueRenderOption=FORMULA&'

    const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName[dataType]}!A:XX?${dataFormat}key=${apiKeyGcp}`

    return jsonUrl

}