'use strict';

class RecurrenceRule {
    constructor() {
        this.rules = new Object();
    }

    getRules(){
        return this.rules;
    }
    makeRule(key, value) {
        this.rules[key] = value;
    }
    hasRule (key) {
        return !!this.rules[key];
    }

    deleteRule(key) {
        delete this.rules[key];
    }

    getRecurrenceString() {
        let rules = '';

        for (const [key, value] of Object.entries(this.rules)) {

            rules += `${key.toUpperCase()}=${value};`;
        }
        rules = rules.substring(0, rules.length-1);
        console.log(rules);
        return rules;

    }
    getRepeatEndRule() {
        const rules = this.rules;
        if('count' in rules) {
            return 'count';
        }

        if('until' in rules) {
            return 'until';
        }

        return 'never';
    }
}

