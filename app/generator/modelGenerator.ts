export class BankGenerator {
    static generate(name : string) : any {
        return {
            "name": name,
            "patches": [PatchGenerator.generate('Example patch')]
        };
    }
}

export class PatchGenerator {
    static generate(name : string) : any {
        return {
            "name": name,
            "effects": [],
            "connections": []
        };
    }
}
