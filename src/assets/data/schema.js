var crudsampleSchema = { lists: {} };

crudsampleSchema.lists['CrudSample'] = {
    BaseTemplate: 'genericList',    //custom list
    shouldHideTitleField: true,     //hide Title field from NewForm.aspx and EditForm.aspx
    fieldsToCreate: [
        {
            //EXAMPLE: SINGLE LINE OF TEXT
            Name: "Name",
            DisplayName: "Name",
            Type: "Text",
            Required: "FALSE",
            MaxLength: 255,
            Default: ""								//(optional)
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT
            Name: "Biography",
            DisplayName: "Biography",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE"
        },
        {
            //EXAMPLE: Yes/No 
            Name: "Married",
            DisplayName: "Married (Y/N)",
            Type: "Boolean",
            Default: 0								//(optional) Use 0 if you want default to be 'No', 1 if for 'Yes'
        },
        {
            //EXAMPLE: DateTime
            Name: "BirthDate",
            DisplayName: "Birth Date",
            Type: "DateTime",
            Required: "FALSE",
            Format: "DateOnly", 					//please use either 'DateOnly' or 'DateTime'
            Default: '[today]'						//(optional)	
        },
        {
            //EXAMPLE: Number
            Name: "NumberOfDependents",
            DisplayName: "NumberOfDependents",
            Type: "Number",
            Required: "FALSE",
            Decimals: 0, 							//please use number between 0 and 5 only
            Min: 0,								//(optional)	
            Max: 10,								//(optional)	
            Default: 0 								//(optional)	
        },
        {
            //EXAMPLE: Dropdown
            Name: "MainCourse",
            DisplayName: "MainCourse",
            Type: "Choice",
            Format: "Dropdown",
            Required: "FALSE",
            FillInChoice: "FALSE",
            Choices: ['Meat', 'Seafood', 'Vegetarian'],
            Default: 'Meat'							//(optional)
        },
        {
            //EXAMPLE: Radio Buttons
            Name: "Dessert",
            DisplayName: "Dessert",
            Type: "Choice",
            Format: "RadioButtons",
            Required: "FALSE",
            FillInChoice: "FALSE",
            Choices: ['Ice Cream', 'Pie'],
            Default: 'Pie'							//(optional)
        },
        {
            //EXAMPLE: Checkboxes
            Name: "SideDishes",
            DisplayName: "SideDishes",
            Type: "MultiChoice",
            Required: "FALSE",
            FillInChoice: "FALSE",
            Choices: ['Beans', 'Rice', 'Fries'],
            Default: 'Beans'						//(optional)
        },
        {
            //EXAMPLE: Lookup field
            Name: "PrimaryResidenceCountry",
            DisplayName: "PrimaryResidenceCountry",
            Type: "Lookup",
            Required: "FALSE",
            List: "Country",                 //ASSUMPTION:  This list lives in the same subsite
            ShowField: 'ID'
        },
        {
            //EXAMPLE: Lookup field (allow multiple)
            Name: "CountriesVisited",
            DisplayName: "CountriesVisited",
            Type: "LookupMulti",                
            Required: "FALSE",
            List: "Country",                 //ASSUMPTION:  This list lives in the same subsite
            ShowField: 'ID',
            Mult: "TRUE"
        },
        {
            //EXAMPLE: Person or Group 
            Name: "Supervisor",
            DisplayName: "Supervisor",
            Type: "User",
            Required: "FALSE",
            UserSelectionMode: "PeopleOnly",	//please specify either 'PeopleOnly' or 'PeopleAndGroups'
            ShowField: 'ImnName'				//Name with presence	
        },
        {
            //EXAMPLE: Person or Group (allow multiple)
            Name: "Colleagues",
            DisplayName: "Colleagues",
            Type: "UserMulti",
            Required: "FALSE",
            UserSelectionMode: "PeopleAndGroups",	//please specify either 'PeopleOnly' or 'PeopleAndGroups'
            ShowField: 'ImnName',				//Name with presence	
            Mult: "TRUE"
        },
        {
            //EXAMPLE: MULTIPLE LINE OF TEXT (but used to store JSON)
            Name: "Cars",
            DisplayName: "Cars",
            Type: "Note",
            Required: "FALSE",
            NumLines: 6,
            RichText: "FALSE"
        }
    ]
};

crudsampleSchema.lists['Country'] = {
    BaseTemplate: 'genericList',
    shouldHideTitleField: false,
    fieldsToCreate: [
    ]
};