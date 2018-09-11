import { createElement } from '@syncfusion/ej2-base';
import { Diagram, } from '../../../src/diagram/diagram';
import { NodeModel, BasicShapeModel } from '../../../src/diagram/objects/node-model';
import { ConnectorModel } from '../../../src/diagram/objects/connector-model';
import { Layer } from "../../../src/diagram/diagram/layer";

/**
 * Order Command spec
 */
describe('Diagram Control', () => {

    describe('order command for canvas ', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let selArray: any = [];

        beforeAll((): void => {
            ele = createElement('div', { id: 'diagram' });
            document.body.appendChild(ele);
            let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle' };
            let node1: NodeModel[] = [
                {
                    id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100, zIndex: 2,
                    ports: [{
                        id: 'port1',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Mouse Hover' }]
                },
                {
                    id: 'node2', width: 100, height: 100, offsetX: 125, offsetY: 100, zIndex: 10,
                    ports: [{
                        id: 'port2',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Connect' }]
                },
                {
                    id: 'node3', width: 100, height: 100, offsetX: 150, offsetY: 100, zIndex: 4,
                    ports: [{
                        id: 'port3',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Port Visible' }]
                },
                {
                    id: 'node4', width: 100, height: 100, offsetX: 160, offsetY: 100,
                    ports: [{
                        id: 'port4',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Port Hidden' }]
                },
            ]
            let connectors: ConnectorModel[] = [{
                id: 'connector1',
                type: 'Straight',
                sourcePoint: { x: 100, y: 100 },
                targetPoint: { x: 200, y: 200 }, zIndex: 0
            }];
            diagram = new Diagram({
                width: 1500, height: 1000, nodes: node1,mode:'Canvas'
            });
            diagram.appendTo('#diagram');
            selArray.push(diagram.nodes[0]);
            diagram.select(selArray);

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('chande the order of the element ', (done: Function) => {
            diagram.select(selArray);
            diagram.sendToBack();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.bringToFront();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[10]).toBe(true);
            done();
            diagram.sendBackward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[9]).toBe(true);
            done();
            diagram.moveForward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[10]).toBe(true);
            done();
        });
    });


    describe('order command for canvas ', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let selArray: any = [];

        beforeAll((): void => {
            ele = createElement('div', { id: 'diagram' });
            document.body.appendChild(ele);
            let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle' };
            let node1: NodeModel = { id: 'node', offsetX: 100, offsetY: 100, width: 100, height: 100, shape: shape };
            let connectors: ConnectorModel[] = [{
                id: 'connector1',
                type: 'Straight',
                sourcePoint: { x: 100, y: 100 },
                targetPoint: { x: 200, y: 200 },
            }];
            diagram = new Diagram({
                width: 1500, height: 1000, nodes: [node1], connectors: connectors,mode:'Canvas'
            });
            diagram.appendTo('#diagram');
            selArray.push(diagram.nodes[0]);
            diagram.select(selArray);

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('chande the order of the element ', (done: Function) => {
            diagram.select(selArray);
            diagram.sendToBack()
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.bringToFront();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[Object.keys((diagram.layers[0] as Layer).zIndexTable).length - 1]).toBe(true);
            done();
            done();
            diagram.sendBackward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.moveForward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[1]).toBe(true);
            done();

            diagram.select([diagram.nameTable['connector1']])
            diagram.sendToBack()
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.bringToFront();
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[Object.keys((diagram.layers[0] as Layer).zIndexTable).length - 1]).toBe(true);
            done();
            diagram.sendBackward();
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.moveForward();
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[1]).toBe(true);
            done();
            diagram.clearSelection();
            diagram.sendBackward();
            expect(diagram.selectedItems.nodes.length).toBe(0);

            diagram.sendToBack();
            expect(diagram.selectedItems.connectors.length).toBe(0);

            diagram.bringToFront();
            expect(diagram.selectedItems.connectors.length).toBe(0);

            diagram.moveForward();
            expect(diagram.selectedItems.nodes.length).toBe(0);

        });
    });

      describe('order command for svg ', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let selArray: any = [];

        beforeAll((): void => {
            ele = createElement('div', { id: 'diagram' });
            document.body.appendChild(ele);
            let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle' };
            let node1: NodeModel[] = [
                {
                    id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100, zIndex: 2,
                    ports: [{
                        id: 'port1',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Mouse Hover' }]
                },
                {
                    id: 'node2', width: 100, height: 100, offsetX: 125, offsetY: 100, zIndex: 10,
                    ports: [{
                        id: 'port2',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Connect' }]
                },
                {
                    id: 'node3', width: 100, height: 100, offsetX: 150, offsetY: 100, zIndex: 4,
                    ports: [{
                        id: 'port3',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Port Visible' }]
                },
                {
                    id: 'node4', width: 100, height: 100, offsetX: 160, offsetY: 100,
                    ports: [{
                        id: 'port4',
                        shape: 'Circle',
                        offset: { x: 1, y: 0.75 }
                    }],
                    annotations: [{ content: 'Port Hidden' }]
                },
            ]
            let connectors: ConnectorModel[] = [{
                id: 'connector1',
                type: 'Straight',
                sourcePoint: { x: 100, y: 100 },
                targetPoint: { x: 200, y: 200 }, zIndex: 0
            }];
            diagram = new Diagram({
                width: 1500, height: 1000, nodes: node1
            });
            diagram.appendTo('#diagram');
            selArray.push(diagram.nodes[0]);
            diagram.select(selArray);

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('chande the order of the element ', (done: Function) => {
            diagram.select(selArray);
            diagram.sendToBack();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.bringToFront();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[10]).toBe(true);
            done();
            diagram.sendBackward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[9]).toBe(true);
            done();
            diagram.moveForward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[10]).toBe(true);
            done();
        });
    });


    describe('order command for svg ', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let selArray: any = [];

        beforeAll((): void => {
            ele = createElement('div', { id: 'diagram' });
            document.body.appendChild(ele);
            let shape: BasicShapeModel = { type: 'Basic', shape: 'Rectangle' };
            let node1: NodeModel = { id: 'node', offsetX: 100, offsetY: 100, width: 100, height: 100, shape: shape };
            let connectors: ConnectorModel[] = [{
                id: 'connector1',
                type: 'Straight',
                sourcePoint: { x: 100, y: 100 },
                targetPoint: { x: 200, y: 200 },
            }];
            diagram = new Diagram({
                width: 1500, height: 1000, nodes: [node1], connectors: connectors
            });
            diagram.appendTo('#diagram');
            selArray.push(diagram.nodes[0]);
            diagram.select(selArray);

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('chande the order of the element ', (done: Function) => {
            diagram.select(selArray);
            diagram.sendToBack()
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.bringToFront();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[Object.keys((diagram.layers[0] as Layer).zIndexTable).length - 1]).toBe(true);
            done();
            done();
            diagram.sendBackward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.moveForward();
            expect(diagram.selectedItems.nodes[0].id === (diagram.layers[0] as Layer).zIndexTable[1]).toBe(true);
            done();

            diagram.select([diagram.nameTable['connector1']])
            diagram.sendToBack()
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.bringToFront();
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[Object.keys((diagram.layers[0] as Layer).zIndexTable).length - 1]).toBe(true);
            done();
            diagram.sendBackward();
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[0]).toBe(true);
            done();
            diagram.moveForward();
            expect(diagram.selectedItems.connectors[0].id === (diagram.layers[0] as Layer).zIndexTable[1]).toBe(true);
            done();
            diagram.clearSelection();
            diagram.sendBackward();
            expect(diagram.selectedItems.nodes.length).toBe(0);

            diagram.sendToBack();
            expect(diagram.selectedItems.connectors.length).toBe(0);

            diagram.bringToFront();
            expect(diagram.selectedItems.connectors.length).toBe(0);

            diagram.moveForward();
            expect(diagram.selectedItems.nodes.length).toBe(0);

        });
        describe('order command for svg and native elements', () => {
        let diagram: Diagram;
        let ele: HTMLElement;
        let selArray: any = [];

        beforeAll((): void => {
            ele = createElement('div', { id: 'diagram' });
            document.body.appendChild(ele);
            let nativenode =  '<g xmlns="http://www.w3.org/2000/svg">	<g transform="translate(1 1)">		<g>			<path style="fill:#61443C;" d="M61.979,435.057c2.645-0.512,5.291-0.853,7.936-1.109c-2.01,1.33-4.472,1.791-6.827,1.28     C62.726,435.13,62.354,435.072,61.979,435.057z"/>			<path style="fill:#61443C;" d="M502.469,502.471h-25.6c0.163-30.757-20.173-57.861-49.749-66.304     c-5.784-1.581-11.753-2.385-17.749-2.389c-2.425-0.028-4.849,0.114-7.253,0.427c1.831-7.63,2.747-15.45,2.731-23.296     c0.377-47.729-34.52-88.418-81.749-95.317c4.274-0.545,8.577-0.83,12.885-0.853c25.285,0.211,49.448,10.466,67.167,28.504     c17.719,18.039,27.539,42.382,27.297,67.666c0.017,7.846-0.9,15.666-2.731,23.296c2.405-0.312,4.829-0.455,7.253-0.427     C472.572,434.123,502.783,464.869,502.469,502.471z"/>		</g>		<path style="fill:#8B685A;" d="M476.869,502.471H7.536c-0.191-32.558,22.574-60.747,54.443-67.413    c0.375,0.015,0.747,0.072,1.109,0.171c2.355,0.511,4.817,0.05,6.827-1.28c1.707-0.085,3.413-0.171,5.12-0.171    c4.59,0,9.166,0.486,13.653,1.451c2.324,0.559,4.775,0.147,6.787-1.141c2.013-1.288,3.414-3.341,3.879-5.685    c7.68-39.706,39.605-70.228,79.616-76.117c4.325-0.616,8.687-0.929,13.056-0.939c13.281-0.016,26.409,2.837,38.485,8.363    c3.917,1.823,7.708,3.904,11.349,6.229c2.039,1.304,4.527,1.705,6.872,1.106c2.345-0.598,4.337-2.142,5.502-4.264    c14.373-25.502,39.733-42.923,68.693-47.189h0.171c47.229,6.899,82.127,47.588,81.749,95.317c0.017,7.846-0.9,15.666-2.731,23.296    c2.405-0.312,4.829-0.455,7.253-0.427c5.996,0.005,11.965,0.808,17.749,2.389C456.696,444.61,477.033,471.713,476.869,502.471    L476.869,502.471z"/>		<path style="fill:#66993E;" d="M502.469,7.537c0,0-6.997,264.96-192.512,252.245c-20.217-1.549-40.166-5.59-59.392-12.032    c-1.365-0.341-2.731-0.853-4.096-1.28c0,0-0.597-2.219-1.451-6.144c-6.656-34.048-25.088-198.997,231.765-230.144    C485.061,9.159,493.595,8.22,502.469,7.537z"/>		<path style="fill:#9ACA5C;" d="M476.784,10.183c-1.28,26.197-16.213,238.165-166.827,249.6    c-20.217-1.549-40.166-5.59-59.392-12.032c-1.365-0.341-2.731-0.853-4.096-1.28c0,0-0.597-2.219-1.451-6.144    C238.363,206.279,219.931,41.329,476.784,10.183z"/>		<path style="fill:#66993E;" d="M206.192,246.727c-0.768,3.925-1.365,6.144-1.365,6.144c-1.365,0.427-2.731,0.939-4.096,1.28    c-21.505,7.427-44.293,10.417-66.987,8.789C21.104,252.103,8.816,94.236,7.621,71.452c-0.085-1.792-0.085-2.731-0.085-2.731    C222.747,86.129,211.653,216.689,206.192,246.727z"/>		<path style="fill:#9ACA5C;" d="M180.336,246.727c-0.768,3.925-1.365,6.144-1.365,6.144c-1.365,0.427-2.731,0.939-4.096,1.28    c-13.351,4.412-27.142,7.359-41.131,8.789C21.104,252.103,8.816,94.236,7.621,71.452    C195.952,96.881,185.541,217.969,180.336,246.727z"/>	</g>	<g>		<path d="M162.136,426.671c3.451-0.001,6.562-2.08,7.882-5.268s0.591-6.858-1.849-9.298l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012l8.533,8.533    C157.701,425.773,159.872,426.673,162.136,426.671L162.136,426.671z"/>		<path d="M292.636,398.57c3.341,3.281,8.701,3.256,12.012-0.054c3.311-3.311,3.335-8.671,0.054-12.012l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054s-3.335,8.671-0.054,12.012L292.636,398.57z"/>		<path d="M296.169,454.771c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012l8.533,8.533    c3.341,3.281,8.701,3.256,12.012-0.054c3.311-3.311,3.335-8.671,0.054-12.012L296.169,454.771z"/>		<path d="M386.503,475.37c3.341,3.281,8.701,3.256,12.012-0.054c3.311-3.311,3.335-8.671,0.054-12.012l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012L386.503,475.37z"/>		<path d="M204.803,409.604c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C198.241,407.524,201.352,409.603,204.803,409.604z"/>		<path d="M332.803,443.737c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C326.241,441.658,329.352,443.737,332.803,443.737z"/>		<path d="M341.336,366.937c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C334.774,364.858,337.885,366.937,341.336,366.937z"/>		<path d="M164.636,454.771l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C173.337,451.515,167.977,451.49,164.636,454.771L164.636,454.771z"/>		<path d="M232.903,429.171l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C241.604,425.915,236.243,425.89,232.903,429.171L232.903,429.171z"/>		<path d="M384.003,409.604c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C377.441,407.524,380.552,409.603,384.003,409.604z"/>		<path d="M70.77,463.304l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271s3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C79.47,460.048,74.11,460.024,70.77,463.304L70.77,463.304z"/>		<path d="M121.97,446.238l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C130.67,442.981,125.31,442.957,121.97,446.238L121.97,446.238z"/>		<path d="M202.302,420.638c-1.6-1.601-3.77-2.5-6.033-2.5c-2.263,0-4.433,0.899-6.033,2.5l-8.533,8.533    c-2.178,2.151-3.037,5.304-2.251,8.262c0.786,2.958,3.097,5.269,6.055,6.055c2.958,0.786,6.111-0.073,8.262-2.251l8.533-8.533    c1.601-1.6,2.5-3.77,2.5-6.033C204.802,424.408,203.903,422.237,202.302,420.638L202.302,420.638z"/>		<path d="M210.836,463.304c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012l8.533,8.533    c2.149,2.188,5.307,3.055,8.271,2.27c2.965-0.785,5.28-3.1,6.065-6.065c0.785-2.965-0.082-6.122-2.27-8.271L210.836,463.304z"/>		<path d="M343.836,454.771l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C352.537,451.515,347.177,451.49,343.836,454.771L343.836,454.771z"/>		<path d="M429.17,483.904c3.341,3.281,8.701,3.256,12.012-0.054s3.335-8.671,0.054-12.012l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012L429.17,483.904z"/>		<path d="M341.336,401.071c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    s-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.441-3.169,6.11-1.849,9.298C334.774,398.991,337.885,401.07,341.336,401.071z"/>		<path d="M273.069,435.204c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    s-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298C266.508,433.124,269.618,435.203,273.069,435.204z"/>		<path d="M253.318,258.138c22.738,7.382,46.448,11.338,70.351,11.737c31.602,0.543,62.581-8.828,88.583-26.796    c94.225-65.725,99.567-227.462,99.75-234.317c0.059-2.421-0.91-4.754-2.667-6.421c-1.751-1.679-4.141-2.52-6.558-2.308    C387.311,9.396,307.586,44.542,265.819,104.5c-28.443,42.151-38.198,94.184-26.956,143.776c-3.411,8.366-6.04,17.03-7.852,25.881    c-4.581-7.691-9.996-14.854-16.147-21.358c8.023-38.158,0.241-77.939-21.57-110.261C160.753,95.829,98.828,68.458,9.228,61.196    c-2.417-0.214-4.808,0.628-6.558,2.308c-1.757,1.667-2.726,4-2.667,6.421c0.142,5.321,4.292,130.929,77.717,182.142    c20.358,14.081,44.617,21.428,69.367,21.008c18.624-0.309,37.097-3.388,54.814-9.138c11.69,12.508,20.523,27.407,25.889,43.665    c0.149,15.133,2.158,30.19,5.982,44.832c-12.842-5.666-26.723-8.595-40.759-8.6c-49.449,0.497-91.788,35.567-101.483,84.058    c-5.094-1.093-10.29-1.641-15.5-1.638c-42.295,0.38-76.303,34.921-76.025,77.217c-0.001,2.263,0.898,4.434,2.499,6.035    c1.6,1.6,3.771,2.499,6.035,2.499h494.933c2.263,0.001,4.434-0.898,6.035-2.499c1.6-1.6,2.499-3.771,2.499-6.035    c0.249-41.103-31.914-75.112-72.967-77.154c0.65-4.78,0.975-9.598,0.975-14.421c0.914-45.674-28.469-86.455-72.083-100.045    c-43.615-13.59-90.962,3.282-116.154,41.391C242.252,322.17,242.793,288.884,253.318,258.138L253.318,258.138z M87.519,238.092    c-55.35-38.567-67.358-129.25-69.833-158.996c78.8,7.921,133.092,32.454,161.458,72.992    c15.333,22.503,22.859,49.414,21.423,76.606c-23.253-35.362-77.83-105.726-162.473-140.577c-2.82-1.165-6.048-0.736-8.466,1.125    s-3.658,4.873-3.252,7.897c0.406,3.024,2.395,5.602,5.218,6.761c89.261,36.751,144.772,117.776,161.392,144.874    C150.795,260.908,115.29,257.451,87.519,238.092z M279.969,114.046c37.6-53.788,109.708-86.113,214.408-96.138    c-2.65,35.375-17.158,159.05-91.892,211.175c-37.438,26.116-85.311,30.57-142.305,13.433    c19.284-32.09,92.484-142.574,212.405-191.954c2.819-1.161,4.805-3.738,5.209-6.76c0.404-3.022-0.835-6.031-3.25-7.892    c-2.415-1.861-5.64-2.292-8.459-1.131C351.388,82.01,279.465,179.805,252.231,222.711    C248.573,184.367,258.381,145.945,279.969,114.046L279.969,114.046z M262.694,368.017c15.097-26.883,43.468-43.587,74.3-43.746    c47.906,0.521,86.353,39.717,85.95,87.625c-0.001,7.188-0.857,14.351-2.55,21.337c-0.67,2.763,0.08,5.677,1.999,7.774    c1.919,2.097,4.757,3.1,7.568,2.676c1.994-0.272,4.005-0.393,6.017-0.362c29.59,0.283,54.467,22.284,58.367,51.617H17.661    c3.899-29.333,28.777-51.334,58.367-51.617c4-0.004,7.989,0.416,11.9,1.254c4.622,0.985,9.447,0.098,13.417-2.467    c3.858-2.519,6.531-6.493,7.408-11.017c7.793-40.473,43.043-69.838,84.258-70.192c16.045-0.002,31.757,4.582,45.283,13.212    c4.01,2.561,8.897,3.358,13.512,2.205C256.422,375.165,260.36,372.163,262.694,368.017L262.694,368.017z"/>	</g></g>';
            let nodes: NodeModel[] = [
           {
            id: 'native1', width: 100, height: 100, offsetX: 300, offsetY: 100,
            shape: {
                type: 'Native', content: nativenode,
            },
            annotations: [{ content: 'Node1' }]
        },
        {
            id: 'native2', width: 100, height: 100, offsetX: 300, offsetY: 150,
            shape: {
                type: 'Native', content: nativenode,
            },
            annotations: [{ content: 'node2' }]
        },
        {
            id: 'native3', width: 100, height: 100, offsetX: 300, offsetY: 200,
            shape: {
                type: 'Native', content: nativenode,
            },
            annotations: [{ content: 'node3' }]
        },
        {
            id: 'html1', width: 100, height: 100, offsetX: 500, offsetY: 100,
            annotations: [{ content: 'node4' }],
            shape: {
                type: 'HTML',
                content: '<div style="background:red;height:100%;width:100%;"><input type="button" value="{{:value}}" /></div>',
            }
        },
        {
            id: 'html2', width: 100, height: 100, offsetX: 500, offsetY: 150,
            annotations: [{ content: 'node5' }],
            shape: {
                type: 'HTML',
                content: '<div style="background:green;height:100%;width:100%;"><input type="button" value="{{:value}}" /></div>',
            }
        },
        {
            id: 'html3', width: 100, height: 100, offsetX: 500, offsetY: 200,
            annotations: [{ content: 'node5' }],
            shape: {
                type: 'HTML',
                content: '<div style="background:yellow;height:100%;width:100%;"><input type="button" value="{{:value}}" /></div>',
            }
        }
];
            
            diagram = new Diagram({
                width: 1500, height: 1000, nodes: nodes, 
            });
            diagram.appendTo('#diagram');
            selArray.push(diagram.nodes[2]);
            diagram.select(selArray);

        });

        afterAll((): void => {
            diagram.destroy();
            ele.remove();
        });

        it('chande the order of the element', (done: Function) => {
            let diagramelement = document.getElementById("diagram_diagramLayer")
            diagram.select(selArray);
            diagram.sendToBack()
            let element: HTMLElement = document.getElementById("diagram_nativeLayer")
            expect((element.childNodes[0] as HTMLElement).id === "native3_content_groupElement"
                && (diagramelement.childNodes[2] as HTMLElement).id === "native3_groupElement").toBe(true);
            selArray[0] = diagram.nodes[1];
            diagram.select(selArray);
            diagram.sendBackward();
            expect((element.childNodes[1] as HTMLElement).id === "native2_content_groupElement"
                && (diagramelement.childNodes[3] as HTMLElement).id === "native2_groupElement").toBe(true);
            selArray[0] = diagram.nodes[2];
            diagram.select(selArray);
            diagram.bringToFront();
            expect((element.childNodes[2] as HTMLElement).id === "native3_content_groupElement").toBe(true);
            var element2 = document.getElementById("diagram_nativeLayer");
            selArray[0] = diagram.nodes[1];
            diagram.select(selArray);
            diagram.moveForward();
            var element3 = document.getElementById("diagram_nativeLayer");
            expect((element.childNodes[1] as HTMLElement).id === "native2_content_groupElement"
                && (diagramelement.childNodes[3] as HTMLElement).id === "native2_groupElement").toBe(true);
            selArray[0] = diagram.nodes[5];
            diagram.select(selArray);
            diagram.sendToBack();
            expect((element.childNodes[0] as HTMLElement).id === "native1_content_groupElement"
                && (diagramelement.childNodes[3] as HTMLElement).id === "native1_groupElement").toBe(true);
            var element1 = document.getElementById("diagram_htmlLayer_div");
            expect((element1.childNodes[0] as HTMLElement).id === "html3_content_html_element").toBe(true);
            selArray[0] = diagram.nodes[4];
            diagram.select(selArray);
            diagram.sendBackward();
            expect((element1.childNodes[1] as HTMLElement).id === "html2_content_html_element"
                && (diagramelement.childNodes[5] as HTMLElement).id === "html2_groupElement").toBe(true);
            selArray[0] = diagram.nodes[4];
            diagram.select(selArray);
            diagram.moveForward();
            expect((element1.childNodes[1] as HTMLElement).id === "html1_content_html_element"
                && (diagramelement.childNodes[5] as HTMLElement).id === "html1_groupElement").toBe(true);
            selArray[0] = diagram.nodes[3];
            diagram.select(selArray);
            diagram.bringToFront();
            expect((element1.childNodes[1] as HTMLElement).id === "html2_content_html_element"
                && (diagramelement.childNodes[5] as HTMLElement).id === "html2_groupElement").toBe(true);
            done();
        });
    });
    });
});    