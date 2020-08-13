import { client } from '@ont-dev/ontology-dapi';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { RouterProps } from 'react-router';

export const Identity: React.SFC<RouterProps> = (props) => {
  async function onAddClaim(values: any) {
    const ontid: string = await client.api.identity.getIdentity();
    const tag: string = values.tag;
    const body: string = values.body;
    const claim = { ontid, tags: [tag], body };

    try {
      const result = await client.api.claim.addClaims({ claims: [claim] });
      alert('onAddClaim finished');
    } catch (e) {
      alert('onAddClaim canceled');
      // tslint:disable-next-line:no-console
      console.log('onAddClaim error:', e);
    }
  }

  async function onGetClaims() {
    const claims  = await client.api.claim.getClaims();
    console.log(claims);
  }

  function onBack() {
    props.history.goBack();
  }

  return (
    <div>
      <h2>Add Claim</h2>
      <Form
        initialValues={{
          tag: '123',
          body: '123456'
        }}
        onSubmit={onAddClaim}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h4>Tag</h4>
            <Field name="tag" component="input" />

            <h4>Body</h4>
            <Field name="body" component="textarea" />

            <br />
            <button type="submit">addClaims</button>
          </form>
        )}
      />
      <hr />
      <button onClick={onGetClaims}>getClaims</button>
      <hr />
      <button onClick={onBack}>Back</button>
    </div>
  );
};