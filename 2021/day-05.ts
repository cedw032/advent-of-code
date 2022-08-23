// I think this was the case that cost us a day or two 
// Wouldn't have happened if we had taken a moment or two to write expressive types

type ExternalSportName = 'Table Tennis'
type InternalSportName = "TableTennis";

function getSportName(): ExternalSportName {
  return 'Table Tennis';
}

function lookupSport(name: InternalSportName): void {
  return;
}

lookupSport(getSportName())

// This is just a general case where by habit I would usually make sure I have a separate type for anything that shouldn't be confused with anything else
type MarketName = string & {readonly __MarketName: unique symbol}

function getMarketName(): MarketName {
  return 'H2H' as MarketName
}

function takeMarketName(m: MarketName): void {

}

takeMarketName(getMarketName())

takeMarketName('My own made up market name')


// This is another case that cost us a couple of days of dev time that could have been avoided by using types
// I was passing the wrong entity type in for the values I was passing in.
type InternalSportId = string & {readonly __InternalSportId: unique symbol}
type ExternalSportId = string & {readonly __ExternalSportId: unique symbol}
type InternalFixtureId = string & {readonly __InternalFixtureId: unique symbol}
type ExternalFixtureId = string & {readonly __ExternalFixtureId: unique symbol}
type InternalMarketId = string & {readonly __InternalMarketId: unique symbol}
type ExternalMarketId = string & {readonly __ExternalMarketId: unique symbol}

type IdMappingTuple = ['sport', InternalSportId, ExternalSportId]
  | ['fixture', InternalFixtureId, ExternalFixtureId]
  | ['market', InternalMarketId, ExternalMarketId]

function saveMapping([entityType, internalId, externalId]: IdMappingTuple) {}

const internalMarketId = 'internal-market-id' as InternalMarketId
const externalMarketId = 'internal-market-id' as ExternalMarketId
const internalSportId = 'internal-market-id' as ExternalMarketId

saveMapping(['market', internalMarketId, externalMarketId]) //  This works
saveMapping(['sport', internalMarketId, externalMarketId]) //  This doesn't
saveMapping(['market', internalSportId, externalMarketId]) //  This doesn't
saveMapping(['market', externalMarketId, internalMarketId]) //  This doesn't

