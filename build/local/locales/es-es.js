"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation = {
    timeUnits: {
        anomalisticMonth: { readableName: "mes anómalo", customPlural: "meses anómalos" },
        anomalisticYear: { readableName: "año anómalo", customPlural: "años anómalos" },
        attosecond: { readableName: "attosegundo" },
        biennium: { readableName: "bienio" },
        century: { readableName: "siglo" },
        cosmicYear: { readableName: "año cósmico", customPlural: "años cósmicos" },
        day: { readableName: "día" },
        decade: { readableName: "década" },
        draconicMonth: { readableName: "mes draconico", customPlural: "meses draconicos" },
        draconicYear: { readableName: "año draconico", customPlural: "años draconicos" },
        eclipticYear: { readableName: "año eclíptico", customPlural: "años eclípticos" },
        exasecond: { readableName: "exasegundo" },
        exbisecond: { readableName: "exbisegundo" },
        femtosecond: { readableName: "femtosegundo" },
        fortnight: { readableName: "quincena" },
        galacticYear: { readableName: "año galáctico", customPlural: "años galácticos" },
        gibisecond: { readableName: "gibisegundo" },
        gigasecond: { readableName: "gigasegundo" },
        gregorianYear: { readableName: "año Gregoriano", customPlural: "años Gregorianos" },
        hour: { readableName: "hora" },
        jiffy: { readableName: "instante" },
        julianYear: { readableName: "año Juliano", customPlural: "años Julianos" },
        kibisecond: { readableName: "kibisegundo" },
        kilosecond: { readableName: "kilosegundo" },
        kiloyear: { readableName: "kiloaño" },
        leapYear: { readableName: "año bisiesto", customPlural: "años bisiestos" },
        lustrum: { readableName: "lustro" },
        mebisecond: { readableName: "mebisegundo" },
        megasecond: { readableName: "megasegundo" },
        microsecond: { readableName: "microsegundo" },
        milisecond: { readableName: "milisegundo" },
        millenium: { readableName: "milenio" },
        minute: { readableName: "minuto" },
        month: { readableName: "mes", customPlural: "meses" },
        nanosecond: { readableName: "nanosegundo" },
        nodicalMonth: { readableName: "mes nodical", customPlural: "meses nodicos" },
        nonLeapYear: { readableName: "año no bisiesto", customPlural: "años no bisiestos" },
        novennium: { readableName: "novenio" },
        octennium: { readableName: "octenio" },
        pebisecond: { readableName: "pepisegundo" },
        petasecond: { readableName: "pepasegundo" },
        picosecond: { readableName: "picosegundo" },
        planckTime: { readableName: "tiempo de Planck", customPlural: "tiempos de Planck" },
        quadrennium: { readableName: "cuadrienio" },
        quindecennium: { readableName: "quindecenio" },
        quinquennium: { readableName: "quinquenio" },
        second: { readableName: "segundo" },
        septennium: { readableName: "septenio" },
        shake: {},
        siderealDay: { readableName: "día sidéreo", customPlural: "días sidéreos" },
        siderealHour: { readableName: "hora sideral", customPlural: "horas siderales" },
        siderealMinute: { readableName: "minuto sideral", customPlural: "minutos siderales" },
        siderealMonth: { readableName: "mes sideral", customPlural: "meses siderales" },
        siderealSecond: { readableName: "segundo sideral", customPlural: "segundos siderales" },
        siderealYear: { readableName: "año sideral", customPlural: "años siderales" },
        solarDay: { readableName: "día solar", customPlural: "días solares" },
        solarYear: { readableName: "año solar", customPlural: "año solares" },
        svedberg: {},
        synodicMonth: { readableName: "mes sinódico", customPlural: "meses sinódicos" },
        tebisecond: { readableName: "tebisegundo" },
        terasecond: { readableName: "terasegundo" },
        timeUnit: { readableName: "unidad de tiempo", customPlural: "unidades de tiempo" },
        tropicalYear: { readableName: "año tropical", customPlural: "años tropicales" },
        week: { readableName: "semana" },
        year: { readableName: "año" },
        yobisecond: { readableName: "yobisegundo" },
        yoctosecond: { readableName: "yoctosegundo" },
        yottasecond: { readableName: "yotasegundo" },
        zebisecond: { readableName: "zebisegundo" },
        zeptosecond: { readableName: "zeptosegundo" },
        zettasecond: { readableName: "zettasegundo" },
    },
    writerOptions: {
        decimalSeparator: ",",
        termApproximately: "aproximadamente",
        termInfinite: "infinitos",
        termNaN: "número inválido de",
    },
};
exports.default = translation;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2NhbGVzL2VzLWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsTUFBTSxXQUFXLEdBQW1CO0lBQ2hDLFNBQVMsRUFBRTtRQUNQLGdCQUFnQixFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUU7UUFDakYsZUFBZSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFO1FBQy9FLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRTtRQUNwQyxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFO1FBQ2xDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRTtRQUMxRSxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFO1FBQzVCLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUU7UUFDbEMsYUFBYSxFQUFFLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUU7UUFDbEYsWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7UUFDaEYsWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7UUFDaEYsU0FBUyxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRTtRQUN6QyxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzNDLFdBQVcsRUFBRSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUU7UUFDN0MsU0FBUyxFQUFFLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRTtRQUN2QyxZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTtRQUNoRixVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzNDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsYUFBYSxFQUFFLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRTtRQUNuRixJQUFJLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFO1FBQzlCLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUU7UUFDbkMsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFO1FBQzFFLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtRQUMzQyxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFO1FBQ3JDLFFBQVEsRUFBRSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFO1FBQzFFLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUU7UUFDbkMsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtRQUMzQyxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzNDLFdBQVcsRUFBRSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUU7UUFDN0MsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtRQUMzQyxTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFO1FBQ3RDLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUU7UUFDbEMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFO1FBQ3JELFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFO1FBQzVFLFdBQVcsRUFBRSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUU7UUFDbkYsU0FBUyxFQUFFLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRTtRQUN0QyxTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFO1FBQ3RDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtRQUMzQyxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzNDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUU7UUFDbkYsV0FBVyxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRTtRQUMzQyxhQUFhLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzlDLFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUU7UUFDNUMsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRTtRQUNuQyxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFO1FBQ3hDLEtBQUssRUFBRSxFQUFFO1FBQ1QsV0FBVyxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFO1FBQzNFLFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFO1FBQy9FLGNBQWMsRUFBRSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUU7UUFDckYsYUFBYSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7UUFDL0UsY0FBYyxFQUFFLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRTtRQUN2RixZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRTtRQUM3RSxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUU7UUFDckUsU0FBUyxFQUFFLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQ3JFLFFBQVEsRUFBRSxFQUFFO1FBQ1osWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7UUFDL0UsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtRQUMzQyxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzNDLFFBQVEsRUFBRSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUU7UUFDbEYsWUFBWSxFQUFFLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7UUFDL0UsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRTtRQUNoQyxJQUFJLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFO1FBQzdCLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsV0FBVyxFQUFFLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRTtRQUM3QyxXQUFXLEVBQUUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzVDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7UUFDM0MsV0FBVyxFQUFFLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRTtRQUM3QyxXQUFXLEVBQUUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFO0tBQ2hEO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsZ0JBQWdCLEVBQUUsR0FBRztRQUNyQixpQkFBaUIsRUFBRSxpQkFBaUI7UUFDcEMsWUFBWSxFQUFFLFdBQVc7UUFDekIsT0FBTyxFQUFFLG9CQUFvQjtLQUNoQztDQUNKLENBQUM7QUFFRixrQkFBZSxXQUFXLENBQUMiLCJmaWxlIjoibG9jYWxlcy9lcy1lcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgMjAxNy0yMDE4IFBlZHJvIEpvc8OpIEJhdGlzdGFcclxuTUlUIExpY2Vuc2VcclxuXHJcblNlZSB0aGUgTElDRU5TRSBmaWxlIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5pbXBvcnQgeyBMb2NhbGVTZXR0aW5ncyB9IGZyb20gXCIuLi9sb2NhbGl6YXRpb25cIjtcclxuXHJcbmNvbnN0IHRyYW5zbGF0aW9uOiBMb2NhbGVTZXR0aW5ncyA9IHtcclxuICAgIHRpbWVVbml0czoge1xyXG4gICAgICAgIGFub21hbGlzdGljTW9udGg6IHsgcmVhZGFibGVOYW1lOiBcIm1lcyBhbsOzbWFsb1wiLCBjdXN0b21QbHVyYWw6IFwibWVzZXMgYW7Ds21hbG9zXCIgfSxcclxuICAgICAgICBhbm9tYWxpc3RpY1llYXI6IHsgcmVhZGFibGVOYW1lOiBcImHDsW8gYW7Ds21hbG9cIiwgY3VzdG9tUGx1cmFsOiBcImHDsW9zIGFuw7NtYWxvc1wiIH0sXHJcbiAgICAgICAgYXR0b3NlY29uZDogeyByZWFkYWJsZU5hbWU6IFwiYXR0b3NlZ3VuZG9cIiB9LFxyXG4gICAgICAgIGJpZW5uaXVtOiB7IHJlYWRhYmxlTmFtZTogXCJiaWVuaW9cIiB9LFxyXG4gICAgICAgIGNlbnR1cnk6IHsgcmVhZGFibGVOYW1lOiBcInNpZ2xvXCIgfSxcclxuICAgICAgICBjb3NtaWNZZWFyOiB7IHJlYWRhYmxlTmFtZTogXCJhw7FvIGPDs3NtaWNvXCIsIGN1c3RvbVBsdXJhbDogXCJhw7FvcyBjw7NzbWljb3NcIiB9LFxyXG4gICAgICAgIGRheTogeyByZWFkYWJsZU5hbWU6IFwiZMOtYVwiIH0sXHJcbiAgICAgICAgZGVjYWRlOiB7IHJlYWRhYmxlTmFtZTogXCJkw6ljYWRhXCIgfSxcclxuICAgICAgICBkcmFjb25pY01vbnRoOiB7IHJlYWRhYmxlTmFtZTogXCJtZXMgZHJhY29uaWNvXCIsIGN1c3RvbVBsdXJhbDogXCJtZXNlcyBkcmFjb25pY29zXCIgfSxcclxuICAgICAgICBkcmFjb25pY1llYXI6IHsgcmVhZGFibGVOYW1lOiBcImHDsW8gZHJhY29uaWNvXCIsIGN1c3RvbVBsdXJhbDogXCJhw7FvcyBkcmFjb25pY29zXCIgfSxcclxuICAgICAgICBlY2xpcHRpY1llYXI6IHsgcmVhZGFibGVOYW1lOiBcImHDsW8gZWNsw61wdGljb1wiLCBjdXN0b21QbHVyYWw6IFwiYcOxb3MgZWNsw61wdGljb3NcIiB9LFxyXG4gICAgICAgIGV4YXNlY29uZDogeyByZWFkYWJsZU5hbWU6IFwiZXhhc2VndW5kb1wiIH0sXHJcbiAgICAgICAgZXhiaXNlY29uZDogeyByZWFkYWJsZU5hbWU6IFwiZXhiaXNlZ3VuZG9cIiB9LFxyXG4gICAgICAgIGZlbXRvc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJmZW10b3NlZ3VuZG9cIiB9LFxyXG4gICAgICAgIGZvcnRuaWdodDogeyByZWFkYWJsZU5hbWU6IFwicXVpbmNlbmFcIiB9LFxyXG4gICAgICAgIGdhbGFjdGljWWVhcjogeyByZWFkYWJsZU5hbWU6IFwiYcOxbyBnYWzDoWN0aWNvXCIsIGN1c3RvbVBsdXJhbDogXCJhw7FvcyBnYWzDoWN0aWNvc1wiIH0sXHJcbiAgICAgICAgZ2liaXNlY29uZDogeyByZWFkYWJsZU5hbWU6IFwiZ2liaXNlZ3VuZG9cIiB9LFxyXG4gICAgICAgIGdpZ2FzZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcImdpZ2FzZWd1bmRvXCIgfSxcclxuICAgICAgICBncmVnb3JpYW5ZZWFyOiB7IHJlYWRhYmxlTmFtZTogXCJhw7FvIEdyZWdvcmlhbm9cIiwgY3VzdG9tUGx1cmFsOiBcImHDsW9zIEdyZWdvcmlhbm9zXCIgfSxcclxuICAgICAgICBob3VyOiB7IHJlYWRhYmxlTmFtZTogXCJob3JhXCIgfSxcclxuICAgICAgICBqaWZmeTogeyByZWFkYWJsZU5hbWU6IFwiaW5zdGFudGVcIiB9LFxyXG4gICAgICAgIGp1bGlhblllYXI6IHsgcmVhZGFibGVOYW1lOiBcImHDsW8gSnVsaWFub1wiLCBjdXN0b21QbHVyYWw6IFwiYcOxb3MgSnVsaWFub3NcIiB9LFxyXG4gICAgICAgIGtpYmlzZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcImtpYmlzZWd1bmRvXCIgfSxcclxuICAgICAgICBraWxvc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJraWxvc2VndW5kb1wiIH0sXHJcbiAgICAgICAga2lsb3llYXI6IHsgcmVhZGFibGVOYW1lOiBcImtpbG9hw7FvXCIgfSxcclxuICAgICAgICBsZWFwWWVhcjogeyByZWFkYWJsZU5hbWU6IFwiYcOxbyBiaXNpZXN0b1wiLCBjdXN0b21QbHVyYWw6IFwiYcOxb3MgYmlzaWVzdG9zXCIgfSxcclxuICAgICAgICBsdXN0cnVtOiB7IHJlYWRhYmxlTmFtZTogXCJsdXN0cm9cIiB9LFxyXG4gICAgICAgIG1lYmlzZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcIm1lYmlzZWd1bmRvXCIgfSxcclxuICAgICAgICBtZWdhc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJtZWdhc2VndW5kb1wiIH0sXHJcbiAgICAgICAgbWljcm9zZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcIm1pY3Jvc2VndW5kb1wiIH0sXHJcbiAgICAgICAgbWlsaXNlY29uZDogeyByZWFkYWJsZU5hbWU6IFwibWlsaXNlZ3VuZG9cIiB9LFxyXG4gICAgICAgIG1pbGxlbml1bTogeyByZWFkYWJsZU5hbWU6IFwibWlsZW5pb1wiIH0sXHJcbiAgICAgICAgbWludXRlOiB7IHJlYWRhYmxlTmFtZTogXCJtaW51dG9cIiB9LFxyXG4gICAgICAgIG1vbnRoOiB7IHJlYWRhYmxlTmFtZTogXCJtZXNcIiwgY3VzdG9tUGx1cmFsOiBcIm1lc2VzXCIgfSxcclxuICAgICAgICBuYW5vc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJuYW5vc2VndW5kb1wiIH0sXHJcbiAgICAgICAgbm9kaWNhbE1vbnRoOiB7IHJlYWRhYmxlTmFtZTogXCJtZXMgbm9kaWNhbFwiLCBjdXN0b21QbHVyYWw6IFwibWVzZXMgbm9kaWNvc1wiIH0sXHJcbiAgICAgICAgbm9uTGVhcFllYXI6IHsgcmVhZGFibGVOYW1lOiBcImHDsW8gbm8gYmlzaWVzdG9cIiwgY3VzdG9tUGx1cmFsOiBcImHDsW9zIG5vIGJpc2llc3Rvc1wiIH0sXHJcbiAgICAgICAgbm92ZW5uaXVtOiB7IHJlYWRhYmxlTmFtZTogXCJub3ZlbmlvXCIgfSxcclxuICAgICAgICBvY3Rlbm5pdW06IHsgcmVhZGFibGVOYW1lOiBcIm9jdGVuaW9cIiB9LFxyXG4gICAgICAgIHBlYmlzZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcInBlcGlzZWd1bmRvXCIgfSxcclxuICAgICAgICBwZXRhc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJwZXBhc2VndW5kb1wiIH0sXHJcbiAgICAgICAgcGljb3NlY29uZDogeyByZWFkYWJsZU5hbWU6IFwicGljb3NlZ3VuZG9cIiB9LFxyXG4gICAgICAgIHBsYW5ja1RpbWU6IHsgcmVhZGFibGVOYW1lOiBcInRpZW1wbyBkZSBQbGFuY2tcIiwgY3VzdG9tUGx1cmFsOiBcInRpZW1wb3MgZGUgUGxhbmNrXCIgfSxcclxuICAgICAgICBxdWFkcmVubml1bTogeyByZWFkYWJsZU5hbWU6IFwiY3VhZHJpZW5pb1wiIH0sXHJcbiAgICAgICAgcXVpbmRlY2Vubml1bTogeyByZWFkYWJsZU5hbWU6IFwicXVpbmRlY2VuaW9cIiB9LFxyXG4gICAgICAgIHF1aW5xdWVubml1bTogeyByZWFkYWJsZU5hbWU6IFwicXVpbnF1ZW5pb1wiIH0sXHJcbiAgICAgICAgc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJzZWd1bmRvXCIgfSxcclxuICAgICAgICBzZXB0ZW5uaXVtOiB7IHJlYWRhYmxlTmFtZTogXCJzZXB0ZW5pb1wiIH0sXHJcbiAgICAgICAgc2hha2U6IHt9LFxyXG4gICAgICAgIHNpZGVyZWFsRGF5OiB7IHJlYWRhYmxlTmFtZTogXCJkw61hIHNpZMOpcmVvXCIsIGN1c3RvbVBsdXJhbDogXCJkw61hcyBzaWTDqXJlb3NcIiB9LFxyXG4gICAgICAgIHNpZGVyZWFsSG91cjogeyByZWFkYWJsZU5hbWU6IFwiaG9yYSBzaWRlcmFsXCIsIGN1c3RvbVBsdXJhbDogXCJob3JhcyBzaWRlcmFsZXNcIiB9LFxyXG4gICAgICAgIHNpZGVyZWFsTWludXRlOiB7IHJlYWRhYmxlTmFtZTogXCJtaW51dG8gc2lkZXJhbFwiLCBjdXN0b21QbHVyYWw6IFwibWludXRvcyBzaWRlcmFsZXNcIiB9LFxyXG4gICAgICAgIHNpZGVyZWFsTW9udGg6IHsgcmVhZGFibGVOYW1lOiBcIm1lcyBzaWRlcmFsXCIsIGN1c3RvbVBsdXJhbDogXCJtZXNlcyBzaWRlcmFsZXNcIiB9LFxyXG4gICAgICAgIHNpZGVyZWFsU2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJzZWd1bmRvIHNpZGVyYWxcIiwgY3VzdG9tUGx1cmFsOiBcInNlZ3VuZG9zIHNpZGVyYWxlc1wiIH0sXHJcbiAgICAgICAgc2lkZXJlYWxZZWFyOiB7IHJlYWRhYmxlTmFtZTogXCJhw7FvIHNpZGVyYWxcIiwgY3VzdG9tUGx1cmFsOiBcImHDsW9zIHNpZGVyYWxlc1wiIH0sXHJcbiAgICAgICAgc29sYXJEYXk6IHsgcmVhZGFibGVOYW1lOiBcImTDrWEgc29sYXJcIiwgY3VzdG9tUGx1cmFsOiBcImTDrWFzIHNvbGFyZXNcIiB9LFxyXG4gICAgICAgIHNvbGFyWWVhcjogeyByZWFkYWJsZU5hbWU6IFwiYcOxbyBzb2xhclwiLCBjdXN0b21QbHVyYWw6IFwiYcOxbyBzb2xhcmVzXCIgfSxcclxuICAgICAgICBzdmVkYmVyZzoge30sXHJcbiAgICAgICAgc3lub2RpY01vbnRoOiB7IHJlYWRhYmxlTmFtZTogXCJtZXMgc2luw7NkaWNvXCIsIGN1c3RvbVBsdXJhbDogXCJtZXNlcyBzaW7Ds2RpY29zXCIgfSxcclxuICAgICAgICB0ZWJpc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJ0ZWJpc2VndW5kb1wiIH0sXHJcbiAgICAgICAgdGVyYXNlY29uZDogeyByZWFkYWJsZU5hbWU6IFwidGVyYXNlZ3VuZG9cIiB9LFxyXG4gICAgICAgIHRpbWVVbml0OiB7IHJlYWRhYmxlTmFtZTogXCJ1bmlkYWQgZGUgdGllbXBvXCIsIGN1c3RvbVBsdXJhbDogXCJ1bmlkYWRlcyBkZSB0aWVtcG9cIiB9LFxyXG4gICAgICAgIHRyb3BpY2FsWWVhcjogeyByZWFkYWJsZU5hbWU6IFwiYcOxbyB0cm9waWNhbFwiLCBjdXN0b21QbHVyYWw6IFwiYcOxb3MgdHJvcGljYWxlc1wiIH0sXHJcbiAgICAgICAgd2VlazogeyByZWFkYWJsZU5hbWU6IFwic2VtYW5hXCIgfSxcclxuICAgICAgICB5ZWFyOiB7IHJlYWRhYmxlTmFtZTogXCJhw7FvXCIgfSxcclxuICAgICAgICB5b2Jpc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJ5b2Jpc2VndW5kb1wiIH0sXHJcbiAgICAgICAgeW9jdG9zZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcInlvY3Rvc2VndW5kb1wiIH0sXHJcbiAgICAgICAgeW90dGFzZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcInlvdGFzZWd1bmRvXCIgfSxcclxuICAgICAgICB6ZWJpc2Vjb25kOiB7IHJlYWRhYmxlTmFtZTogXCJ6ZWJpc2VndW5kb1wiIH0sXHJcbiAgICAgICAgemVwdG9zZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcInplcHRvc2VndW5kb1wiIH0sXHJcbiAgICAgICAgemV0dGFzZWNvbmQ6IHsgcmVhZGFibGVOYW1lOiBcInpldHRhc2VndW5kb1wiIH0sXHJcbiAgICB9LFxyXG4gICAgd3JpdGVyT3B0aW9uczoge1xyXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IFwiLFwiLFxyXG4gICAgICAgIHRlcm1BcHByb3hpbWF0ZWx5OiBcImFwcm94aW1hZGFtZW50ZVwiLFxyXG4gICAgICAgIHRlcm1JbmZpbml0ZTogXCJpbmZpbml0b3NcIixcclxuICAgICAgICB0ZXJtTmFOOiBcIm7Dum1lcm8gaW52w6FsaWRvIGRlXCIsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRpb247XHJcbiJdfQ==