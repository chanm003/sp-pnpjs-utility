var currentYear = (new Date()).getFullYear();
var nextYear = currentYear + 1;

var countriesToCreate = [
    { Title: 'Poland'},
    { Title: 'Hungary'},
    { Title: 'Finland'},
    { Title: 'Romania'},
    { Title: 'Ukraine'},
    { Title: 'Sweden'},
    { Title: 'Italy'},
    { Title: 'Greece'},
    { Title: 'Croatia'},
    { Title: 'Bulgaria'},
    { Title: 'France'},
    { Title: 'Germany'},
    { Title: 'United States'},
    { Title: 'United Kingdom'},
    { Title: 'Israel'},
    { Title: 'Armenia'},
    { Title: 'Georgia'},
    { Title: 'Moldova'}
];

window.generateFakeData = function () {
    
    $.when(
        seedCountries()
    )
        .then(seedSampleList)
        .then(function () {
            console.warn("Finished creating two lists..");
        });

    function seedSampleList() {
        var numToCreate = 5;
        return spSchemaProvisioner.insertListItems({
            listTitle: 'CrudSample',
            itemsToCreate: _.map(_.times(numToCreate), function (item, index) { return generateItem(index); })
        });

        function generateItem(num) {
            var firstRandomCountryId = chance.natural({ min: 1, max: 8 });
            var secondRandomCountryId = chance.natural({ min: 9, max: 16 });
            return {
                Name: chance.name(), // SINGLE LINE OF TEXT
                Biography: chance.paragraph({sentences: 1}), // MULTIPLE LINES OF TEXT
                Married: chance.pickone([true, false]), // YesNo
                BirthDate: chance.date({ year: currentYear }).toISOString().split('T')[0], // DATE
                NumberOfDependents: chance.pickone([null, chance.natural({min: 1, max: 10 })]), // NUMBER
                MainCourse: chance.pickone(['Meat', 'Seafood', 'Vegetarian']), // CHOICE, DROPDOWN
                Dessert: chance.pickone(['Ice Cream', 'Pie']), // CHOICE, RADIO
                SideDishes: ['Beans', chance.pickone(['Fries', 'Rice'])], //CHOICE, CHECKBOXES
                PrimaryResidenceCountry: spSchemaProvisioner.fieldValues.generateForLookupField(chance.natural({ min: 1, max: 16 })), //LOOKUP
                CountriesVisited: spSchemaProvisioner.fieldValues.generateForLookupMultiField([firstRandomCountryId, secondRandomCountryId]), //LOOKUP (allow multiple) 
                Supervisor: spSchemaProvisioner.fieldValues.generateForPersonField(_spPageContextInfo.userId), //PERSON
                Colleagues: spSchemaProvisioner.fieldValues.generateForPersonMultiField([_spPageContextInfo.userId]) //PERSON (allow multiple) 
            };
        }
    }

    function seedCountries() {
        return spSchemaProvisioner.insertListItems({
            listTitle: 'Country',
            itemsToCreate: countriesToCreate
        });
    }
}
generateFakeData();
